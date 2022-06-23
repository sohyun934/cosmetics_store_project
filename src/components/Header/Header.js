"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../../styles/style.css");
require("./Header.css");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function Gnb() {
    return ((0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/new" }, { children: "\uC2E0\uC81C\uD488" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/best" }, { children: "\uBCA0\uC2A4\uD2B8" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/hair" }, { children: "\uD5E4\uC5B4\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/skin" }, { children: "\uC2A4\uD0A8\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/body" }, { children: "\uBC14\uB514\uCF00\uC5B4" })) })] }));
}
function LeftGnb() {
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "header-gnb-left" }, { children: (0, jsx_runtime_1.jsx)(Gnb, {}) })));
}
function SideGnbBtn(props) {
    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "side-gnb-btn", onClick: () => props.activeSideGnb() }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "line1" }), (0, jsx_runtime_1.jsx)("div", { className: "line2" }), (0, jsx_runtime_1.jsx)("div", { className: "line3" })] })));
}
function SideGnb() {
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "side-gnb" }, { children: (0, jsx_runtime_1.jsx)(Gnb, {}) })));
}
function RightGnb() {
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "header-gnb-right" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/login" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/mypage.png"), alt: "\uB9C8\uC774\uD398\uC774\uC9C0" }) })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/cart" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/cart.png"), alt: "\uC7A5\uBC14\uAD6C\uB2C8" }) })) })] })) })));
}
function Header() {
    const [toggle, setToggle] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)("header", Object.assign({ className: toggle ? "header side-active" : "header" }, { children: [(0, jsx_runtime_1.jsx)(LeftGnb, {}), (0, jsx_runtime_1.jsx)(SideGnbBtn, { activeSideGnb: () => setToggle(!toggle) }), (0, jsx_runtime_1.jsx)(SideGnb, {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "logo" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/logo.png"), alt: "\uB85C\uACE0" }) })) })), (0, jsx_runtime_1.jsx)(RightGnb, {})] })));
}
exports.default = Header;
