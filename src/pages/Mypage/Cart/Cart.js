"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const getImage_1 = require("../../../utils/getImage");
const auth_1 = require("firebase/auth");
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
function CartSection(props) {
    const [amount, setAmount] = (0, react_1.useState)(1);
    const [cartList, setCartList] = (0, react_1.useState)([]);
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
    function delCartItem(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const button = e.target;
            yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, "cart", button.value));
            window.location.reload();
        });
    }
    function fetchCart(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", userEmail));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                setCartList([
                    (0, jsx_runtime_1.jsx)("tr", Object.assign({ className: "cart-item" }, { children: (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "empty" }, { children: "\uC7A5\uBC14\uAD6C\uB2C8\uAC00 \uBE44\uC5B4\uC788\uC2B5\uB2C8\uB2E4." })) }), "empty")
                ]);
            }
            else {
                // 장바구니에 담긴 product 정보 가져오기
                const productsPromises = querySnapshot.docs.map(document => (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, "product", document.data().product_name)));
                const products = yield Promise.all(productsPromises);
                const urlsPromises = products.map(product => (0, getImage_1.getImage)(product.data().product_thumb_01));
                const urls = yield Promise.all(urlsPromises);
                let orderPrice = 0;
                const cartList = [];
                querySnapshot.docs.map((doc, i) => __awaiter(this, void 0, void 0, function* () {
                    const cartItem = doc.data();
                    const product = products[i].data();
                    orderPrice += product.product_price * cartItem.amount;
                    cartList.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "cart-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "del-chk" }, { children: (0, jsx_runtime_1.jsx)(StyledInput, { type: "checkbox" }) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: {
                                        name: product.product_name,
                                        price: product.product_price,
                                        thumb01: product.product_thumb_01,
                                        thumb02: product.product_thumb_02,
                                        thumb03: product.product_thumb_03,
                                        detail: product.product_detail
                                    } }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[i], alt: cartItem.product_name }) })) })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: {
                                                name: product.product_name,
                                                price: product.product_price,
                                                thumb01: product.product_thumb_01,
                                                thumb02: product.product_thumb_02,
                                                thumb03: product.product_thumb_03,
                                                detail: product.product_detail
                                            } }, { children: cartItem.product_name })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: product.product_price })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex" }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "cnt-box" }, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "minus", onClick: minus }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "cnt", value: cartItem.amount, onChange: changeAmt }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "plus", onClick: plus })] })) }))] })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "del-util" }, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "del-btn", value: doc.id, onClick: e => delCartItem(e) }) }))] }), i));
                }));
                props.setOrderPrice(orderPrice);
                setCartList(cartList);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user)
                fetchCart(user.email);
        });
    }, []);
    function allDel(e) {
        e.preventDefault();
    }
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "cart-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Cart" }), (0, jsx_runtime_1.jsx)("table", Object.assign({ className: "cart-list" }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: cartList }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cart-del-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { type: "checkbox" }), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: allDel }, { children: "\uC804\uCCB4 \uC0AD\uC81C" }))] }))] })));
}
function OrderSection(props) {
    const price = String(props.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let fee = 3000;
    if (props.price >= 30000)
        fee = 0;
    const strFee = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const totPrice = String(props.price + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "order-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Order" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: "\uC8FC\uBB38\uAE08\uC561" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-fee flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: "\uBC30\uC1A1\uBE44" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "fee" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [strFee, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: "* 30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD569\uACC4" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [totPrice, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-wrap flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "part-order-btn gray-style-btn" }, { children: "\uC120\uD0DD\uC0C1\uD488 \uAD6C\uB9E4\uD558\uAE30" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "all-order-btn" }, { children: "\uC804\uCCB4 \uAD6C\uB9E4\uD558\uAE30" }))] }))] })));
}
function Main() {
    const [orderPrice, setOrderPrice] = (0, react_1.useState)(0);
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "cart" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-container" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "flex", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsx)(CartSection, { setOrderPrice: (orderPrice) => setOrderPrice(orderPrice) }), (0, jsx_runtime_1.jsx)(OrderSection, { price: orderPrice })] })) }))] })) }));
}
function Cart() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Cart;
