"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../../firebase");
const MyPageAuthentification = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const passwordRef = (0, react_1.useRef)(null);
    const [errorMsg, setErrorMsg] = (0, react_1.useState)("");
    const handleAuth = () => {
        const user = firebase_1.auth.currentUser;
        const password = passwordRef.current.value;
        const credential = auth_1.EmailAuthProvider.credential(firebase_1.signedInUser, password);
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
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAuth();
        }
        else if (errorMsg) {
            setErrorMsg("");
        }
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "section-title" }, { children: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "auth-form" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uAC1C\uC778 \uC815\uBCF4\uB97C \uBCF4\uD638\uD558\uAE30 \uC704\uD574 \uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD574 \uC8FC\uC138\uC694." }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-wrap", style: { padding: "24px 0" } }, { children: [(0, jsx_runtime_1.jsx)("input", { id: "userPw", type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", onKeyPress: handleKeyPress, ref: passwordRef }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: errorMsg }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "auth-btn", onClick: handleAuth }, { children: "\uD655\uC778" })) }))] }))] })) })) }));
};
exports.default = MyPageAuthentification;
