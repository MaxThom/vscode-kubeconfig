import * as vscode from 'vscode';

export function openFileInEditor(kubeconfig: string) {
	const openPath = vscode.Uri.file(kubeconfig);
	vscode.workspace.openTextDocument(openPath).then((doc) => {
	  vscode.window.showTextDocument(doc, {
		viewColumn: vscode.ViewColumn.Beside,
		preview: false
	  });
	});
}