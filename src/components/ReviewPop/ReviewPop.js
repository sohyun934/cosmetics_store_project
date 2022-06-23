"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./ReviewPop.css");
const react_1 = require("react");
function ReviewPop(props) {
    let prevTarget = null;
    const lis = [];
    const [txtCnt, setTxtCnt] = (0, react_1.useState)(0);
    function rateStar(e) {
        if (prevTarget !== null)
            prevTarget.classList.remove("on");
        const nextTarget = e.target.parentNode;
        nextTarget.classList.add("on");
        prevTarget = nextTarget;
    }
    for (let i = 0; i < 5; i++) {
        lis.push((0, jsx_runtime_1.jsx)("li", Object.assign({ value: 5 - i }, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: rateStar }) }), i));
    }
    function countTxt(e) {
        const txtCnt = e.target.value.length;
        setTxtCnt(txtCnt);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "popup-container review-pop" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ method: "post" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "REVIEW" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uD2F0\uD2B8\uB9AC \uC2A4\uCE7C\uD504 \uC2A4\uCF00\uC77C\uB9C1 \uC0F4\uD478 \uBC14 135G" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "total-point" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "flex" }, { children: lis })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-container small-txt" }, { children: [(0, jsx_runtime_1.jsx)("textarea", { cols: 3, rows: 1, maxLength: 200, onChange: countTxt, placeholder: "\uCD5C\uC18C 20\uC790 \uC774\uC0C1 \uC785\uB825" }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { children: txtCnt }), "\uC790 / 200\uC790"] })] })), (0, jsx_runtime_1.jsx)("input", { type: "file" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "pop-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "cancel-btn radius-style-btn", onClick: () => props.close() }, { children: "\uCDE8\uC18C" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "write-btn radius-style-btn" }, { children: "\uB4F1\uB85D" }))] })), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.close() })] })) })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
exports.default = ReviewPop;
