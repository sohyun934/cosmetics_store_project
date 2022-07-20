"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Welcome.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", Object.assign({ className: "middle-main" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "middle-container welcome-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "THE NATURAL \uD68C\uC6D0\uC774 \uB418\uC2E0 \uAC83\uC744" }), (0, jsx_runtime_1.jsx)("h2", { children: "\uD658\uC601\uD569\uB2C8\uB2E4!" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/", className: "move-btn" }, { children: "\uC1FC\uD551\uD558\uB7EC \uAC00\uAE30" })) }))] })) })));
}
function Welcome() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    (0, react_1.useEffect)(() => {
        if (!state) {
            // url로 직접 접속하는 경우 메인페이지로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/");
        }
    }, [state]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] })) }));
}
exports.default = Welcome;
