"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Modify.css");
const react_1 = require("react");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const react_router_dom_1 = require("react-router-dom");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../../firebase");
function Form(props) {
    const [postCode, setPostCode] = (0, react_1.useState)(props.postCode);
    const [address, setAddress] = (0, react_1.useState)(props.address);
    const [detailAddress, setDetailAddress] = (0, react_1.useState)(props.detailAddress);
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "modify-form", method: "post" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uC774\uBA54\uC77C", value: "a6570407@naver.com", readOnly: true, disabled: true }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638" }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: props.name, readOnly: true, disabled: true }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: props.mobile, readOnly: true, disabled: true }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "postcode-wrap" }, { children: [(0, jsx_runtime_1.jsx)("input", { className: "userPostcode", type: "text", placeholder: "\uC6B0\uD3B8\uBC88\uD638", value: postCode, onChange: event => setPostCode(event.target.value) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "search-btn" })] })), (0, jsx_runtime_1.jsx)("input", { className: "userAddress", type: "text", placeholder: "\uAE30\uBCF8 \uC8FC\uC18C", value: address, onChange: event => setAddress(event.target.value) }), (0, jsx_runtime_1.jsx)("input", { className: "userDetailAddress", type: "text", placeholder: "\uC0C1\uC138 \uC8FC\uC18C", value: detailAddress, onChange: event => setDetailAddress(event.target.value) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "modify-btn" }, { children: "\uD68C\uC6D0\uC815\uBCF4\uC218\uC815" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "member-leave small-txt" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: event => event.preventDefault() }, { children: "\uD68C\uC6D0\uD0C8\uD1F4" })) }))] })));
}
function Main() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (!user) {
                // User is signed out
                navigate("/", { replace: true });
            }
        });
    });
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "modify" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modify-wrap" }, { children: (0, jsx_runtime_1.jsx)(Form, { email: "a6570407@naver.com", name: "\uAE40\uC18C\uD604", mobile: "010-0000-0000", postCode: "00000", address: "\uC11C\uC6B8\uC2DC", detailAddress: "\uB354 \uB0B4\uCD94\uB7F4 \uBE4C\uB529" }) }))] })) }));
}
function Modify() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Modify;
