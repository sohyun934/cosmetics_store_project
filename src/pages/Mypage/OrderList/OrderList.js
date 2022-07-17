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
// function SearchSection() {
//     let onBtn: null | HTMLButtonElement = null;
//     const btns = [];
//     const btnTitles = ["1개월", "3개월", "6개월", "12개월"];
//     function searchPeriod(e: React.MouseEvent) {
//         if (onBtn !== null) onBtn.classList.remove("on-btn");
//         let clickBtn = e.target as HTMLButtonElement;
//         clickBtn.classList.add("on-btn");
//         onBtn = clickBtn;
//     }
//     for (let i = 0; i < btnTitles.length; i++) {
//         btns.push(
//             <button key={i} className="radius-style-btn" onClick={searchPeriod}>
//                 {btnTitles[i]}
//             </button>
//         );
//     }
//     return (
//         <section className="search-section flex">
//             <span className="small-txt">구매기간</span>
//             <div className="section-inner-left">
//                 <span className="select-month">{btns}</span>
//             </div>
//             <div className="section-inner-right">
//                 <input className="history-start-date small-txt" type="date" />
//                 ~
//                 <input className="history-end-date small-txt" type="date" />
//                 <span className="btn-wrap">
//                     <button className="search-btn small-txt">조회</button>
//                 </span>
//             </div>
//         </section>
//     );
// }
function OrderTable() {
    const [orderItems, setOrderItems] = (0, react_1.useState)([]);
    function fetchOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderItems = [];
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "order"), (0, firestore_1.where)("email", "==", firebase_1.signedInUser), (0, firestore_1.orderBy)("order_id", "desc"));
            const orderSnapshot = yield (0, firestore_1.getDocs)(q);
            const productNames = [];
            const products = {};
            orderSnapshot.forEach(doc => {
                productNames.push(...doc.data().product_name_list);
            });
            for (let i = 0; i < productNames.length; i++) {
                const docRef = (0, firestore_1.doc)(firebase_1.db, "product", productNames[i]);
                const docSnap = yield (0, firestore_1.getDoc)(docRef);
                const product = docSnap.data();
                const url = yield (0, getImage_1.getImage)(product.product_thumb_01);
                const url2 = product.product_thumb_02;
                const url3 = product.product_thumb_03;
                const price = product.product_price;
                const name = product.product_name;
                const detail = product.product_detail;
                products[productNames[i]] = [name, price, url, url2, url3, detail];
            }
            orderSnapshot.forEach(document => {
                const order = document.data();
                const productNames = order.product_name_list;
                const amountList = order.amount_list;
                const year = order.order_id.substr(0, 4);
                const month = order.order_id.substr(4, 2);
                const day = order.order_id.substr(6, 2);
                const orderDate = year + "." + month + "." + day;
                for (let i = 0; i < productNames.length; i++) {
                    const state = {
                        name: products[productNames[i]][0],
                        price: products[productNames[i]][1],
                        thumb01: products[productNames[i]][2],
                        thumb02: products[productNames[i]][3],
                        thumb03: products[productNames[i]][4],
                        detail: products[productNames[i]][5]
                    };
                    orderItems.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [i === 0 ? ((0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-date", rowSpan: productNames.length }, { children: [orderDate, (0, jsx_runtime_1.jsx)("div", { className: "order-num" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/orderDetail", state: {
                                            orderId: order.order_id
                                        } }, { children: "\uC0C1\uC138\uBCF4\uAE30" }))] }))) : (""), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: (0, jsx_runtime_1.jsx)("img", { src: products[productNames[i]][2], alt: productNames[i] }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: productNames[i] })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: amountList[i] })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-price" }, { children: [products[productNames[i]][1], "\uC6D0"] })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-status" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC8FC\uBB38\uC644\uB8CC" }) }))] }), document.id + i));
                }
            });
            setOrderItems(orderItems);
        });
    }
    (0, react_1.useEffect)(() => {
        fetchOrder();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "order-table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC8FC\uBB38\uC77C\uC790" }), (0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC0C1\uD488" })), (0, jsx_runtime_1.jsx)("th", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("th", { children: "\uC0C1\uD0DC" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: orderItems })] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-list big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "orderList" }), (0, jsx_runtime_1.jsx)(OrderTable, {})] })) }));
}
function OrderList() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = OrderList;
