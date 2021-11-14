import { getKubeconfigFiles, getKubeconfigTypeFromFile } from "../providers/kubefileProvider";
import { KubeConfig } from "../types/kube";
import * as vscode from "vscode";
const fs = require('fs');

export class KubeditorController {
    public _kubeconfigPaths: string[] = [];
    public _kubeconfigContent: string[] = [];
    public _kubeconfigTypes: KubeConfig[] = [];

    public constructor()
    {
        this._kubeconfigPaths = getKubeconfigFiles();
        for (var config of this._kubeconfigPaths) {
            this._kubeconfigContent.push(fs.readFileSync(config, 'utf8'));
            this._kubeconfigTypes.push(getKubeconfigTypeFromFile(config));
        }

    }

    public onHelloCommand(text: string) {
        vscode.window.showInformationMessage(text);
    }

}