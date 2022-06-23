"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Join.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const PrivacyPolicy_1 = require("../../PrivacyPolicy/PrivacyPolicy");
const TermsOfUse_1 = require("../../TermsOfUse/TermsOfUse");
const StyledInput = styled_components_1.default.input `
    appearance: none;
    border: 1.5px solid #aaa;
    width: 0.9rem;
    height: 0.9rem;

    &:checked {
        border: transparent;
        background: #e5e5e5
            url("data:image/svg+xml,%3Csvg width='1.5rem' height='1.5rem' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
            no-repeat 50% / 100%;
    }
`;
function TermsPop(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "popup-container terms-pop" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uC774\uC6A9\uC57D\uAD00" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)(TermsOfUse_1.TermsOfUseDetail, {}), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.closePop() })] })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
function PrivacyPop(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "popup-container privacy-pop" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)(PrivacyPolicy_1.PrivacyPolicyDetail, {}), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.closePop() })] })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
function Agree() {
    const [allChk, setAllChk] = (0, react_1.useState)(false);
    const [termsChk, setTermsChk] = (0, react_1.useState)(false);
    const [privacyChk, setPrivacyChk] = (0, react_1.useState)(false);
    const [termsPop, setTermsPop] = (0, react_1.useState)(null);
    const [privacyPop, setPrivacyPop] = (0, react_1.useState)(null);
    const termsPopContent = (0, jsx_runtime_1.jsx)(TermsPop, { closePop: () => setTermsPop(null) });
    const privacyPopContent = (0, jsx_runtime_1.jsx)(PrivacyPop, { closePop: () => setPrivacyPop(null) });
    const allChkEvent = () => {
        setAllChk(!allChk);
        setTermsChk(!allChk);
        setPrivacyChk(!allChk);
    };
    (0, react_1.useEffect)(() => {
        if (termsChk && privacyChk) {
            setAllChk(true);
        }
        else {
            setAllChk(false);
        }
    }, [termsChk, privacyChk]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "agree-container small-txt" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(StyledInput, { id: "agreeAllChk", type: "checkbox", checked: allChk, onChange: allChkEvent }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "agreeAllChk" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC804\uCCB4\uC57D\uAD00 \uD56D\uBAA9\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4." }) }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(StyledInput, { id: "agreeServiceChk", type: "checkbox", checked: termsChk, onChange: () => setTermsChk(!termsChk) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "agreeServiceChk" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC774\uC6A9\uC57D\uAD00 \uB3D9\uC758 (\uD544\uC218)" }) })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", className: "terms-pop-link", onClick: event => {
                            event.preventDefault();
                            setTermsPop(termsPopContent);
                        } }, { children: "\uBCF4\uAE30" }))] }), termsPop, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(StyledInput, { id: "agreePrivacyChk", type: "checkbox", checked: privacyChk, onChange: () => setPrivacyChk(!privacyChk) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "agreePrivacyChk" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1 \uBC0F \uC774\uC6A9 \uB3D9\uC758 (\uD544\uC218)" }) })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", className: "privacy-pop-link", onClick: event => {
                            event.preventDefault();
                            setPrivacyPop(privacyPopContent);
                        } }, { children: "\uBCF4\uAE30" }))] }), privacyPop] })));
}
function Form() {
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "join-form", method: "post", action: "#" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uC774\uBA54\uC77C" }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638" }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uC774\uB984" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uD578\uB4DC\uD3F0\uBC88\uD638" }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "small-txt radius-style-btn" }, { children: "\uC778\uC99D\uBC88\uD638 \uC694\uCCAD" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\uC778\uC99D\uBC88\uD638 6\uC790\uB9AC \uC785\uB825" })] })), (0, jsx_runtime_1.jsx)(Agree, {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "join-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "join-btn" }, { children: "\uAC00\uC785\uD558\uAE30" })) }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "join-container middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "join-title" }, { children: "SIGN UP" })), (0, jsx_runtime_1.jsx)(Form, {})] })) }));
}
function Join() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Join;
