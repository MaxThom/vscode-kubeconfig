import * as path from "path";
import * as os from "os";
import * as vscode from 'vscode';
import { load, dump } from "js-yaml";
import { KubeConfig } from "../types/kube";
const fs = require('fs');

export function getKubeconfigFiles(): string[] {
  const config = vscode.workspace.getConfiguration("vs-kubernetes");
  let kubeconfigs = [
    config["vs-kubernetes.kubeconfig"],
    ...config["vs-kubernetes.knownKubeconfigs"],
  ];
  const defaultKubeconfig = path.join(os.homedir(), '.kube', 'config');

  if (fs.lstatSync(defaultKubeconfig).isFile()) {
    kubeconfigs.unshift(defaultKubeconfig);
  }
  if (process.platform === "win32") {
    kubeconfigs = kubeconfigs.map((kp) => kp.toLowerCase());
  }

  kubeconfigs = [...new Set(kubeconfigs)].filter((k) => k !== '');
  return kubeconfigs;
}

export function getKubeconfigTypeFromFile(filepath: string): KubeConfig {
  const yaml = load(fs.readFileSync(filepath, "utf8")) as KubeConfig;
  return yaml;
}

export function setKubeconfigFileFromType(filepath: string, config: KubeConfig) {
  fs.writeFile(filepath, dump(config), (err: any) => {
      if (err) {
          console.log(err);
      }
  });

}