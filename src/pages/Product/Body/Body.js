"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const MoveTop_1 = __importDefault(require("../../../components/MoveTop/MoveTop"));
const react_router_dom_1 = require("react-router-dom");
function Main() {
    const products = [];
    for (let i = 0; i < 12; i++) {
        products.push((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "product" }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "thumb" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/body/body01.jpg"), alt: "\uBC14\uB514\uCF00\uC5B401" }), (0, jsx_runtime_1.jsx)("button", { className: "wish-btn" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC784\uBE0C\uB808\uC774\uC2A4 \uBC14\uB514\uC6CC\uC2DC \uB124\uB864\uB9AC & \uD328\uCE0C\uB9AC 300ML" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "28,000\uC6D0" }) }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "util-btn-container" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "cart-btn gray-style-btn" }, { children: (0, jsx_runtime_1.jsx)("span", { children: "CART" }) })) }))] }), i));
    }
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-title" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "BODY CARE" }), (0, jsx_runtime_1.jsx)("p", { children: "\uC77C\uC0C1\uC758 \uBB34\uAC8C\uB97C \uC904\uC5EC\uC8FC\uB294 \uBC14\uB514\uCF00\uC5B4\uB97C \uACBD\uD5D8\uD574\uBCF4\uC138\uC694" })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-filter" }, { children: (0, jsx_runtime_1.jsxs)("select", { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "new" }, { children: "\uB4F1\uB85D\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "rank" }, { children: "\uD310\uB9E4\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "low-price" }, { children: "\uB0AE\uC740\uAC00\uACA9\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "high-price" }, { children: "\uB192\uC740\uAC00\uACA9\uC21C" }))] }) })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: products }))] })), (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
function Body() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Body;