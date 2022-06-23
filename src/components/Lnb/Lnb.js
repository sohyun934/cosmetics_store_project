"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Lnb.css");
const react_router_dom_1 = require("react-router-dom");
function Lnb(props) {
    const lnb = [
        { path: "modify", title: "회원정보" },
        { path: "orderList", title: "주문내역" },
        { path: "wishList", title: "위시리스트" },
        { path: "cart", title: "장바구니" }
    ];
    const lis = [];
    for (let i = 0; i < lnb.length; i++) {
        const nav = lnb[i];
        let className = nav.path;
        if (className === props.title)
            className += " on";
        lis.push((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/mypage/" + nav.path, className: className }, { children: nav.title })) }, i));
    }
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "mypage-lnb" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "flex" }, { children: lis })) })));
}
exports.default = Lnb;
