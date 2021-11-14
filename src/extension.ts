// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { KubeditorPanel } from "./ui/KubeditorPanel";
import { getKubeconfigFiles } from "./providers/kubefileProvider";
import { openFileInEditor } from "./utilities/vscodeInteraction";
import { KubeditorController } from './business/kubeditorController';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
    let kubeconfigs = getKubeconfigFiles();

    if (kubeconfigs.length > 0) {
      if (kubeconfigs.length === 1) {
        if (fs.lstatSync(kubeconfigs[0]).isFile()) {
          openFileInEditor(kubeconfigs[0]);
        }
      } else {
        vscode.window.showQuickPick(kubeconfigs, {
          placeHolder: "Select kubeconfig to open",
        })
        .then((selectedKubeconfig) => {
          if (selectedKubeconfig) {
            if (fs.lstatSync(selectedKubeconfig).isFile()) {
              openFileInEditor(selectedKubeconfig);
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

    let controller: KubeditorController = new KubeditorController();
    KubeditorPanel.render(context.extensionUri, controller);
  });

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposablePanel);
}

// this method is called when your extension is deactivated
export function deactivate() {}

