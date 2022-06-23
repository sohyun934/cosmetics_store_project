"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Order.css");
const Header_1 = __importDefault(require("../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../components/Footer/Footer"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function DeliverySection(props) {
    const [name, setName] = (0, react_1.useState)(props.name);
    const [mobile, setMobile] = (0, react_1.useState)(props.mobile);
    const [postCode, setPostCode] = (0, react_1.useState)(props.postCode);
    const [address, setAddress] = (0, react_1.useState)(props.address);
    const [detailAddress, setDetailAddress] = (0, react_1.useState)(props.detailAddress);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "delivery-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Delivery" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uBC1B\uB294 \uBD84", value: name, onChange: event => setName(event.target.value) }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uD578\uB4DC\uD3F0\uBC88\uD638", value: mobile, onChange: event => setMobile(event.target.value) }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "postcode-wrap" }, { children: [(0, jsx_runtime_1.jsx)("input", { className: "userPostcode", type: "text", placeholder: "\uC6B0\uD3B8\uBC88\uD638", value: postCode, onChange: event => setPostCode(event.target.value) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "search-btn" })] })), (0, jsx_runtime_1.jsx)("input", { className: "userAddress", type: "text", placeholder: "\uAE30\uBCF8 \uC8FC\uC18C", value: address, onChange: event => setAddress(event.target.value) }), (0, jsx_runtime_1.jsx)("input", { className: "userDetailAddress", type: "text", placeholder: "\uC0C1\uC138 \uC8FC\uC18C", value: detailAddress, onChange: event => setDetailAddress(event.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-msg" }, { children: [(0, jsx_runtime_1.jsxs)("select", { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "etc" }, { children: "\uC9C1\uC811 \uC785\uB825" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "msg01" }, { children: "\uBC30\uC1A1 \uC804 \uC5F0\uB77D \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "msg02" }, { children: "\uBD80\uC7AC \uC2DC \uACBD\uBE44\uC2E4\uC5D0 \uB9E1\uACA8\uC8FC\uC138\uC694." })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "msg03" }, { children: "\uBB38 \uC55E \uBC30\uC1A1 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4." }))] }), (0, jsx_runtime_1.jsx)("textarea", { rows: 5, cols: 50, maxLength: 50, placeholder: "\uBC30\uC1A1\uBA54\uC2DC\uC9C0 \uC9C1\uC811 \uC785\uB825 (50\uC790 \uC774\uB0B4)" })] }))] })));
}
function CheckOutSection(props) {
    const price = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let fee = 3000;
    if (Number(props.price) >= 30000)
        fee = 0;
    const totPrice = String(fee + Number(props.price)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "check-out-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Check Out" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "check-out-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uC8FC\uBB38\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-fee flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uBC30\uC1A1\uBE44" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "fee" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","), "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: "* 30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD569\uACC4" }) }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [totPrice, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/cart", className: "cancel-btn gray-style-btn" }, { children: "\uCDE8\uC18C\uD558\uAE30" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "pay-btn" }, { children: "\uACB0\uC81C\uD558\uAE30" }))] }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-container big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "ORDER" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-container" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "flex", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsx)(DeliverySection, { name: "\uAE40\uC18C\uD604", mobile: "010-0000-0000", postCode: "00000", address: "\uC11C\uC6B8\uC2DC", detailAddress: "\uB354 \uB0B4\uCD94\uB7F4 \uBE4C\uB529", email: "a6570407@naver.com" }), (0, jsx_runtime_1.jsx)(CheckOutSection, { price: "24000" })] })) }))] })) }));
}
function Order() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Order;
