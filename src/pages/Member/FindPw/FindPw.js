"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const firestore_1 = require("firebase/firestore");
const react_1 = require("react");
const firebase_1 = require("../../../firebase");
const auth_1 = require("firebase/auth");
function Main() {
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [successMsg, setSuccessMsg] = (0, react_1.useState)("none");
    const [errorMsg, setErrorMsg] = (0, react_1.useState)("none");
    function fetchUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("name", "==", name), (0, firestore_1.where)("email", "==", email));
            const userSnapshot = yield (0, firestore_1.getDocs)(q);
            if (userSnapshot.size > 0) {
                setErrorMsg("none");
                (0, auth_1.sendPasswordResetEmail)(firebase_1.auth, email)
                    .then(() => {
                    // Password reset email sent!
                    setSuccessMsg("block");
                })
                    .catch(error => {
                    setSuccessMsg("none");
                    alert("이메일 발송 중에 오류가 발생했습니다.\n" + error.message);
                });
            }
            else {
                setErrorMsg("block");
            }
        });
    }
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "find-title" }, { children: "FIND PW" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "find-form" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { id: "userName", type: "text", placeholder: "\uC774\uB984", onChange: e => setName(e.target.value) }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { id: "userEmail", type: "text", placeholder: "\uC774\uBA54\uC77C", onChange: e => setEmail(e.target.value) }) })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "success-msg", style: { display: successMsg } }, { children: "\uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815\uC744 \uC704\uD55C \uC774\uBA54\uC77C\uC774 \uBC1C\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg", style: { display: errorMsg } }, { children: "\uC785\uB825\uD55C \uC815\uBCF4\uC640 \uC77C\uCE58\uD558\uB294 \uACC4\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "find-btn", style: { marginTop: "20px" }, onClick: fetchUser, disabled: successMsg === "block" }, { children: "\uC774\uBA54\uC77C \uC778\uC99D" })) }))] }))] })) })));
}
function FindId() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = FindId;
