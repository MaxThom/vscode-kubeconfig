"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubeditorController = void 0;
const kubefileProvider_1 = require("../providers/kubefileProvider");
const vscode = require("vscode");
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
}
exports.KubeditorController = KubeditorController;
//# sourceMappingURL=kubeditorController.js.map