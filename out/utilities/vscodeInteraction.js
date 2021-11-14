"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openFileInEditor = void 0;
const vscode = require("vscode");
function openFileInEditor(kubeconfig) {
    const openPath = vscode.Uri.file(kubeconfig);
    vscode.workspace.openTextDocument(openPath).then((doc) => {
        vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
            preview: false
        });
    });
}
exports.openFileInEditor = openFileInEditor;
//# sourceMappingURL=vscodeInteraction.js.map