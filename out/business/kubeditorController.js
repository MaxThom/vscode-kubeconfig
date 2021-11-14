"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubeditorController = void 0;
const kubefileProvider_1 = require("../providers/kubefileProvider");
const vscode = require("vscode");
const vscodeInteraction_1 = require("../utilities/vscodeInteraction");
const fs = require('fs');
class KubeditorController {
    constructor() {
        this._kubeconfigPaths = [];
        this._kubeconfigContent = [];
        this._kubeconfigTypes = [];
        this._kubeconfigPaths = (0, kubefileProvider_1.getKubeconfigFiles)();
        for (var config of this._kubeconfigPaths) {
            this._kubeconfigContent.push(fs.readFileSync(config, 'utf8'));
            this._kubeconfigTypes.push((0, kubefileProvider_1.getKubeconfigTypeFromFile)(config));
        }
    }
    onHelloCommand(text) {
        vscode.window.showInformationMessage(text);
    }
    onSaveCommand(text) {
        vscode.window.showInformationMessage(text);
        (0, kubefileProvider_1.setKubeconfigFileFromType)("C:/Users/maxth/Desktop/vscode-kubeconfig/kubeditor/kubeconfigs/kubeconfig", this._kubeconfigTypes[0]);
        (0, vscodeInteraction_1.openFileInEditor)("C:/Users/maxth/Desktop/vscode-kubeconfig/kubeditor/kubeconfigs/kubeconfig");
    }
}
exports.KubeditorController = KubeditorController;
//# sourceMappingURL=kubeditorController.js.map