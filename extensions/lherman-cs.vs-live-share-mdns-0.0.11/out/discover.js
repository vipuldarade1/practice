"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importStar(require("vscode"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const bonjour_1 = __importDefault(require("bonjour"));
const bonjour = bonjour_1.default();
const const_1 = require("./const");
function find(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const services = [];
        const browser = bonjour.find({ type: const_1.serviceName }, function (service) {
            services.push({
                label: service.name,
                service
            });
        });
        yield vscode_1.default.window.withProgress({
            location: vscode_1.default.ProgressLocation.Notification,
            title: "Discovered",
            cancellable: true
        }, (progress, token) => {
            const step = 100 / const_1.discoveryTimeout;
            const nobodyMsg = "nobody 😢";
            progress.report({
                increment: 0,
                message: nobodyMsg
            });
            return new Promise(resolve => {
                let elapsed = 0;
                const interval = setInterval(() => {
                    elapsed++;
                    const names = services.map(s => s.label).join(", ");
                    const message = names || nobodyMsg;
                    progress.report({
                        increment: step,
                        message: message
                    });
                    if (elapsed === const_1.discoveryTimeout) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 1000);
                token.onCancellationRequested(() => {
                    clearInterval(interval);
                    resolve();
                });
            });
        });
        browser.stop();
        return services;
    });
}
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenSrc = new vscode_1.CancellationTokenSource();
        const services = yield find(tokenSrc.token);
        if (services.length === 0) {
            vscode_1.default.window.showErrorMessage("There's no peer found");
            return;
        }
        const selected = yield vscode_1.default.window.showQuickPick(services);
        if (!selected) {
            return;
        }
        const askPassword = () => __awaiter(this, void 0, void 0, function* () {
            const password = yield vscode_1.default.window.showInputBox({
                ignoreFocusOut: true,
                password: true,
                placeHolder: "Please input the session's password here"
            });
            if (!password) {
                return;
            }
            const hashedPassword = selected.service.txt["p"];
            const match = crypto_js_1.default.SHA256(password).toString() === hashedPassword;
            if (!match) {
                vscode_1.default.window.showErrorMessage("wrong password, please try again");
                return yield askPassword();
            }
            return password;
        });
        const password = yield askPassword();
        if (!password) {
            return;
        }
        const encryptedCode = selected.service.txt["l"];
        const code = crypto_js_1.default.AES.decrypt(encryptedCode, password).toString(crypto_js_1.default.enc.Utf8);
        const link = `https://insiders.liveshare.vsengsaas.visualstudio.com/join?${code}`;
        vscode_1.default.commands.executeCommand("liveshare.openLink", link);
    });
}
exports.default = default_1;
//# sourceMappingURL=discover.js.map