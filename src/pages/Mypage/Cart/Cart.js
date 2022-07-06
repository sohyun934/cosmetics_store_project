"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Cart.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const StyledInput = styled_components_1.default.input `
    appearance: none;
    border: 1.5px solid #aaa;
    width: 0.9rem;
    height: 0.9rem;

    &:checked {
        border: transparent;
        background: #e5e5e5
            url("data:image/svg+xml,%3Csvg width='1.5rem' height='1.5rem' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' 
	stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
            no-repeat 50% / 100%;
    }
`;
function CartSection() {
    const trs = [];
    const [amount, setAmount] = (0, react_1.useState)(1);
    function minus() {
        setAmount(amount === 1 ? 1 : amount - 1);
    }
    function changeAmt(e) {
        const amount = Number(e.target.value);
        if (amount >= 3) {
            alert("최대 주문수량은 3개 입니다.");
            setAmount(3);
        }
        else if (amount < 1) {
            alert("최소 주문수량은 1개 입니다.");
            setAmount(1);
        }
        else if (isNaN(amount)) {
            alert("숫자만 입력 가능합니다.");
            setAmount(1);
        }
        else {
            setAmount(Number(e.target.value));
        }
    }
    function plus() {
        setAmount(amount === 3 ? 3 : amount + 1);
        if (amount === 3)
            alert("최대 주문수량은 3개 입니다.");
    }
    for (let i = 0; i < 2; i++) {
        trs.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "cart-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "del-chk" }, { children: (0, jsx_runtime_1.jsx)(StyledInput, { type: "checkbox" }) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new02.jpg"), alt: "\uC2E0\uC81C\uD48802" }) })) })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uD2F0\uD2B8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: "22,000\uC6D0" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex" }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "cnt-box" }, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "minus", onClick: minus }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "cnt", value: amount, onChange: changeAmt }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "plus", onClick: plus })] })) }))] })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "del-util" }, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "del-btn" }) }))] }), i));
    }
    function allDel(e) {
        e.preventDefault();
    }
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "cart-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Cart" }), (0, jsx_runtime_1.jsx)("table", Object.assign({ className: "cart-list" }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: trs }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cart-del-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { type: "checkbox" }), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: allDel }, { children: "\uC804\uCCB4 \uC0AD\uC81C" }))] }))] })));
}
function OrderSection(props) {
    const price = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let fee = 3000;
    if (Number(props.price) >= 30000)
        fee = 0;
    const strFee = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const totPrice = String(Number(props.price) + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "order-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Order" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: "\uC8FC\uBB38\uAE08\uC561" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-fee flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: "\uBC30\uC1A1\uBE44" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "fee" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [strFee, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: "* 30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD569\uACC4" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [totPrice, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-wrap flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "part-order-btn gray-style-btn" }, { children: "\uC120\uD0DD\uC0C1\uD488 \uAD6C\uB9E4\uD558\uAE30" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "all-order-btn" }, { children: "\uC804\uCCB4 \uAD6C\uB9E4\uD558\uAE30" }))] }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "cart" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-container" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "flex", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsx)(CartSection, {}), (0, jsx_runtime_1.jsx)(OrderSection, { price: "44000" })] })) }))] })) }));
}
function Cart() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Cart;
