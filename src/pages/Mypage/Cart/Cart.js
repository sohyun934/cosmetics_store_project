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
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const getImage_1 = require("../../../utils/getImage");
const auth_1 = require("firebase/auth");
const getFormatPrice_1 = require("../../../utils/getFormatPrice");
const react_js_pagination_1 = __importDefault(require("react-js-pagination"));
const StyledSelect = styled_components_1.default.select `
    width: 2.8rem;
    height: 1.5rem;
    padding: 0 0 0 5px;
    border: 1px solid #d0d0d0;
    border-radius: 5px;
    font-size: 0.75rem;
    background: white;
    margin-left: 10px;
`;
function CartForm() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [page, setPage] = (0, react_1.useState)(1);
    const [totItemsCnt, setTotItemsCnt] = (0, react_1.useState)(0);
    const [checkList, setCheckList] = (0, react_1.useState)([]);
    const [price, setPrice] = (0, react_1.useState)({ orderPrice: "0", fee: "0", totPrice: "0" });
    const [cart, setCart] = (0, react_1.useState)({ list: [], idList: [], amountList: [], priceList: [] });
    // 주문서 가격 설정
    const handlePrice = (orderPrice) => {
        let fee = 0;
        if (orderPrice > 0 && orderPrice < 30000)
            fee = 3000;
        setPrice(price => (Object.assign(Object.assign({}, price), { orderPrice: (0, getFormatPrice_1.getFormatPrice)(String(orderPrice)), fee: (0, getFormatPrice_1.getFormatPrice)(String(fee)), totPrice: (0, getFormatPrice_1.getFormatPrice)(String(orderPrice + fee)) })));
    };
    // 장바구니 상품 수량 변경
    const handleAmt = (i, id, amount) => __awaiter(this, void 0, void 0, function* () {
        const cartItemRef = (0, firestore_1.doc)(firebase_1.db, "cart", id);
        yield (0, firestore_1.updateDoc)(cartItemRef, {
            amount: amount
        }).then(() => {
            const newAmountList = [...cart.amountList];
            newAmountList[i] = amount;
            setCart(cart => (Object.assign(Object.assign({}, cart), { amountList: newAmountList })));
            let orderPrice = 0;
            for (let i = 0; i < cart.priceList.length; i++)
                orderPrice += cart.priceList[i] * newAmountList[i];
            handlePrice(orderPrice);
            window.confirm("수량 변경이 완료되었습니다.");
        });
    });
    // 페이지네이션
    const handlePageChange = (page) => {
        setPage(page);
    };
    // 장바구니 리스트 가져오기
    const fetchCart = (userEmail) => __awaiter(this, void 0, void 0, function* () {
        let cartSnapshot;
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", userEmail), (0, firestore_1.orderBy)("cart_id", "desc"));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        setTotItemsCnt(querySnapshot.size);
        if (page === 1) {
            const first = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", userEmail), (0, firestore_1.orderBy)("cart_id", "desc"), (0, firestore_1.limit)(5));
            cartSnapshot = yield (0, firestore_1.getDocs)(first);
        }
        else {
            let lastVisible = querySnapshot.docs[(page - 1) * 5 - 1];
            const next = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", userEmail), (0, firestore_1.orderBy)("cart_id", "desc"), (0, firestore_1.startAfter)(lastVisible), (0, firestore_1.limit)(5));
            cartSnapshot = yield (0, firestore_1.getDocs)(next);
        }
        // 장바구니에 담긴 product 정보 가져오기
        const productsPromises = cartSnapshot.docs.map(document => (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, "product", document.data().product_name)));
        const products = yield Promise.all(productsPromises);
        const urlsPromises = products.map(product => (0, getImage_1.getImage)(product.data().product_thumb_01));
        const urls = yield Promise.all(urlsPromises);
        let orderPrice = 0;
        const cartIdList = [];
        const cartAmountList = [];
        const cartPriceList = [];
        const cartList = [];
        cartSnapshot.docs.forEach((doc, i) => {
            const cartItem = doc.data();
            const product = products[i].data();
            const state = {
                name: product.product_name,
                price: product.product_price,
                thumb01: product.product_thumb_01,
                thumb02: product.product_thumb_02,
                thumb03: product.product_thumb_03,
                detail: product.product_detail
            };
            orderPrice += product.product_price * cartItem.amount;
            cartIdList.push(doc.id);
            cartAmountList.push(cartItem.amount);
            cartPriceList.push(product.product_price);
            cartList.push((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "cart-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[i], alt: cartItem.product_name }) })) })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: cartItem.product_name })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "price" }, { children: [product.product_price, "\uC6D0"] }))] }))] }));
        });
        handlePrice(orderPrice);
        setCart(cart => (Object.assign(Object.assign({}, cart), { list: cartList, idList: cartIdList, amountList: cartAmountList, priceList: cartPriceList })));
    });
    const getCartList = () => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user)
                fetchCart(user.email);
        });
    };
    (0, react_1.useEffect)(() => {
        getCartList();
    }, [page]);
    // 체크박스 단일 선택
    const handleSingleCheck = (isChecked, id) => {
        if (isChecked) {
            setCheckList(checkList => [...checkList, id]);
        }
        else {
            setCheckList(checkList => checkList.filter(el => el !== id));
        }
    };
    // 체크박스 전체 선택
    const handleAllCheck = (isChecked) => {
        if (isChecked) {
            setCheckList(cart.idList);
        }
        else {
            setCheckList([]);
        }
    };
    // 장바구니 개별 삭제
    const handleDel = (id) => __awaiter(this, void 0, void 0, function* () {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, "cart", id)).then(() => {
            setCheckList([]);
            getCartList();
        });
    });
    // 장바구니 선택 삭제
    const handlePartDel = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (checkList.length === 0) {
            alert("선택된 상품이 없습니다.");
        }
        else {
            if (window.confirm("선택된 상품을 삭제하시겠습니까?")) {
                for (let id of checkList) {
                    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, "cart", id)).then(() => {
                        setCheckList([]);
                        getCartList();
                    });
                }
            }
        }
    });
    // 장바구니 전체 삭제
    const handleAllDel = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (window.confirm("장바구니를 비우시겠습니까?")) {
            for (let id of cart.idList) {
                yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, "cart", id)).then(() => {
                    setCheckList([]);
                    getCartList();
                });
            }
        }
    });
    // 선택 주문
    const handleOrder = () => __awaiter(this, void 0, void 0, function* () {
        if (checkList.length === 0) {
            alert("선택된 상품이 없습니다.");
        }
        else {
            let fee = 0;
            let orderPrice = 0;
            for (let i = 0; i < checkList.length; i++) {
                const cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", checkList[i]);
                const cartSnap = yield (0, firestore_1.getDoc)(cartRef);
                const cart = cartSnap.data();
                const productRef = (0, firestore_1.doc)(firebase_1.db, "product", cart.product_name);
                const productSnap = yield (0, firestore_1.getDoc)(productRef);
                const product = productSnap.data();
                orderPrice += cart.amount * product.product_price;
            }
            if (orderPrice > 0 && orderPrice < 30000) {
                fee = 3000;
            }
            navigate("/order", {
                state: {
                    fromCart: true,
                    orderList: checkList,
                    orderPrice: (0, getFormatPrice_1.getFormatPrice)(String(orderPrice)),
                    fee: (0, getFormatPrice_1.getFormatPrice)(String(fee)),
                    totPrice: (0, getFormatPrice_1.getFormatPrice)(String(orderPrice + fee))
                }
            });
        }
    });
    // 전체 주문
    const handleAllOrder = () => {
        if (cart.idList.length === 0) {
            alert("장바구니에 담긴 상품이 없습니다.");
        }
        else {
            navigate("/order", {
                state: {
                    fromCart: true,
                    orderList: cart.idList,
                    orderPrice: price.orderPrice,
                    fee: price.fee,
                    totPrice: price.totPrice
                }
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "flex", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "cart-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Cart" }), (0, jsx_runtime_1.jsx)("table", Object.assign({ className: "cart-list" }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: cart.list.length > 0 ? (cart.list.map((val, i) => {
                                return ((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "cart-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "del-chk" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", "aria-label": "select item checkbox", checked: checkList.includes(cart.idList[i]) ? true : false, onChange: e => handleSingleCheck(e.target.checked, cart.idList[i]) }) })), val, (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)(StyledSelect, Object.assign({ defaultValue: cart.amountList[i], onChange: e => handleAmt(i, cart.idList[i], Number(e.target.value)) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "1" }, { children: "1" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "2" }, { children: "2" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "3" }, { children: "3" }))] })) }), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "del-util" }, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "del-btn", "aria-label": "remove cart item button", onClick: () => handleDel(cart.idList[i]) }) }))] }), i));
                            })) : ((0, jsx_runtime_1.jsx)("tr", Object.assign({ className: "cart-item" }, { children: (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "empty" }, { children: "\uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uAE34 \uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })) }), "empty")) }) })), cart.list.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cart-del-wrap small-txt" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", "aria-label": "select all checkbox", checked: cart.list.length !== 0 && checkList.length === cart.list.length ? true : false, onChange: e => handleAllCheck(e.target.checked) }), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: handlePartDel }, { children: "\uC120\uD0DD\uC0AD\uC81C" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: handleAllDel }, { children: "\uC804\uCCB4\uC0AD\uC81C" }))] })), (0, jsx_runtime_1.jsx)(react_js_pagination_1.default, { activePage: page, itemsCountPerPage: 5, totalItemsCount: totItemsCnt, pageRangeDisplayed: 5, prevPageText: "\u2039", nextPageText: "\u203A", onChange: handlePageChange })] }))] })), cart.list.length > 0 && ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "order-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Order" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: "\uC8FC\uBB38\uAE08\uC561" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price.orderPrice, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-fee flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: "\uBC30\uC1A1\uBE44" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "fee" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price.fee, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: "* 30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "title" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD569\uACC4" }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price.totPrice, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-wrap flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "part-order-btn gray-style-btn", onClick: handleOrder }, { children: "\uC120\uD0DD\uC0C1\uD488 \uAD6C\uB9E4\uD558\uAE30" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "all-order-btn", onClick: handleAllOrder }, { children: "\uC804\uCCB4 \uAD6C\uB9E4\uD558\uAE30" }))] }))] })))] })));
}
function Cart() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "cart" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-container" }, { children: (0, jsx_runtime_1.jsx)(CartForm, {}) }))] })) }));
}
exports.default = Cart;
