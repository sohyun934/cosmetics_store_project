"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./WishList.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../../firebase");
function Util() {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "util-container flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "num" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC804\uCCB4 2\uAC1C" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "all-del-btn radius-style-btn" }, { children: "\uC804\uCCB4 \uC0AD\uC81C" })) }))] })));
}
function Table() {
    return ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "wish-list" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", Object.assign({ colSpan: 2 }, { children: "\uC0C1\uD488" })), (0, jsx_runtime_1.jsx)("th", { children: "\uAC00\uACA9" }), (0, jsx_runtime_1.jsx)("th", { children: "\uAD00\uB9AC" })] }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "wish-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new02.jpg"), alt: "\uC2E0\uC81C\uD48802" }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uB85C\uC988\uB9C8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "price" }, { children: "22,000\uC6D0" })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "util-btn-container" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn" }, { children: "\uC7A5\uBC14\uAD6C\uB2C8" })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn" }, { children: "\uC0AD\uC81C" })) })] }))] })), (0, jsx_runtime_1.jsxs)("tr", Object.assign({ className: "wish-item" }, { children: [(0, jsx_runtime_1.jsx)("td", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/new/new03.jpg"), alt: "\uC2E0\uC81C\uD48803" }) })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/detail" }, { children: "\uB85C\uC988\uB9C8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" })) })), (0, jsx_runtime_1.jsx)("td", Object.assign({ className: "price" }, { children: "22,000\uC6D0" })), (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: "util-btn-container" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn" }, { children: "\uC7A5\uBC14\uAD6C\uB2C8" })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "radius-style-btn" }, { children: "\uC0AD\uC81C" })) })] }))] }))] })] })));
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
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "wishList" }), (0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "wish-section" }, { children: [(0, jsx_runtime_1.jsx)(Util, {}), (0, jsx_runtime_1.jsx)(Table, {})] }))] })) }));
}
function WishList() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = WishList;
