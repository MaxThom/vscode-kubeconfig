const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
  const howdyButton = document.getElementById("howdy");
  howdyButton.addEventListener("click", handleHowdyClick);
  const saveButton = document.getElementById("save");
  saveButton.addEventListener("click", handleSaveClick);
}

function handleHowdyClick() {
  vscode.postMessage({
    command: "hello",
    text: "Hey there partner! 🤠",
  });
}

function handleSaveClick() {
  vscode.postMessage({
    command: "save",
    text: "KubeConfig saved ! 🌌",
  });
}