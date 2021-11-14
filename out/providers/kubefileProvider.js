"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setKubeconfigFileFromType = exports.getKubeconfigTypeFromFile = exports.getKubeconfigFiles = void 0;
const path = require("path");
const os = require("os");
const vscode = require("vscode");
const js_yaml_1 = require("js-yaml");
const fs = require('fs');
function getKubeconfigFiles() {
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
exports.getKubeconfigFiles = getKubeconfigFiles;
function getKubeconfigTypeFromFile(filepath) {
    const yaml = (0, js_yaml_1.load)(fs.readFileSync(filepath, "utf8"));
    return yaml;
}
exports.getKubeconfigTypeFromFile = getKubeconfigTypeFromFile;
function setKubeconfigFileFromType(filepath, config) {
    fs.writeFile(filepath, (0, js_yaml_1.dump)(config), (err) => {
        if (err) {
            console.log(err);
        }
    });
}
exports.setKubeconfigFileFromType = setKubeconfigFileFromType;
//# sourceMappingURL=kubefileProvider.js.map