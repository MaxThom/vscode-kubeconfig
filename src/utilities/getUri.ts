import path = require("path");
import { Uri, Webview } from "vscode";

export function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  if (pathList.length === 0) {
    return webview.asWebviewUri(extensionUri);
  }
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

export function getPathsToUri(webview: Webview, kubeconfigs: string[]): Uri[]
{
  let kubeconfigsUri: Uri[] = [];
  for (var config of kubeconfigs) {
    console.log(config);
    kubeconfigsUri.push(getUri(webview, Uri.parse(config), []));
  }
  return kubeconfigsUri;
}