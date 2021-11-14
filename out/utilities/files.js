"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKubeconfigFiles = exports.open = void 0;
const path = require("path");
const fs = require("fs");
const os = require("os");
const vscode = require("vscode");
function open(kubeconfig) {
    const openPath = vscode.Uri.file(kubeconfig);
    vscode.workspace.openTextDocument(openPath).then((doc) => {
        vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
            preview: false
        });
    });
}
exports.open = open;
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
//# sourceMappingURL=files.js.map