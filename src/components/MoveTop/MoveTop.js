"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./MoveTop.css");
function MoveTop() {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "move-top" }, { children: (0, jsx_runtime_1.jsx)("button", { "aria-label": "scroll to top button", onClick: () => window.scrollTo(0, 0) }) })));
}
exports.default = MoveTop;
