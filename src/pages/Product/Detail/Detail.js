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
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const MoveTop_1 = __importDefault(require("../../../components/MoveTop/MoveTop"));
const ReviewPop_1 = __importDefault(require("../../../components/ReviewPop/ReviewPop"));
const CartPop_1 = __importDefault(require("../../Mypage/Cart/CartPop/CartPop"));
const react_1 = require("react");
const react_2 = require("swiper/react");
const swiper_1 = require("swiper");
require("swiper/css");
require("swiper/css/pagination");
const WishPop_1 = __importDefault(require("../../../components/WishPop/WishPop"));
const react_router_dom_1 = require("react-router-dom");
const getImage_1 = require("../../../utils/getImage");
const firebase_1 = require("../../../firebase");
const firestore_1 = require("firebase/firestore");
function ProductSection(props) {
    const productName = props.name;
    const price = Number(props.price);
    const strPrice = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const [totPrice, setTotPrice] = (0, react_1.useState)(strPrice);
    const [amount, setAmount] = (0, react_1.useState)(1);
    const navigate = (0, react_router_dom_1.useNavigate)();
    // 수량 변경
    const handleMinus = () => {
        setAmount(amount === 1 ? 1 : amount - 1);
    };
    const handleAmt = (e) => {
        const amount = Number(e.target.value);
        if (amount > 3) {
            alert("최대 주문수량은 3개 입니다.");
            setAmount(3);
        }
        else if (amount < 1) {
            alert("최소 주문수량은 1개 입니다.");
            setAmount(1);
        }
        else if (isNaN(amount)) {
            alert("숫자만 입력 가능합니다.");
            setAmount(1);
        }
        else {
            setAmount(Number(e.target.value));
        }
    };
    const handlePlus = () => {
        setAmount(amount === 3 ? 3 : amount + 1);
        if (amount === 3)
            alert("최대 주문수량은 3개 입니다.");
    };
    // 수량 변경에 따른 총액 변경
    (0, react_1.useEffect)(() => {
        setTotPrice(String(price * amount).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    }, [price, amount]);
    // 장바구니 담기
    const handleAddCart = () => __awaiter(this, void 0, void 0, function* () {
        if (!firebase_1.signedInUser) {
            navigate("/login");
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
        const orderPrice = price * amount;
        let fee = 0;
        if (orderPrice > 0 && orderPrice < 30000) {
            fee = 3000;
        }
        navigate("/order", {
            state: {
                fromCart: false,
                orderList: [productName],
                amount: amount,
                orderPrice: String(orderPrice).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                fee: String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                totPrice: String(orderPrice + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }
        });
    });
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section flex" }, { children: [(0, jsx_runtime_1.jsxs)(react_2.Swiper, Object.assign({ className: "thumb", modules: [swiper_1.Pagination, swiper_1.A11y, swiper_1.Autoplay], spaceBetween: 0, slidesPerView: 1, pagination: { clickable: true }, loop: true, autoplay: { delay: 3000 } }, { children: [(0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[0], alt: `${productName}01` }) }), (0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[1], alt: `${productName}02` }) }), (0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[2], alt: `${productName}03` }) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "info" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ method: "post" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)("strong", { children: productName }) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price-wish-container flex" }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price big-txt" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [strPrice, "\uC6D0"] }) })) })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cnt-container flex" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "cnt-box" }, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "minus", onClick: handleMinus }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "cnt", value: amount, onChange: handleAmt }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "plus", onClick: handlePlus })] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price big-txt" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [totPrice, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", { children: "30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "util-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cart-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "cart-btn gray-style-btn", onClick: handleAddCart }, { children: "\uC7A5\uBC14\uAD6C\uB2C8" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "order-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "order-btn", onClick: handleOrder }, { children: "\uAD6C\uB9E4\uD558\uAE30" })) }))] }))] })) }))] })));
}
function Nav(props) {
    const productName = props.productName;
    const [detailClass, setDetailClass] = (0, react_1.useState)(" on");
    const [reviewClass, setReviewClass] = (0, react_1.useState)("");
    const [reviewCnt, setReviewCnt] = (0, react_1.useState)(0);
    function onDetail() {
        props.onChangeTap("detail");
        setDetailClass(" on");
        setReviewClass("");
    }
    function onReview() {
        props.onChangeTap("review");
        setDetailClass("");
        setReviewClass(" on");
    }
    function fetchReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("product_name", "==", productName), (0, firestore_1.orderBy)("review_id", "desc"));
            const reviewSnapshot = yield (0, firestore_1.getDocs)(reviewQuery);
            setReviewCnt(reviewSnapshot.size);
        });
    }
    (0, react_1.useEffect)(() => {
        fetchReviews();
    });
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "menu-lnb" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "border-style-btn" + detailClass, onClick: onDetail }, { children: "\uC0C1\uC138\uC815\uBCF4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "border-style-btn" + reviewClass, onClick: onReview }, { children: ["\uAD6C\uB9E4\uD6C4\uAE30 (", reviewCnt, ")"] })) })] })) })));
}
function ReviewSection(props) {
    const productName = props.productName;
    const [reviews, setReviews] = (0, react_1.useState)([]);
    const [totRating, setTotRating] = (0, react_1.useState)("0.0");
    const [totWidth, setTotWidth] = (0, react_1.useState)("");
    function fetchReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "reviews"), (0, firestore_1.where)("product_name", "==", productName), (0, firestore_1.orderBy)("review_id", "desc"));
            const reviewSnapshot = yield (0, firestore_1.getDocs)(reviewQuery);
            let totRating = 0;
            const reviews = [];
            if (!reviewSnapshot.empty) {
                reviewSnapshot.forEach(doc => {
                    const review = doc.data();
                    const rating = review.rate;
                    totRating += rating;
                    const width = String(rating * 20) + "%";
                    const userName = review.user_name;
                    const maskingName = userName.slice(0, -1) + "*";
                    reviews.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "review-container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "review-point" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "point", style: { width: width } }) })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "user-name" }, { children: `${maskingName}님` })), (0, jsx_runtime_1.jsx)("span", { children: review.date })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "content" }, { children: (0, jsx_runtime_1.jsx)("p", { children: review.content }) }))] }), doc.id));
                });
                const fixedRating = (totRating / reviewSnapshot.size).toFixed(1);
                const totWidth = String(Number(fixedRating) * 20) + "%";
                setTotRating(fixedRating);
                setTotWidth(totWidth);
                setReviews(reviews);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchReviews();
    }, []);
    // function resize(e: React.MouseEvent<HTMLElement>) {
    //     let a = (e.target as HTMLElement).parentNode;
    //     (a as HTMLAnchorElement).removeAttribute("href");
    //     let thumb: ParentNode | null = null;
    //     if (a !== null) {
    //         thumb = a.parentNode;
    //         if (thumb !== null) (thumb as HTMLElement).classList.add("resize");
    //     }
    // }
    return ((0, jsx_runtime_1.jsx)("section", Object.assign({ className: "review-section" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-top" }, { children: (0, jsx_runtime_1.jsx)("h1", { children: "REVIEW" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-point" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ style: { margin: "0" } }, { children: "\uAD6C\uB9E4\uC790 \uD3C9\uC810" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "rating" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: totRating }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "review-point" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "point", style: { width: totWidth } }) }))] })), reviews.length > 0 ? (reviews) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "review-container" }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { textAlign: "center" } }, { children: "\uC791\uC131\uB41C \uB9AC\uBDF0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) })))] })) })));
}
function Main() {
    let content;
    const [tap, setTap] = (0, react_1.useState)("detail");
    const [pop, setPop] = (0, react_1.useState)("");
    const [popContent, setPopContent] = (0, react_1.useState)(null);
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const name = state.name;
    const price = state.price;
    const [urls, setUrls] = (0, react_1.useState)([]);
    if (tap === "detail") {
        content = ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "detail-wrap" }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[3], alt: "\uC0C1\uC138\uC815\uBCF4" }) })));
    }
    else if (tap === "review") {
        content = (0, jsx_runtime_1.jsx)(ReviewSection, { productName: name });
    }
    function closePop() {
        setPop("");
        setPopContent(null);
    }
    (0, react_1.useEffect)(() => {
        if (pop === "wish") {
            setPopContent((0, jsx_runtime_1.jsx)(WishPop_1.default, { close: closePop }));
        }
        else if (pop === "cart") {
            setPopContent((0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC0C1\uD488\uC774 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACBC\uC2B5\uB2C8\uB2E4." }));
        }
        else if (pop === "overlap") {
            setPopContent((0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC774\uBBF8 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACA8\uC788\uB294 \uC0C1\uD488\uC785\uB2C8\uB2E4." }));
        }
        else if (pop === "review") {
            setPopContent((0, jsx_runtime_1.jsx)(ReviewPop_1.default, { close: closePop, productName: name }));
        }
    }, [pop]);
    (0, react_1.useEffect)(() => {
        function getImageUrls() {
            return __awaiter(this, void 0, void 0, function* () {
                const imgs = [state.thumb01, state.thumb02, state.thumb03, state.detail];
                const promises = imgs.map(thumb => (0, getImage_1.getImage)(thumb));
                const urls = yield Promise.all(promises);
                setUrls(urls);
            });
        }
        getImageUrls();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-container big-container" }, { children: [(0, jsx_runtime_1.jsx)(ProductSection, { name: name, price: price, urls: urls, open: (_pop) => setPop(_pop) }), (0, jsx_runtime_1.jsx)(Nav, { onChangeTap: (_tap) => setTap(_tap), productName: name }), content] })), popContent, (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
function Detail() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Detail;
