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
require("./OrderDetail.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const ReviewPop_1 = __importDefault(require("./ReviewPop/ReviewPop"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const getImage_1 = require("../../../utils/getImage");
const OrderComplete_1 = require("../../Order/OrderComplete/OrderComplete");
const auth_1 = require("firebase/auth");
const getFormatPrice_1 = require("../../../utils/getFormatPrice");
function DetailSection(props) {
    const orderDate = props.orderDetail.order_date;
    const orderNum = props.orderNum;
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "detail-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC0C1\uC138 \uC815\uBCF4" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-container" }, { children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\uC8FC\uBB38\uC77C\uC790 : ", (0, jsx_runtime_1.jsx)("strong", { children: orderDate })] }), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "order-num" }, { children: ["\uC8FC\uBB38\uBC88\uD638 : ", (0, jsx_runtime_1.jsx)("strong", { children: orderNum })] }))] }))] })));
}
function OrderItemSection(props) {
    const orderDetail = props.orderDetail;
    const orderList = orderDetail.order_list;
    const reviewId = props.reviewId;
    const [products, setProducts] = (0, react_1.useState)([]);
    const fetchProducts = () => __awaiter(this, void 0, void 0, function* () {
        const products = [];
        if (orderList) {
            for (let i = 0; i < orderList.length; i++) {
                const amount = orderDetail.amount_list[i];
                const productName = orderDetail.product_name_list[i];
                const productRef = (0, firestore_1.doc)(firebase_1.db, "product", productName);
                const productSnap = yield (0, firestore_1.getDoc)(productRef);
                const product = productSnap.data();
                const thumb = yield (0, getImage_1.getImage)(product.product_thumb_01);
                const price = (0, getFormatPrice_1.getFormatPrice)(product.product_price);
                const state = {
                    name: product.product_name,
                    price: product.product_price,
                    thumb01: product.product_thumb_01,
                    thumb02: product.product_thumb_02,
                    thumb03: product.product_thumb_03,
                    detail: product.product_detail
                };
                const reviewQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("email", "==", firebase_1.signedInUser), (0, firestore_1.where)("product_name", "==", productName));
                const reviewSnapshot = yield (0, firestore_1.getDocs)(reviewQuery);
                if (productSnap.exists()) {
                    products.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: (0, jsx_runtime_1.jsx)("img", { src: thumb, alt: productName }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: productName })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: amount })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-price" }, { children: [price, "\uC6D0"] })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-status" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC8FC\uBB38\uC644\uB8CC" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "review-pop-btn radius-style-btn", onClick: () => props.open(productName) }, { children: reviewSnapshot.empty ? "리뷰작성" : "리뷰수정" })) }) })] }))] }), i));
                }
            }
            setProducts(products);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchProducts();
    }, [orderDetail, reviewId]);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "order-item-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC8FC\uBB38 \uC0C1\uD488" }), (0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC8FC\uBB38 \uC815\uBCF4" })), (0, jsx_runtime_1.jsx)("th", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("th", { children: "\uC0C1\uD0DC" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: products })] })] })));
}
function Main() {
    const location = (0, react_router_dom_1.useLocation)();
    const query = new URLSearchParams(location.search);
    const docId = query.get("orderNo");
    const [orderDetail, setOrderDetail] = (0, react_1.useState)({ id: "", data: {} });
    const [reviewId, setReviewId] = (0, react_1.useState)("");
    const [reviewPop, setReviewPop] = (0, react_1.useState)(null);
    const fetchOrder = () => __awaiter(this, void 0, void 0, function* () {
        const docRef = (0, firestore_1.doc)(firebase_1.db, "order", docId);
        const docSnap = yield (0, firestore_1.getDoc)(docRef);
        if (docSnap.exists()) {
            setOrderDetail({ id: docSnap.id, data: docSnap.data() });
        }
    });
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user) {
                fetchOrder();
            }
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.keys(orderDetail.data).length > 0 && ((0, jsx_runtime_1.jsxs)("main", Object.assign({ className: "wrap" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-detail big-container" }, { children: [(0, jsx_runtime_1.jsx)(DetailSection, { orderDetail: orderDetail.data, orderNum: orderDetail.id }), (0, jsx_runtime_1.jsx)(OrderItemSection, { open: (productName) => setReviewPop((0, jsx_runtime_1.jsx)(ReviewPop_1.default, { close: (reviewId) => {
                                    setReviewPop(null);
                                    if (reviewId)
                                        setReviewId(reviewId);
                                }, productName: productName })), orderDetail: orderDetail.data, reviewId: reviewId }), (0, jsx_runtime_1.jsx)(OrderComplete_1.DeliverySection, { orderDetail: orderDetail.data }), (0, jsx_runtime_1.jsx)(OrderComplete_1.PaySection, { orderDetail: orderDetail.data }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/orderList", className: "order-list-btn border-style-btn" }, { children: "\uBAA9\uB85D" })) }))] })), reviewPop] }))) }));
}
function OrderDetail() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = OrderDetail;
