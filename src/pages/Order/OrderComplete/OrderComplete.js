"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./OrderComplete.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const react_router_dom_1 = require("react-router-dom");
function NoticeSection() {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "notice-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uACB0\uC81C\uAC00 \uC815\uC0C1\uC801\uC73C\uB85C \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/", className: "order-list-btn border-style-btn" }, { children: "\uBA54\uC778\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })) }))] })));
}
function OrderItemSection() {
    const trs = [];
    for (let i = 0; i < 3; i++) {
        trs.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new02.jpg"), alt: "\uC2E0\uC81C\uD48802" }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uD2F0\uD2B8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: "1" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-price" }, { children: "22,000\uC6D0" }))] }), i));
    }
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "order-item-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC8FC\uBB38 \uC0C1\uD488" }), (0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC8FC\uBB38 \uC815\uBCF4" })), (0, jsx_runtime_1.jsx)("th", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAE08\uC561" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: trs })] })] })));
}
function DeliverySection() {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "delivery-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uBC30\uC1A1\uC9C0 \uC815\uBCF4" }), (0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uBC1B\uB294\uBD84" }), (0, jsx_runtime_1.jsx)("td", { children: "\uAE40\uC18C\uD604" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC5F0\uB77D\uCC98" }), (0, jsx_runtime_1.jsx)("td", { children: "010-****-0407" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC8FC\uC18C" }), (0, jsx_runtime_1.jsxs)("td", { children: ["(02390)", (0, jsx_runtime_1.jsx)("br", {}), "\uC11C\uC6B8 \uC1A1\uD30C\uAD6C \uBC9A\uAF43\uB85C2\uAE38"] })] })] }) })] })));
}
function PaySection() {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "payment-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uACB0\uC81C \uC815\uBCF4" }), (0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC0C1\uD488 \uAE08\uC561" }), (0, jsx_runtime_1.jsx)("td", { children: "29,300\uC6D0" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uBC30\uC1A1\uBE44" }), (0, jsx_runtime_1.jsx)("td", { children: "3,000\uC6D0" })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC804\uCCB4 \uAE08\uC561" }), (0, jsx_runtime_1.jsx)("td", { children: "32,300\uC6D0" })] })] }) })] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-detail big-container" }, { children: [(0, jsx_runtime_1.jsx)(NoticeSection, {}), (0, jsx_runtime_1.jsx)(OrderItemSection, {}), (0, jsx_runtime_1.jsx)(DeliverySection, {}), (0, jsx_runtime_1.jsx)(PaySection, {})] })) }));
}
function OrderDetail() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = OrderDetail;
