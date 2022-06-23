"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./OrderList.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const react_router_dom_1 = require("react-router-dom");
function SearchSection() {
    let onBtn = null;
    const btns = [];
    const btnTitles = ["1개월", "3개월", "6개월", "12개월"];
    function searchPeriod(e) {
        if (onBtn !== null)
            onBtn.classList.remove("on-btn");
        let clickBtn = e.target;
        clickBtn.classList.add("on-btn");
        onBtn = clickBtn;
    }
    for (let i = 0; i < btnTitles.length; i++) {
        btns.push((0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn", onClick: searchPeriod }, { children: btnTitles[i] }), i));
    }
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "search-section flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "small-txt" }, { children: "\uAD6C\uB9E4\uAE30\uAC04" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-inner-left" }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "select-month" }, { children: btns })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner-right" }, { children: [(0, jsx_runtime_1.jsx)("input", { className: "history-start-date small-txt", type: "date" }), "~", (0, jsx_runtime_1.jsx)("input", { className: "history-end-date small-txt", type: "date" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "search-btn small-txt" }, { children: "\uC870\uD68C" })) }))] }))] })));
}
function Table() {
    return ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "order-table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC8FC\uBB38\uC77C\uC790" }), (0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC0C1\uD488" })), (0, jsx_runtime_1.jsx)("th", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("th", { children: "\uC0C1\uD0DC" })] }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [(0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-date", rowSpan: 2 }, { children: ["2022.05.17", (0, jsx_runtime_1.jsx)("div", { className: "order-num" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/orderDetail" }, { children: "\uC0C1\uC138\uBCF4\uAE30" }))] })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new02.jpg"), alt: "\uC2E0\uC81C\uD48802" }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uD2F0\uD2B8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: "1" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-price" }, { children: "22,000\uC6D0" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-status" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC8FC\uBB38\uC644\uB8CC" }) }))] })), (0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new02.jpg"), alt: "\uC2E0\uC81C\uD48802" }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uD2F0\uD2B8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: "1" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-price" }, { children: "22,000\uC6D0" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-status" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC8FC\uBB38\uC644\uB8CC" }) }))] })), (0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [(0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-date" }, { children: ["2022.05.17", (0, jsx_runtime_1.jsx)("div", { className: "order-num" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/orderDetail" }, { children: "\uC0C1\uC138\uBCF4\uAE30" }))] })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new02.jpg"), alt: "\uC2E0\uC81C\uD48802" }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uD2F0\uD2B8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: "1" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-price" }, { children: "22,000\uC6D0" })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-status" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC8FC\uBB38\uC644\uB8CC" }) }))] }))] })] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-list big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "orderList" }), (0, jsx_runtime_1.jsx)(SearchSection, {}), (0, jsx_runtime_1.jsx)(Table, {})] })) }));
}
function OrderList() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = OrderList;
