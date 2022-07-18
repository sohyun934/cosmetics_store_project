"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./ReviewPop.css");
const react_1 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledButton = styled_components_1.default.button `
    background: black;
    color: white;
    font-weight: normal;
    border: none;
`;
function ReviewPop(props) {
    const [mode, setMode] = (0, react_1.useState)("write");
    const [docId, setDocId] = (0, react_1.useState)("");
    const [reviewId, setReviewId] = (0, react_1.useState)(0);
    const [rate, setRate] = (0, react_1.useState)(0);
    const [content, setContent] = (0, react_1.useState)("");
    const [letters, setLetters] = (0, react_1.useState)(0);
    const [disabled, setDisabled] = (0, react_1.useState)(true);
    const lis = [];
    function rateStar(e) {
        const target = e.target.parentNode;
        target.classList.add("on");
        const nextTarget = target.previousSibling;
        if (nextTarget)
            nextTarget.classList.remove("on");
    }
    for (let i = 0; i < 5; i++) {
        lis.push((0, jsx_runtime_1.jsx)("li", Object.assign({ value: 5 - i, className: mode === "update" && 5 - i === rate ? "on" : "", onClick: () => setRate(5 - i) }, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: rateStar }) }), i));
    }
    function countLetters(letters) {
        setLetters(letters);
        if (letters >= 20)
            setDisabled(false);
        else
            setDisabled(true);
    }
    function fetchReview() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewsSnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, "reviews"));
            const reviewQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("email", "==", firebase_1.signedInUser), (0, firestore_1.where)("product_name", "==", props.productName));
            const reviewSnapshot = yield (0, firestore_1.getDocs)(reviewQuery);
            if (reviewSnapshot.empty) {
                setReviewId(reviewsSnapshot.size + 1);
            }
            else {
                setMode("update");
                reviewSnapshot.forEach(doc => {
                    const review = doc.data();
                    setDocId(doc.id);
                    setRate(review.rate);
                    setContent(review.content);
                    setLetters(review.content.length);
                    setDisabled(false);
                });
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchReview();
    }, []);
    function writeReview() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const year = today.getFullYear();
            const month = ("0" + (today.getMonth() + 1)).slice(-2);
            const day = ("0" + today.getDate()).slice(-2);
            const date = year + "-" + month + "-" + day;
            if (mode === "write") {
                const usersQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", firebase_1.signedInUser));
                const userSnapshot = yield (0, firestore_1.getDocs)(usersQuery);
                userSnapshot.forEach((doc) => __awaiter(this, void 0, void 0, function* () {
                    const user = doc.data();
                    yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "reviews"), {
                        review_id: reviewId,
                        product_name: props.productName,
                        rate: rate,
                        user_name: user.name,
                        email: user.email,
                        content: content,
                        date: date
                    }).then(() => {
                        alert("리뷰 등록이 완료되었습니다.");
                        props.close(reviewId);
                    });
                }));
            }
            else if (mode === "update") {
                const reviewRef = (0, firestore_1.doc)(firebase_1.db, "reviews", docId);
                yield (0, firestore_1.updateDoc)(reviewRef, {
                    rate: rate,
                    content: content
                }).then(() => {
                    alert("리뷰 수정이 완료되었습니다.");
                    props.close();
                });
            }
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "popup-container review-pop" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ method: "post" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "REVIEW" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "small-txt" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: props.productName }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "total-point" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "flex" }, { children: lis })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-container small-txt" }, { children: [(0, jsx_runtime_1.jsx)("textarea", { cols: 3, rows: 1, maxLength: 50, value: content, onChange: e => {
                                        countLetters(e.target.value.length);
                                        setContent(e.target.value);
                                    }, placeholder: "\uCD5C\uC18C 20\uC790 \uC774\uC0C1 \uC785\uB825" }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { children: letters }), "\uC790 / 50\uC790"] })] })), (0, jsx_runtime_1.jsx)("input", { type: "file" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "pop-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "cancel-btn radius-style-btn", onClick: () => props.close() }, { children: "\uCDE8\uC18C" })), (0, jsx_runtime_1.jsx)(StyledButton, Object.assign({ type: "button", className: "write-btn radius-style-btn", onClick: writeReview, disabled: disabled }, { children: "\uB4F1\uB85D" }))] })), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.close() })] })) })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
exports.default = ReviewPop;
