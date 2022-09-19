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
require("./OrderList.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const getImage_1 = require("../../../utils/getImage");
const auth_1 = require("firebase/auth");
const react_js_pagination_1 = __importDefault(require("react-js-pagination"));
function OrderTable() {
    const [page, setPage] = (0, react_1.useState)(1);
    const [totItemsCnt, setTotItemsCnt] = (0, react_1.useState)(0);
    const [orderItems, setOrderItems] = (0, react_1.useState)([]);
    // 페이지네이션
    const handlePageChange = (page) => {
        setPage(page);
    };
    // 주문 내역 리스트 가져오기
    const fetchOrder = (userEmail) => __awaiter(this, void 0, void 0, function* () {
        let orderSnapshot;
        const orderItems = [];
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "order"), (0, firestore_1.where)("email", "==", userEmail), (0, firestore_1.orderBy)("order_id", "desc"));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        setTotItemsCnt(querySnapshot.size);
        if (page === 1) {
            const first = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "order"), (0, firestore_1.where)("email", "==", userEmail), (0, firestore_1.orderBy)("order_id", "desc"), (0, firestore_1.limit)(5));
            orderSnapshot = yield (0, firestore_1.getDocs)(first);
        }
        else {
            let lastVisible = querySnapshot.docs[(page - 1) * 5 - 1];
            const next = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "order"), (0, firestore_1.where)("email", "==", userEmail), (0, firestore_1.orderBy)("order_id", "desc"), (0, firestore_1.startAfter)(lastVisible), (0, firestore_1.limit)(5));
            orderSnapshot = yield (0, firestore_1.getDocs)(next);
        }
        for (let document of orderSnapshot.docs) {
            const order = document.data();
            const productNames = order.product_name_list;
            const orderDate = order.order_date;
            const amountList = order.amount_list;
            // 주문 상품 정보 가져오기
            for (let i = 0; i < productNames.length; i++) {
                const docRef = (0, firestore_1.doc)(firebase_1.db, "product", productNames[i]);
                const docSnap = yield (0, firestore_1.getDoc)(docRef);
                const product = docSnap.data();
                const name = product.product_name;
                const price = product.product_price;
                const thumb01 = yield (0, getImage_1.getImage)(product.product_thumb_01);
                const thumb02 = product.product_thumb_02;
                const thumb03 = product.product_thumb_03;
                const detail = product.product_detail;
                const state = {
                    name: name,
                    price: price,
                    thumb01: thumb01,
                    thumb02: thumb02,
                    thumb03: thumb03,
                    detail: detail
                };
                orderItems.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [i === 0 && ((0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-date", rowSpan: productNames.length }, { children: [orderDate, (0, jsx_runtime_1.jsx)("div", { className: "order-num" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/mypage/orderDetail?orderNo=${document.id}` }, { children: "\uC0C1\uC138\uBCF4\uAE30" }))] }))), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: (0, jsx_runtime_1.jsx)("img", { src: thumb01, alt: productNames[i] }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: productNames[i] })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: amountList[i] })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-price" }, { children: [price, "\uC6D0"] })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-status" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC8FC\uBB38\uC644\uB8CC" }) }))] }), document.id + docSnap.id));
            }
        }
        setOrderItems(orderItems);
    });
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user) {
                fetchOrder(user.email);
            }
        });
    }, [page]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "order-table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC8FC\uBB38\uC77C\uC790" }), (0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC0C1\uD488" })), (0, jsx_runtime_1.jsx)("th", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("th", { children: "\uC0C1\uD0DC" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: orderItems.length > 0 ? (orderItems) : ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", Object.assign({ colSpan: 6, style: { textAlign: "center" } }, { children: (0, jsx_runtime_1.jsx)("p", { children: "\uC8FC\uBB38 \uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })) })] })), orderItems.length > 0 && ((0, jsx_runtime_1.jsx)(react_js_pagination_1.default, { activePage: page, itemsCountPerPage: 5, totalItemsCount: totItemsCnt, pageRangeDisplayed: 5, prevPageText: "\u2039", nextPageText: "\u203A", onChange: handlePageChange }))] }));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-list big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "orderList" }), (0, jsx_runtime_1.jsx)(OrderTable, {})] })) }));
}
function OrderList() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = OrderList;
