"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledDiv = styled_components_1.default.div `
    width: 300px;

    @media (max-width: 500px) {
        width: 60%;
    }
`;
function CartPop(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(StyledDiv, Object.assign({ className: "popup-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "CART" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: props.title }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "pop-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn", onClick: () => props.close() }, { children: "\uC1FC\uD551 \uACC4\uC18D\uD558\uAE30" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/cart" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn" }, { children: "\uC7A5\uBC14\uAD6C\uB2C8 \uC774\uB3D9" })) }))] })), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", "aria-label": "close button", onClick: () => props.close() })] })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
exports.default = CartPop;
