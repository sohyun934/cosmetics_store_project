"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../../styles/style.css");
require("./Header.css");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../firebase");
function LeftGnb() {
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "header-gnb-left" }, { children: (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/new" }, { children: "\uC2E0\uC81C\uD488" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/best" }, { children: "\uBCA0\uC2A4\uD2B8" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/hair" }, { children: "\uD5E4\uC5B4\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/skin" }, { children: "\uC2A4\uD0A8\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/body" }, { children: "\uBC14\uB514\uCF00\uC5B4" })) })] }) })));
}
function SideGnbBtn(props) {
    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "side-gnb-btn", onClick: () => props.activeSideGnb() }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "line1" }), (0, jsx_runtime_1.jsx)("div", { className: "line2" }), (0, jsx_runtime_1.jsx)("div", { className: "line3" })] })));
}
function SideGnb(props) {
    function logInOut(e) {
        if (props.logInOut === "로그아웃")
            props.logOut(e);
        else
            props.navigate("/login");
        props.closeGnb();
    }
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "side-gnb" }, { children: (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/new" }, { children: "\uC2E0\uC81C\uD488" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/best" }, { children: "\uBCA0\uC2A4\uD2B8" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/hair" }, { children: "\uD5E4\uC5B4\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/skin" }, { children: "\uC2A4\uD0A8\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/body" }, { children: "\uBC14\uB514\uCF00\uC5B4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "border-style-btn", style: { marginTop: "20px" }, onClick: e => logInOut(e) }, { children: props.logInOut })) })] }) })));
}
function RightGnb(props) {
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "header-gnb-right" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ style: { display: props.logOutDisplay } }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: e => props.logOut(e), style: { verticalAlign: "middle" } }, { children: "LOGOUT" })) })), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: props.logOutDisplay === "none" ? "/login" : "/mypage/myPageAuthentification" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/mypage.png"), alt: "\uB9C8\uC774\uD398\uC774\uC9C0" }) })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: props.logOutDisplay === "none" ? "/login" : "/mypage/cart" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/cart.png"), alt: "\uC7A5\uBC14\uAD6C\uB2C8" }) })) })] })) })));
}
function Header() {
    const [toggle, setToggle] = (0, react_1.useState)(false);
    const [logInOut, setLogInOut] = (0, react_1.useState)("로그인");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const pathname = (0, react_router_dom_1.useLocation)().pathname;
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user)
                setLogInOut("로그아웃");
        });
    }, []);
    function logOut(e) {
        e.preventDefault();
        (0, auth_1.signOut)(firebase_1.auth)
            .then(() => {
            setLogInOut("로그인");
            if (pathname.indexOf("mypage") !== -1)
                navigate("/", { replace: true });
        })
            .catch(error => {
            alert("로그아웃 과정 중에 오류가 발생했습니다.\n" + error.message);
        });
    }
    return ((0, jsx_runtime_1.jsxs)("header", Object.assign({ className: toggle ? "header side-active" : "header" }, { children: [(0, jsx_runtime_1.jsx)(LeftGnb, {}), (0, jsx_runtime_1.jsx)(SideGnbBtn, { activeSideGnb: () => setToggle(!toggle) }), (0, jsx_runtime_1.jsx)(SideGnb, { logInOut: logInOut, logOut: e => logOut(e), navigate: navigate, closeGnb: () => setToggle(false) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "logo" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/logo.png"), alt: "\uB85C\uACE0" }) })) })), (0, jsx_runtime_1.jsx)(RightGnb, { logOutDisplay: logInOut === "로그인" ? "none" : "block", logOut: e => logOut(e) })] })));
}
exports.default = Header;
