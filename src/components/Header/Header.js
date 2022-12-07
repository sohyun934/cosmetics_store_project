"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Header.css");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../firebase");
const LeftNavBar = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const pathname = props.pathname;
    const navList = props.navList;
    const navItems = navList.map(navItem => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: navItem.link_to, className: pathname === navItem.link_to ? "active" : "", onClick: () => closeGnb() }, { children: navItem.title })) }, navItem.title)));
    const isLogined = props.isLogined;
    const logOut = props.logOut;
    const closeGnb = props.closeGnb;
    const toggleSideGnb = props.toggleSideGnb;
    const handleLog = (e) => {
        if (isLogined) {
            logOut(e);
        }
        else {
            navigate("/login", { state: { moveTo: -1 } });
        }
        closeGnb();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "header-gnb-left" }, { children: (0, jsx_runtime_1.jsx)("ul", { children: navItems }) })), (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "side-gnb-btn", "aria-label": "navigation menu", onClick: () => toggleSideGnb() }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "line1" }), (0, jsx_runtime_1.jsx)("div", { className: "line2" }), (0, jsx_runtime_1.jsx)("div", { className: "line3" })] })), (0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "side-gnb" }, { children: (0, jsx_runtime_1.jsxs)("ul", { children: [navItems, (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "border-style-btn", style: { marginTop: "20px" }, onClick: handleLog }, { children: isLogined ? "로그아웃" : "로그인" })) })] }) }))] }));
};
const RightNavBar = (props) => {
    const logOut = props.logOut;
    const isLogined = props.isLogined;
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "header-gnb-right" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex" }, { children: [isLogined && ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: e => logOut(e), style: { verticalAlign: "middle" } }, { children: "LOGOUT" })) })), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: isLogined ? "/mypage/myPageAuthentification" : "/login", state: { moveTo: "/" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/mypage.png"), alt: "\uB9C8\uC774\uD398\uC774\uC9C0" }) })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: isLogined ? "/mypage/cart" : "/login", state: { moveTo: "/mypage/cart" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/cart.png"), alt: "\uC7A5\uBC14\uAD6C\uB2C8" }) })) })] })) })));
};
const Header = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const pathname = (0, react_router_dom_1.useLocation)().pathname;
    const navList = [
        { link_to: "/hair", title: "헤어케어" },
        { link_to: "/skin", title: "스킨케어" },
        { link_to: "/body", title: "바디케어" }
    ];
    const [toggle, setToggle] = (0, react_1.useState)(false);
    const [isLogined, setIsLogined] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (toggle) {
            setToggle(false);
        }
    }, [pathname]);
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user) {
                setIsLogined(true);
            }
            else {
                // 로그아웃, 세션 종료 시
                setIsLogined(false);
            }
        });
    }, []);
    const logOut = (e) => {
        e.preventDefault();
        (0, auth_1.signOut)(firebase_1.auth)
            .then(() => {
            // 마이페이지, 주문 페이지에서 로그아웃 시 메인 페이지로 이동
            if (pathname.indexOf("mypage") !== -1 || pathname.indexOf("order") !== -1)
                navigate("/", { replace: true });
        })
            .catch(error => {
            alert("로그아웃 과정 중에 오류가 발생했습니다.\n" + error.message);
        });
    };
    return ((0, jsx_runtime_1.jsxs)("header", Object.assign({ className: toggle ? "header side-active" : "header" }, { children: [(0, jsx_runtime_1.jsx)(LeftNavBar, { navList: navList, pathname: pathname, isLogined: isLogined, logOut: logOut, closeGnb: () => setToggle(false), toggleSideGnb: () => setToggle(!toggle) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "logo" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/logo.png"), alt: "\uB85C\uACE0" }) })) })), (0, jsx_runtime_1.jsx)(RightNavBar, { isLogined: isLogined, logOut: logOut })] })));
};
exports.default = Header;
