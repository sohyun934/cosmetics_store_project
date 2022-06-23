"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./Footer.css");
function Footer() {
    return ((0, jsx_runtime_1.jsx)("footer", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "footer-container small-txt" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "logo" }, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/common/logo.png"), alt: "\uB85C\uACE0" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "policy-nav" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/TermsOfUse" }, { children: "\uC774\uC6A9\uC57D\uAD00 | " })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/PrivacyPolicy" }, { children: "\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68" }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "company-info" }, { children: "Copyright \u00A9 THE NATURAL All rights reserved" }))] })) }));
}
exports.default = Footer;
