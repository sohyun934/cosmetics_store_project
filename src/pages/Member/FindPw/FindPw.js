"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "find-title" }, { children: "FIND PW" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "find-form" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { id: "userName", type: "text", placeholder: "\uC774\uB984" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-wrap" }, { children: (0, jsx_runtime_1.jsx)("input", { id: "userEmail", type: "text", placeholder: "\uC774\uBA54\uC77C" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "find-btn", style: { marginTop: "20px" } }, { children: "\uC774\uBA54\uC77C \uC778\uC99D" })) }))] }))] })) })));
}
function FindId() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = FindId;
