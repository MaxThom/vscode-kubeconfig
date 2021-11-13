import path = require("path");
import { Uri, Webview } from "vscode";

export function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  if (pathList.length === 0) {
    return webview.asWebviewUri(extensionUri);
  }
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}