"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./MoveTop.css");
const MoveTop = react_1.default.memo(() => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "move-top" }, { children: (0, jsx_runtime_1.jsx)("button", { "aria-label": "scroll to top button", onClick: () => window.scrollTo(0, 0) }) })));
});
exports.default = MoveTop;
