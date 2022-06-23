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
function Form() {
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "login-form", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uC774\uBA54\uC77C" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "login-btn" }, { children: "\uB85C\uADF8\uC778" })) }))] })));
}
function Util() {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "util-container flex" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "id-save-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { id: "saveUserId", type: "checkbox", value: "" }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "saveUserId" }, { children: "\uC544\uC774\uB514 \uC800\uC7A5" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "find-join-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/member/findPw" }, { children: "\uBE44\uBC00\uBC88\uD638 \uCC3E\uAE30 | " })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/member/join", className: "join" }, { children: "\uD68C\uC6D0\uAC00\uC785" }))] }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "login-title" }, { children: "SIGN IN" })), (0, jsx_runtime_1.jsx)(Form, {}), (0, jsx_runtime_1.jsx)(Util, {})] })) })));
}
function Login() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Login;
