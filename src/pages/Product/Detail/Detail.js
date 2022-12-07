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
require("./Detail.css");
const MoveTop_1 = __importDefault(require("../../../components/MoveTop/MoveTop"));
const CartPop_1 = __importDefault(require("../../Mypage/Cart/CartPop/CartPop"));
const react_1 = require("react");
const react_2 = require("swiper/react");
const swiper_1 = require("swiper");
require("swiper/css");
require("swiper/css/pagination");
const react_router_dom_1 = require("react-router-dom");
const getImage_1 = require("../../../utils/getImage");
const firebase_1 = require("../../../firebase");
const firestore_1 = require("firebase/firestore");
const getFormatPrice_1 = require("../../../utils/getFormatPrice");
const react_js_pagination_1 = __importDefault(require("react-js-pagination"));
function ProductSection(props) {
    const productName = props.name;
    const price = Number(props.price);
    const strPrice = (0, getFormatPrice_1.getFormatPrice)(props.price);
    const [totPrice, setTotPrice] = (0, react_1.useState)(strPrice);
    const [amount, setAmount] = (0, react_1.useState)(1);
    const navigate = (0, react_router_dom_1.useNavigate)();
    // 수량 변경
    const handleMinus = () => {
        setAmount(amount === 1 ? 1 : amount - 1);
    };
    const handlePlus = () => {
        setAmount(amount === 3 ? 3 : amount + 1);
        if (amount === 3) {
            alert("최대 주문수량은 3개 입니다.");
        }
    };
    // 수량 변경에 따른 총액 변경
    (0, react_1.useEffect)(() => {
        setTotPrice((0, getFormatPrice_1.getFormatPrice)(String(price * amount)));
    }, [price, amount]);
    // 장바구니 담기
    const handleAddCart = () => __awaiter(this, void 0, void 0, function* () {
        if (!firebase_1.signedInUser) {
            navigate("/login", { state: { moveTo: -1 } });
        }
        else {
            const cartList = yield (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", firebase_1.signedInUser)));
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", firebase_1.signedInUser), (0, firestore_1.where)("product_name", "==", productName));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "cart"), {
                    cart_id: cartList.size + 1,
                    product_name: productName,
                    user_email: firebase_1.signedInUser,
                    amount: amount
                });
                props.open("cart");
            }
            else {
                props.open("overlap");
            }
        }
    });
    // 주문하기
    const handleOrder = () => __awaiter(this, void 0, void 0, function* () {
        if (!firebase_1.signedInUser) {
            navigate("/login", { state: { moveTo: -1 } });
        }
        else {
            let fee = 0;
            const orderPrice = price * amount;
            if (orderPrice > 0 && orderPrice < 30000) {
                fee = 3000;
            }
            navigate("/order", {
                state: {
                    fromCart: false,
                    orderList: [productName],
                    amount: amount,
                    orderPrice: (0, getFormatPrice_1.getFormatPrice)(String(orderPrice)),
                    fee: (0, getFormatPrice_1.getFormatPrice)(String(fee)),
                    totPrice: (0, getFormatPrice_1.getFormatPrice)(String(orderPrice + fee))
                }
            });
        }
    });
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section flex" }, { children: [(0, jsx_runtime_1.jsxs)(react_2.Swiper, Object.assign({ className: "thumb", modules: [swiper_1.Pagination, swiper_1.A11y, swiper_1.Autoplay], spaceBetween: 0, slidesPerView: 1, pagination: { clickable: true }, loop: true, autoplay: { delay: 3000 } }, { children: [(0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[0], alt: `${productName}01` }) }), (0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[1], alt: `${productName}02` }) }), (0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[2], alt: `${productName}03` }) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "info" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ method: "post" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)("strong", { children: productName }) }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "price-container" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price big-txt" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: strPrice }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "big-txt" }, { children: "\uC6D0" }))] })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cnt-container flex" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "cnt-box" }, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "minus", "aria-label": "minus button for quantity", onClick: handleMinus }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "cnt", value: amount, disabled: true }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "plus", "aria-label": "plus button for quantity", onClick: handlePlus })] })), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price big-txt" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: totPrice }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "big-txt" }, { children: "\uC6D0" }))] })] })), (0, jsx_runtime_1.jsx)("p", { children: "30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "util-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cart-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "cart-btn gray-style-btn", onClick: handleAddCart }, { children: "\uC7A5\uBC14\uAD6C\uB2C8" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "order-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "order-btn", onClick: handleOrder }, { children: "\uAD6C\uB9E4\uD558\uAE30" })) }))] }))] })) }))] })));
}
function Nav(props) {
    const productName = props.productName;
    const [detailClass, setDetailClass] = (0, react_1.useState)(" on");
    const [reviewClass, setReviewClass] = (0, react_1.useState)("");
    const [reviewCnt, setReviewCnt] = (0, react_1.useState)(0);
    const handleContent = (tap) => {
        if (tap === "detail") {
            props.onChangeTap("detail");
            setDetailClass(" on");
            setReviewClass("");
        }
        else {
            props.onChangeTap("review");
            setDetailClass("");
            setReviewClass(" on");
        }
    };
    const fetchReviews = () => __awaiter(this, void 0, void 0, function* () {
        const reviewQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("product_name", "==", productName), (0, firestore_1.orderBy)("review_id", "desc"));
        const reviewSnapshot = yield (0, firestore_1.getDocs)(reviewQuery);
        setReviewCnt(reviewSnapshot.size);
    });
    (0, react_1.useEffect)(() => {
        fetchReviews();
    });
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "menu-lnb" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "border-style-btn" + detailClass, onClick: () => handleContent("detail") }, { children: "\uC0C1\uC138\uC815\uBCF4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "border-style-btn" + reviewClass, onClick: () => handleContent("review") }, { children: ["\uAD6C\uB9E4\uD6C4\uAE30 (", reviewCnt, ")"] })) })] })) })));
}
function ReviewSection(props) {
    const productName = props.productName;
    const [page, setPage] = (0, react_1.useState)(1);
    const [totItemsCnt, setTotItemsCnt] = (0, react_1.useState)(0);
    const [reviews, setReviews] = (0, react_1.useState)([]);
    const [totRating, setTotRating] = (0, react_1.useState)("0.0");
    const [totWidth, setTotWidth] = (0, react_1.useState)("");
    // 페이지네이션
    const handlePageChange = (page) => {
        setPage(page);
    };
    const fetchReviews = () => __awaiter(this, void 0, void 0, function* () {
        let reviewSnapshot;
        let totRating = 0;
        const reviews = [];
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("product_name", "==", productName), (0, firestore_1.orderBy)("review_id", "desc"));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        setTotItemsCnt(querySnapshot.size);
        // 구매자 평점
        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                const review = doc.data();
                const rating = review.rate;
                totRating += rating;
            });
            const fixedRating = (totRating / querySnapshot.size).toFixed(1);
            const totWidth = String(Number(fixedRating) * 20) + "%";
            setTotRating(fixedRating);
            setTotWidth(totWidth);
        }
        // 페이지네이션
        if (page === 1) {
            const first = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("product_name", "==", productName), (0, firestore_1.orderBy)("review_id", "desc"), (0, firestore_1.limit)(5));
            reviewSnapshot = yield (0, firestore_1.getDocs)(first);
        }
        else {
            let lastVisible = querySnapshot.docs[(page - 1) * 5 - 1];
            const next = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("product_name", "==", productName), (0, firestore_1.orderBy)("review_id", "desc"), (0, firestore_1.startAfter)(lastVisible), (0, firestore_1.limit)(5));
            reviewSnapshot = yield (0, firestore_1.getDocs)(next);
        }
        if (!reviewSnapshot.empty) {
            reviewSnapshot.forEach(doc => {
                const review = doc.data();
                const rating = review.rate;
                const width = String(rating * 20) + "%";
                const userName = review.user_name;
                const maskingName = userName.slice(0, -1) + "*";
                reviews.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "review-container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "review-point" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "point", style: { width: width } }) })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "user-name" }, { children: `${maskingName}님` })), (0, jsx_runtime_1.jsx)("span", { children: review.date })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "content" }, { children: (0, jsx_runtime_1.jsx)("p", { children: review.content }) }))] }), doc.id));
            });
            setReviews(reviews);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchReviews();
    }, [page]);
    return ((0, jsx_runtime_1.jsx)("section", Object.assign({ className: "review-section" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-top" }, { children: (0, jsx_runtime_1.jsx)("h1", { children: "REVIEW" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-point" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ style: { margin: "0" } }, { children: "\uAD6C\uB9E4\uC790 \uD3C9\uC810" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "rating" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: totRating }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "review-point" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "point", style: { width: totWidth } }) }))] })), reviews.length > 0 ? (reviews) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "review-container" }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { textAlign: "center" } }, { children: "\uC791\uC131\uB41C \uB9AC\uBDF0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) }))), reviews.length > 0 && ((0, jsx_runtime_1.jsx)(react_js_pagination_1.default, { activePage: page, itemsCountPerPage: 5, totalItemsCount: totItemsCnt, pageRangeDisplayed: 5, prevPageText: "\u2039", nextPageText: "\u203A", onChange: handlePageChange }))] })) })));
}
function Detail() {
    const [tap, setTap] = (0, react_1.useState)("detail");
    const [pop, setPop] = (0, react_1.useState)({ state: "", content: null });
    const [urls, setUrls] = (0, react_1.useState)([]);
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const name = state.name;
    const price = state.price;
    function closePop() {
        setPop({ state: "", content: null });
    }
    (0, react_1.useEffect)(() => {
        if (pop.state === "cart") {
            setPop(pop => (Object.assign(Object.assign({}, pop), { content: (0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC0C1\uD488\uC774 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACBC\uC2B5\uB2C8\uB2E4." }) })));
        }
        else if (pop.state === "overlap") {
            setPop(pop => (Object.assign(Object.assign({}, pop), { content: (0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC774\uBBF8 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACA8\uC788\uB294 \uC0C1\uD488\uC785\uB2C8\uB2E4." }) })));
        }
    }, [pop.state]);
    (0, react_1.useEffect)(() => {
        const getImageUrls = () => __awaiter(this, void 0, void 0, function* () {
            const imgs = [state.thumb01, state.thumb02, state.thumb03, state.detail];
            const promises = imgs.map(thumb => (0, getImage_1.getImage)(thumb));
            const urls = yield Promise.all(promises);
            setUrls(urls);
        });
        getImageUrls();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-container big-container" }, { children: [(0, jsx_runtime_1.jsx)(ProductSection, { name: name, price: price, urls: urls, open: (_pop) => setPop(pop => (Object.assign(Object.assign({}, pop), { state: _pop }))) }), (0, jsx_runtime_1.jsx)(Nav, { onChangeTap: (_tap) => setTap(_tap), productName: name }), tap === "detail" ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "detail-wrap" }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[3], alt: "\uC0C1\uC138\uC815\uBCF4" }) }))) : ((0, jsx_runtime_1.jsx)(ReviewSection, { productName: name }))] })), pop.content, (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
exports.default = Detail;
