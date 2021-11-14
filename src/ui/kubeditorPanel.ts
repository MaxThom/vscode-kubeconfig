import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";
import { KubeditorController } from "../business/kubeditorController";

const fs = require('fs');

export class KubeditorPanel {
  public static currentPanel: KubeditorPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private _controller: KubeditorController;

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, controller: KubeditorController) {
    this._panel = panel;
    this._controller = controller;
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    this._setWebviewMessageListener(this._panel.webview);
    this._panel.onDidDispose(this.dispose, null, this._disposables);
  }

  public static render(extensionUri: vscode.Uri, controller: KubeditorController) {
    if (KubeditorPanel.currentPanel) {
        KubeditorPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {

      //let kubeconfigsUri: Uri[] = [];
      //for (var config of kubeconfigs) {
      //  kubeconfigsUri.push(Uri.file(config));
      //}

      const panel = vscode.window.createWebviewPanel("kubeditor", "KubEditor", vscode.ViewColumn.One, {
        enableScripts: true
        //localResourceRoots: kubeconfigsUri
      });

      KubeditorPanel.currentPanel = new KubeditorPanel(panel, extensionUri, controller);
    }
  }

  public dispose() {
    KubeditorPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const mainUri = getUri(webview, extensionUri, ["media","main.js"]);
    const toolkitUri = getUri(webview, extensionUri, [
        "node_modules",
        "@vscode",
        "webview-ui-toolkit",
        "dist",
        "toolkit.js",
      ]);

    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <script type="module" src="${toolkitUri}"></script>
        <script type="module" src="${mainUri}"></script>
        <title>Hello World!</title>
        </head>
        <body>
        <h1>Hello World!</h1>
        <vscode-button id="howdy">Howdy!</vscode-button>
        <vscode-text-area value="${this._controller._kubeconfigContent[0]}" cols="200" rows="25" resize="vertical">Kubeconfig</vscode-text-area>
        </body>
    </html>
    `;
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "hello":
            this._controller.onHelloCommand(text);
            return;
        }
      },
      undefined,
      this._disposables
    );
  }

}