"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const publish_1 = __importDefault(require("./publish"));
const discover_1 = __importDefault(require("./discover"));
const const_1 = require("./const");
const commands = {
    publish: publish_1.default,
    discover: discover_1.default
};
function activate(context) {
    for (let command in commands) {
        const callback = commands[command];
        command = `${const_1.extNamespace}.${command}`;
        const disposable = vscode_1.default.commands.registerCommand(command, callback);
        context.subscriptions.push(disposable);
    }
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map