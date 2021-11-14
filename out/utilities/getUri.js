"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathsToUri = exports.getUri = void 0;
const vscode_1 = require("vscode");
function getUri(webview, extensionUri, pathList) {
    if (pathList.length === 0) {
        return webview.asWebviewUri(extensionUri);
    }
    return webview.asWebviewUri(vscode_1.Uri.joinPath(extensionUri, ...pathList));
}
exports.getUri = getUri;
function getPathsToUri(webview, kubeconfigs) {
    let kubeconfigsUri = [];
    for (var config of kubeconfigs) {
        console.log(config);
        kubeconfigsUri.push(getUri(webview, vscode_1.Uri.parse(config), []));
    }
    return kubeconfigsUri;
}
exports.getPathsToUri = getPathsToUri;
//# sourceMappingURL=getUri.js.map