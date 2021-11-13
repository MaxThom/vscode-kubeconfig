"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubeditorPanel = void 0;
const vscode = require("vscode");
const getUri_1 = require("../utilities/getUri");
const vscode_1 = require("vscode");
const fs = require('fs');
class KubeditorPanel {
    constructor(panel, extensionUri, kubeconfigs) {
        this._disposables = [];
        this._panel = panel;
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, kubeconfigs);
        this._setWebviewMessageListener(this._panel.webview);
        this._panel.onDidDispose(this.dispose, null, this._disposables);
    }
    static render(extensionUri, kubeconfigs) {
        if (KubeditorPanel.currentPanel) {
            KubeditorPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        }
        else {
            let kubeconfigsUri = [];
            for (var config of kubeconfigs) {
                kubeconfigsUri.push(vscode_1.Uri.file(config));
            }
            const panel = vscode.window.createWebviewPanel("kubeditor", "KubEditor", vscode.ViewColumn.One, {
                enableScripts: true
                //localResourceRoots: kubeconfigsUri
            });
            KubeditorPanel.currentPanel = new KubeditorPanel(panel, extensionUri, kubeconfigs);
        }
    }
    dispose() {
        KubeditorPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
    _getWebviewContent(webview, extensionUri, kubeconfigs) {
        const toolkitUri = (0, getUri_1.getUri)(webview, extensionUri, [
            "node_modules",
            "@vscode",
            "webview-ui-toolkit",
            "dist",
            "toolkit.js",
        ]);
        const mainUri = (0, getUri_1.getUri)(webview, extensionUri, ["media", "main.js"]);
        let kubeconfigsUri = [];
        for (var config of kubeconfigs) {
            console.log(config);
            kubeconfigsUri.push((0, getUri_1.getUri)(webview, vscode_1.Uri.parse(config), []));
        }
        const data = fs.readFileSync(kubeconfigs[0], 'utf8');
        console.log(data);
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
        <vscode-text-area value="${data}" cols="200" rows="25" resize="vertical">Kubeconfig</vscode-text-area>
        </body>
    </html>
    `;
    }
    _setWebviewMessageListener(webview) {
        webview.onDidReceiveMessage((message) => {
            const command = message.command;
            const text = message.text;
            switch (command) {
                case "hello":
                    vscode.window.showInformationMessage(text);
                    return;
            }
        }, undefined, this._disposables);
    }
}
exports.KubeditorPanel = KubeditorPanel;
//# sourceMappingURL=KubeditorPanel.js.map