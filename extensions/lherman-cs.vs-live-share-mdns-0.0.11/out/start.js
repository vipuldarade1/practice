"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const randomWords = require("random-words");
const crypto_js_1 = __importDefault(require("crypto-js"));
const bonjour_1 = __importDefault(require("bonjour"));
const bonjour = bonjour_1.default();
const const_1 = require("./const");
function publish(link, password) {
    const liveShareCode = link.split("?")[1];
    const hashedPassword = crypto_js_1.default.SHA256(password).toString();
    const encryptedLink = crypto_js_1.default.AES.encrypt(liveShareCode, password).toString();
    const session = {
        p: hashedPassword,
        l: encryptedLink
    };
    return bonjour.publish({
        name: const_1.userName,
        type: const_1.serviceName,
        port: 8000,
        txt: session
    });
}
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        yield vscode_1.default.commands.executeCommand("liveshare.start");
        const liveShareLink = yield vscode_1.default.env.clipboard.readText();
        const password = randomWords();
        const ad = publish(liveShareLink, password);
        yield vscode_1.default.window.withProgress({
            location: vscode_1.default.ProgressLocation.Notification,
            title: `The password is "${password}". Waiting for your teammate(s)...`,
            cancellable: true
        }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
            token.onCancellationRequested(() => {
                // TODO!
                ad.stop(() => true);
            });
            const step = 100 / const_1.publishTimeout;
            let elapsed = 0;
            progress.report({ increment: 0 });
            yield new Promise((resolve, _) => {
                const interval = setInterval(() => {
                    elapsed++;
                    progress.report({ increment: step });
                    if (elapsed === const_1.publishTimeout) {
                        clearInterval(interval);
                        // TODO!
                        ad.stop(() => true);
                        vscode_1.default.window.showErrorMessage("Stopped publishing");
                        resolve();
                    }
                }, 1000);
            });
        }));
    });
}
exports.default = default_1;
//# sourceMappingURL=start.js.map