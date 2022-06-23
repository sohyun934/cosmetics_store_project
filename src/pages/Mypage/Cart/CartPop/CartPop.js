"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./CartPop.css");
function CartPop(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "popup-container cart-pop" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "CART" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC0C1\uD488\uC774 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACBC\uC2B5\uB2C8\uB2E4." }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "pop-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn", onClick: () => props.close() }, { children: "\uC1FC\uD551 \uACC4\uC18D\uD558\uAE30" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/cart" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn" }, { children: "\uC7A5\uBC14\uAD6C\uB2C8 \uC774\uB3D9" })) }))] })), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.close() })] })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
exports.default = CartPop;
