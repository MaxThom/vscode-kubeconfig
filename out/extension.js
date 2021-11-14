"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const KubeditorPanel_1 = require("./ui/KubeditorPanel");
const kubefileProvider_1 = require("./providers/kubefileProvider");
const vscodeInteraction_1 = require("./utilities/vscodeInteraction");
const kubeditorController_1 = require("./business/kubeditorController");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "kubeditor" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('kubeditor.edit-kubeconfig', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from kubeditor!');
        // Load configuration
        let kubeconfigs = (0, kubefileProvider_1.getKubeconfigFiles)();
        if (kubeconfigs.length > 0) {
            if (kubeconfigs.length === 1) {
                if (fs.lstatSync(kubeconfigs[0]).isFile()) {
                    (0, vscodeInteraction_1.openFileInEditor)(kubeconfigs[0]);
                }
            }
            else {
                vscode.window.showQuickPick(kubeconfigs, {
                    placeHolder: "Select kubeconfig to open",
                })
                    .then((selectedKubeconfig) => {
                    if (selectedKubeconfig) {
                        if (fs.lstatSync(selectedKubeconfig).isFile()) {
                            (0, vscodeInteraction_1.openFileInEditor)(selectedKubeconfig);
                        }
                    }
                });
            }
        }
    });
    let disposablePanel = vscode.commands.registerCommand('kubeditor.open-kubeditor', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from KubEditor!');
        let controller = new kubeditorController_1.KubeditorController();
        KubeditorPanel_1.KubeditorPanel.render(context.extensionUri, controller);
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposablePanel);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map