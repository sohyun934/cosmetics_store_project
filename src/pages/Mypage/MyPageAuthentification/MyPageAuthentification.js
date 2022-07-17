"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../../firebase");
function Main() {
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMsg, setErrorMsg] = (0, react_1.useState)("");
    const user = firebase_1.auth.currentUser;
    const credential = auth_1.EmailAuthProvider.credential(user.email, password);
    const navigate = (0, react_router_dom_1.useNavigate)();
    function passwordChk() {
        (0, auth_1.reauthenticateWithCredential)(user, credential)
            .then(() => {
            navigate("/mypage/modify", {
                state: {
                    password: password
                }
            });
        })
            .catch(error => {
            setErrorMsg("비밀번호가 일치하지 않습니다.");
        });
    }
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "section-title" }, { children: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "auth-form", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uAC1C\uC778 \uC815\uBCF4\uB97C \uBCF4\uD638\uD558\uAE30 \uC704\uD574 \uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD574 \uC8FC\uC138\uC694." }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-wrap", style: { padding: "24px 0" } }, { children: [(0, jsx_runtime_1.jsx)("input", { id: "userPw", type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", onChange: e => {
                                        setPassword(e.target.value);
                                        setErrorMsg("");
                                    } }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: errorMsg }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "auth-btn", onClick: passwordChk }, { children: "\uD655\uC778" })) }))] }))] })) })));
}
function MyPageAuthentification() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = MyPageAuthentification;
