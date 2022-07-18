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
const StyledInput = styled_components_1.default.input `
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;
function OrderForm() {
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [phoneNumber, setPhoneNumber] = (0, react_1.useState)("");
    const [postcode, setPostcode] = (0, react_1.useState)("");
    const [address, setAddress] = (0, react_1.useState)("");
    const [detailAddress, setDetailAddress] = (0, react_1.useState)("");
    const [deliveryMsg, setDeliveryMsg] = (0, react_1.useState)("");
    const [disabled, setDisabled] = (0, react_1.useState)(true);
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = (0, react_daum_postcode_1.useDaumPostcodePopup)(scriptUrl);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const orderList = state.orderList;
    const orderPrice = state.orderPrice;
    const fee = state.fee;
    const totPrice = state.totPrice;
    // 사용자 정보 가져오기
    function fetchUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", firebase_1.signedInUser));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            querySnapshot.forEach(doc => {
                const user = doc.data();
                setName(user.name);
                setEmail(user.email);
                setPhoneNumber(user.phoneNumber);
                setPostcode(user.post_code);
                setAddress(user.address);
                setDetailAddress(user.detail_address);
            });
        });
    }
    (0, react_1.useEffect)(() => {
        fetchUser().catch(() => {
            navigate("/mypage/cart");
        });
    }, []);
    // 다음 우편번호 API
    function handleComplete(data) {
        let addr = "";
        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R")
            addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else
            addr = data.jibunAddress;
        setPostcode(data.zonecode);
        setAddress(addr);
    }
    function handleClick() {
        open({ onComplete: handleComplete });
    }
    // 유효성 검증 후 결제하기 버튼 활성화
    (0, react_1.useEffect)(() => {
        if (name && phoneNumber && postcode && address && detailAddress)
            setDisabled(false);
        else
            setDisabled(true);
    }, [name, phoneNumber, postcode, address, detailAddress]);
    function getToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return year + month + day;
    }
    // 난수 생성
    function generateRandomCode(n) {
        let str = "";
        for (let i = 0; i < n; i++)
            str += Math.floor(Math.random() * 10);
        return str;
    }
    // 주문 진행
    function order() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = getToday();
            const randomCode = generateRandomCode(4);
            const orderId = today + randomCode;
            const amountList = [];
            const productNameList = [];
            for (let i = 0; i < orderList.length; i++) {
                const cartRef = (0, firestore_1.doc)(firebase_1.db, "cart", orderList[i]);
                const cartSnap = yield (0, firestore_1.getDoc)(cartRef);
                if (cartSnap.exists()) {
                    const cart = cartSnap.data();
                    amountList.push(cart.amount);
                    productNameList.push(cart.product_name);
                    // 장바구니에서 삭제
                    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, "cart", orderList[i]));
                }
            }
            // firestore에 주문 정보 등록
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, "order", orderId), {
                order_id: orderId,
                order_list: orderList,
                amount_list: amountList,
                product_name_list: productNameList,
                name: name,
                email: email,
                phone_number: phoneNumber,
                postcode: postcode,
                address: address,
                detail_address: detailAddress,
                delivery_msg: deliveryMsg,
                order_price: orderPrice,
                fee: fee,
                tot_price: totPrice
            }).then(() => {
                navigate("/order/orderComplete", {
                    state: {
                        orderId: orderId
                    }
                });
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "flex", action: "#", method: "post" }, { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "delivery-section" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Delivery" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uBC1B\uB294 \uBD84", value: name, onChange: e => setName(e.target.value) }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uD578\uB4DC\uD3F0\uBC88\uD638", value: phoneNumber, onChange: e => setPhoneNumber(e.target.value) }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "postcode-wrap" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { className: "userPostcode", type: "text", placeholder: "\uC6B0\uD3B8\uBC88\uD638", value: postcode, onChange: e => setPostcode(e.target.value), readOnly: true }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "search-btn", onClick: handleClick })] })), (0, jsx_runtime_1.jsx)(StyledInput, { className: "userAddress", type: "text", placeholder: "\uAE30\uBCF8 \uC8FC\uC18C", value: address, onChange: e => setAddress(e.target.value), readOnly: true }), (0, jsx_runtime_1.jsx)("input", { className: "userDetailAddress", type: "text", placeholder: "\uC0C1\uC138 \uC8FC\uC18C", value: detailAddress, onChange: e => setDetailAddress(e.target.value) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-msg" }, { children: [(0, jsx_runtime_1.jsxs)("select", Object.assign({ onChange: e => setDeliveryMsg(e.target.value) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "\uC9C1\uC811 \uC785\uB825" })), (0, jsx_runtime_1.jsx)("option", { children: "\uBC30\uC1A1 \uC804 \uC5F0\uB77D \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsx)("option", { children: "\uBD80\uC7AC \uC2DC \uACBD\uBE44\uC2E4\uC5D0 \uB9E1\uACA8\uC8FC\uC138\uC694." }), (0, jsx_runtime_1.jsx)("option", { children: "\uBB38 \uC55E \uBC30\uC1A1 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4." })] })), (0, jsx_runtime_1.jsx)("textarea", { rows: 5, cols: 50, maxLength: 50, placeholder: "\uBC30\uC1A1\uBA54\uC2DC\uC9C0 \uC9C1\uC811 \uC785\uB825 (50\uC790 \uC774\uB0B4)", value: deliveryMsg, onChange: e => setDeliveryMsg(e.target.value), style: { fontSize: "1rem" } })] }))] })), (0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "check-out-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Check Out" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "check-out-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uC8FC\uBB38\uAE08\uC561" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [orderPrice, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "delivery-fee flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uBC30\uC1A1\uBE44" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "fee" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [fee, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: "* 30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-price flex" }, { children: [(0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD569\uACC4" }) }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [totPrice, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/cart", className: "cancel-btn border-style-btn" }, { children: "\uCDE8\uC18C\uD558\uAE30" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "pay-btn", onClick: order, disabled: disabled }, { children: "\uACB0\uC81C\uD558\uAE30" }))] }))] }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "order-container big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "ORDER" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-container" }, { children: (0, jsx_runtime_1.jsx)(OrderForm, {}) }))] })) }));
}
function Order() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Order;
