"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Login.css");
const Header_1 = __importDefault(require("../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../components/Footer/Footer"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const auth_1 = require("firebase/auth");
const react_1 = require("react");
const firebase_1 = require("../../firebase");
const StyledInput = styled_components_1.default.input `
    appearance: none;
    border: 1.5px solid #aaa;
    width: 0.9rem;
    height: 0.9rem;

    &:checked {
        border: transparent;
        background: #e5e5e5
            url("data:image/svg+xml,%3Csvg width='1.5rem' height='1.5rem' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
            no-repeat 50% / 100%;
    }
`;
function FormAndUtil() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMsg, setErrorMsg] = (0, react_1.useState)("");
    const [isChecked, setIsChecked] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const moveTo = state.moveTo;
    (0, react_1.useEffect)(() => {
        if (getCookie("email")) {
            setEmail(getCookie("email"));
            setIsChecked(true);
        }
    }, []);
    const getCookie = (name) => {
        const search = name + "=";
        if (document.cookie.length > 0) {
            let offset = document.cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length; // set index of beginning of value
                let end = document.cookie.indexOf(";", offset); // set index of end of cookie value
                if (end === -1)
                    end = document.cookie.length;
                return unescape(document.cookie.substring(offset, end));
            }
        }
    };
    const setCookie = (name, value, expiredays) => {
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";";
    };
    const logIn = () => {
        (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password)
            .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            if (isChecked) {
                setCookie("email", user.email, 7);
            }
            else {
                setCookie("email", user.email, 0);
            }
            setErrorMsg("");
            navigate(moveTo);
        })
            .catch(error => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-email") {
                setErrorMsg("이메일을 입력해주세요.");
            }
            else if (errorCode === "auth/internal-error") {
                setErrorMsg("비밀번호를 입력해주세요.");
            }
            else if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                setErrorMsg("이메일 또는 비밀번호가 일치하지 않습니다.");
            }
        });
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            logIn();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "login-form" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uC774\uBA54\uC77C", value: email, onChange: e => setEmail(e.target.value), onKeyPress: handleKeyPress }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", onChange: e => setPassword(e.target.value), onKeyPress: handleKeyPress }) })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: errorMsg }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "login-btn", onClick: logIn }, { children: "\uB85C\uADF8\uC778" })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "util-container flex" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "id-save-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { id: "saveUserId", type: "checkbox", value: "", checked: isChecked, onChange: () => setIsChecked(!isChecked) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "saveUserId" }, { children: "\uC544\uC774\uB514 \uC800\uC7A5" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "find-join-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/member/findPw" }, { children: "\uBE44\uBC00\uBC88\uD638 \uCC3E\uAE30 | " })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/member/join", className: "join" }, { children: "\uD68C\uC6D0\uAC00\uC785" }))] }))] }))] }));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "login-title" }, { children: "SIGN IN" })), (0, jsx_runtime_1.jsx)(FormAndUtil, {})] })) })));
}
function Login() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Login;
