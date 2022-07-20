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
require("./OrderComplete.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const getImage_1 = require("../../../utils/getImage");
function NoticeSection() {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "notice-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uACB0\uC81C\uAC00 \uC815\uC0C1\uC801\uC73C\uB85C \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/", className: "order-list-btn border-style-btn" }, { children: "\uBA54\uC778\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })) }))] })));
}
function OrderItemSection(props) {
    const orderList = props.orderDetail.order_list;
    const [products, setProducts] = (0, react_1.useState)([]);
    function fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = [];
            if (orderList) {
                for (let i = 0; i < orderList.length; i++) {
                    const amount = props.orderDetail.amount_list[i];
                    const productName = props.orderDetail.product_name_list[i];
                    const productRef = (0, firestore_1.doc)(firebase_1.db, "product", productName);
                    const productSnap = yield (0, firestore_1.getDoc)(productRef);
                    const product = productSnap.data();
                    const thumb = yield (0, getImage_1.getImage)(product.product_thumb_01);
                    const price = product.product_price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                    const state = {
                        name: product.product_name,
                        price: product.product_price,
                        thumb01: product.product_thumb_01,
                        thumb02: product.product_thumb_02,
                        thumb03: product.product_thumb_03,
                        detail: product.product_detail
                    };
                    if (productSnap.exists()) {
                        products.push((0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "order-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: (0, jsx_runtime_1.jsx)("img", { src: thumb, alt: productName }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-item-name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: state }, { children: productName })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "order-amount" }, { children: amount })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "order-price" }, { children: [price, "\uC6D0"] }))] }), i));
                    }
                }
                setProducts(products);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchProducts();
    }, [orderList]);
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "order-item-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uC8FC\uBB38 \uC0C1\uD488" }), (0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC8FC\uBB38 \uC815\uBCF4" })), (0, jsx_runtime_1.jsx)("th", { children: "\uC218\uB7C9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAE08\uC561" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: products })] })] })));
}
function DeliverySection(props) {
    const name = props.orderDetail.name;
    const postCode = props.orderDetail.postcode;
    const address = props.orderDetail.address;
    const detailAddress = props.orderDetail.detail_address;
    const deliveryMsg = props.orderDetail.delivery_msg;
    let firstNumber;
    let thirdNumber;
    let phoneNumber = props.orderDetail.phone_number;
    if (phoneNumber) {
        firstNumber = phoneNumber.slice(0, 3);
        thirdNumber = phoneNumber.slice(-4);
        phoneNumber = firstNumber + "-****-" + thirdNumber;
    }
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "delivery-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uBC30\uC1A1\uC9C0 \uC815\uBCF4" }), (0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uBC1B\uB294\uBD84" }), (0, jsx_runtime_1.jsx)("td", { children: name })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC5F0\uB77D\uCC98" }), (0, jsx_runtime_1.jsx)("td", { children: phoneNumber })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC8FC\uC18C" }), (0, jsx_runtime_1.jsxs)("td", { children: ["(", postCode, ")", (0, jsx_runtime_1.jsx)("br", {}), address + " " + detailAddress] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uBC30\uC1A1 \uBA54\uC2DC\uC9C0" }), (0, jsx_runtime_1.jsx)("td", { children: deliveryMsg ? deliveryMsg : "\u00A0" })] })] }) })] })));
}
function PaySection(props) {
    const orderPrice = props.orderDetail.order_price;
    const fee = props.orderDetail.fee;
    const totPrice = props.orderDetail.tot_price;
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "payment-section" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uACB0\uC81C \uC815\uBCF4" }), (0, jsx_runtime_1.jsx)("table", { children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC0C1\uD488 \uAE08\uC561" }), (0, jsx_runtime_1.jsxs)("td", { children: [orderPrice, "\uC6D0"] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uBC30\uC1A1\uBE44" }), (0, jsx_runtime_1.jsxs)("td", { children: [fee, "\uC6D0"] })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\uC804\uCCB4 \uAE08\uC561" }), (0, jsx_runtime_1.jsxs)("td", { children: [totPrice, "\uC6D0"] })] })] }) })] })));
}
function Main() {
    const [orderDetail, setOrderDetail] = (0, react_1.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    let docId;
    if (state)
        docId = state.docId;
    function fetchOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(firebase_1.db, "order", docId);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists())
                setOrderDetail(docSnap.data());
        });
    }
    (0, react_1.useEffect)(() => {
        if (!state) {
            // url로 직접 접속하는 경우 메인페이지로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/");
        }
        else {
            fetchOrder();
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state && ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-detail big-container" }, { children: [(0, jsx_runtime_1.jsx)(NoticeSection, {}), (0, jsx_runtime_1.jsx)(OrderItemSection, { orderDetail: orderDetail }), (0, jsx_runtime_1.jsx)(DeliverySection, { orderDetail: orderDetail }), (0, jsx_runtime_1.jsx)(PaySection, { orderDetail: orderDetail })] })) })) }));
}
function OrderDetail() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = OrderDetail;
