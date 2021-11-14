import { getKubeconfigFiles, getKubeconfigTypeFromFile, setKubeconfigFileFromType } from "../providers/kubefileProvider";
import { KubeConfig } from "../types/kube";
import * as vscode from "vscode";
import { openFileInEditor } from "../utilities/vscodeInteraction";
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

    public onSaveCommand(text: string) {
        vscode.window.showInformationMessage(text);
        setKubeconfigFileFromType("C:/Users/maxth/Desktop/vscode-kubeconfig/kubeditor/kubeconfigs/kubeconfig", this._kubeconfigTypes[0]);
        openFileInEditor("C:/Users/maxth/Desktop/vscode-kubeconfig/kubeditor/kubeconfigs/kubeconfig");
    }

}