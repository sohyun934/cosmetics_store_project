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
require("./Order.css");
const Header_1 = __importDefault(require("../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../components/Footer/Footer"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("../../firebase");
const firestore_1 = require("firebase/firestore");
const react_daum_postcode_1 = require("react-daum-postcode");
const styled_components_1 = __importDefault(require("styled-components"));
const getDate_1 = require("../../utils/getDate");
const StyledInput = styled_components_1.default.input `
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;
function OrderForm(props) {
    const [user, setUser] = (0, react_1.useState)({
        name: "",
        email: "",
        phoneNumber: "",
        postCode: "",
        address: "",
        detailAddress: ""
    });
    const checkOut = {
        orderPrice: props.state.orderPrice,
        fee: props.state.fee,
        totPrice: props.state.totPrice
    };
    const order = {
        fromCart: props.state.fromCart,
        orderList: props.state.orderList,
        amount: props.state.amount
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [deliveryMsg, setDeliveryMsg] = (0, react_1.useState)("");
    const [disabled, setDisabled] = (0, react_1.useState)(true);
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = (0, react_daum_postcode_1.useDaumPostcodePopup)(scriptUrl);
    // 사용자 정보 가져오기
    const fetchUser = () => __awaiter(this, void 0, void 0, function* () {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", firebase_1.signedInUser));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();
            setUser({
                name: user.name,
                email: user.email,
                phoneNumber: user.phone_number,
                postCode: user.post_code,
                address: user.address,
                detailAddress: user.detail_address
            });
        });
    });
    (0, react_1.useEffect)(() => {
        // 새로고침 시 이전페이지로 이동
        fetchUser().catch(() => {
            navigate(-1);
        });
    }, []);
    // 다음 우편번호 API
    const handleComplete = data => {
        let addr = "";
        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R")
            addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else
            addr = data.jibunAddress;
        setUser(user => (Object.assign(Object.assign({}, user), { postCode: data.zonecode, address: addr })));
    };
    const handleSearch = () => {
        open({ onComplete: handleComplete });
    };
    // 유효성 검증 후 결제하기 버튼 활성화
    (0, react_1.useEffect)(() => {
        if (user.name && user.phoneNumber && user.postCode && user.address && user.detailAddress)
            setDisabled(false);
        else
            setDisabled(true);
    }, [user]);
    // 난수 생성
    const getRandomCode = (n) => {
        let str = "";
        for (let i = 0; i < n; i++) {
            str += Math.floor(Math.random() * 10);
        }
        return str;
    };
    // 주문 진행
    const handleOrder = () => __awaiter(this, void 0, void 0, function* () {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, "order"));
        const orderId = querySnapshot.size + 1;
        const date = (0, getDate_1.getDate)();
        const randomCode = getRandomCode(4);
        const orderNum = date.join("") + randomCode;
        const amountList = [];
        const productNameList = [];
        if (order.fromCart) {
            // 장바구니에서 주문
            for (let i = 0; i < order.orderList.length; i++) {
                const cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", order.orderList[i]);
                const cartSnap = yield (0, firestore_1.getDoc)(cartRef);
                if (cartSnap.exists()) {
                    const cart = cartSnap.data();
                    amountList.push(cart.amount);
                    productNameList.push(cart.product_name);
                    // 장바구니에서 삭제
                    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, "cart", order.orderList[i]));
                }
            }
        }
        else {
            // 상품 상세페이지에서 주문
            amountList.push(order.amount);
            productNameList.push(order.orderList[0]);
        }
        // firestore에 주문 정보 등록
        yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, "order", orderNum), {
            order_id: orderId,
            order_date: date.join("."),
            order_list: order.orderList,
            amount_list: amountList,
            product_name_list: productNameList,
            name: user.name,
            email: user.email,
            phone_number: user.phoneNumber,
            post_code: user.postCode,
            address: user.address,
            detail_address: user.detailAddress,
            delivery_msg: deliveryMsg,
            order_price: checkOut.orderPrice,
            fee: checkOut.fee,
            tot_price: checkOut.totPrice
        }).then(() => {
            navigate("/order/orderComplete", {
                replace: true,
                state: {
                    docId: orderNum
                }
            });
        });
    });
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "delivery-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Delivery" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uBC1B\uB294 \uBD84", value: user.name, onChange: e => setUser(user => (Object.assign(Object.assign({}, user), { name: e.target.value }))) }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uD578\uB4DC\uD3F0\uBC88\uD638", value: user.phoneNumber, onChange: e => setUser(user => (Object.assign(Object.assign({}, user), { phoneNumber: e.target.value }))) }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "postcode-wrap" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { className: "userPostcode", type: "text", placeholder: "\uC6B0\uD3B8\uBC88\uD638", value: user.postCode || "", onChange: e => setUser(user => (Object.assign(Object.assign({}, user), { postCode: e.target.value }))), readOnly: true }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "search-btn", onClick: handleSearch })] })), (0, jsx_runtime_1.jsx)(StyledInput, { className: "userAddress", type: "text", placeholder: "\uAE30\uBCF8 \uC8FC\uC18C", value: user.address || "", onChange: e => setUser(user => (Object.assign(Object.assign({}, user), { address: e.target.value }))), readOnly: true }), (0, jsx_runtime_1.jsx)("input", { className: "userDetailAddress", type: "text", placeholder: "\uC0C1\uC138 \uC8FC\uC18C", value: user.detailAddress || "", onChange: e => setUser(user => (Object.assign(Object.assign({}, user), { detailAddress: e.target.value }))) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-msg" }, { children: [(0, jsx_runtime_1.jsxs)("select", Object.assign({ onChange: e => setDeliveryMsg(e.target.value) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "\uC9C1\uC811 \uC785\uB825" })), (0, jsx_runtime_1.jsx)("option", { children: "\uBC30\uC1A1 \uC804 \uC5F0\uB77D \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsx)("option", { children: "\uBD80\uC7AC \uC2DC \uACBD\uBE44\uC2E4\uC5D0 \uB9E1\uACA8\uC8FC\uC138\uC694." }), (0, jsx_runtime_1.jsx)("option", { children: "\uBB38 \uC55E \uBC30\uC1A1 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4." })] })), (0, jsx_runtime_1.jsx)("textarea", { rows: 5, cols: 50, maxLength: 50, placeholder: "\uBC30\uC1A1\uBA54\uC2DC\uC9C0 \uC9C1\uC811 \uC785\uB825 (50\uC790 \uC774\uB0B4)", value: deliveryMsg, onChange: e => setDeliveryMsg(e.target.value), style: { fontSize: "1rem" } })] }))] })), (0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "check-out-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Check Out" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "check-out-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uC8FC\uBB38\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [checkOut.orderPrice, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-fee flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uBC30\uC1A1\uBE44" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "fee" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [checkOut.fee, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: "* 30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD569\uACC4" }) }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [checkOut.totPrice, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "cancel-btn border-style-btn", onClick: () => navigate(-1) }, { children: "\uCDE8\uC18C\uD558\uAE30" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "pay-btn", onClick: handleOrder, disabled: disabled }, { children: "\uACB0\uC81C\uD558\uAE30" }))] }))] }))] })));
}
function Main() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    (0, react_1.useEffect)(() => {
        if (!state) {
            // url로 직접 접속하는 경우 메인페이지로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/");
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state && ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-container big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "ORDER" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-container" }, { children: (0, jsx_runtime_1.jsx)(OrderForm, { state: state }) }))] })) })) }));
}
function Order() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Order;
