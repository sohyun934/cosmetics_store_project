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
    const price = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const [wishToggle, setWishToggle] = (0, react_1.useState)(false);
    const [totPrice, setTotPrice] = (0, react_1.useState)(props.price);
    const [amount, setAmount] = (0, react_1.useState)(1);
    const navigate = (0, react_router_dom_1.useNavigate)();
    function openWishPop() {
        if (wishToggle === false)
            props.open("wish");
        setWishToggle(!wishToggle);
    }
    function minus() {
        setAmount(amount === 1 ? 1 : amount - 1);
    }
    function changeAmt(e) {
        const amount = Number(e.target.value);
        if (amount >= 3) {
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
    }
    function plus() {
        setAmount(amount === 3 ? 3 : amount + 1);
        if (amount === 3)
            alert("최대 주문수량은 3개 입니다.");
    }
    (0, react_1.useEffect)(() => {
        setTotPrice(String(Number(props.price) * amount).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    }, [props.price, amount]);
    function addCart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!firebase_1.signedInUser) {
                navigate("/login");
            }
            else {
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", firebase_1.signedInUser), (0, firestore_1.where)("product_name", "==", props.name));
                const querySnapshot = yield (0, firestore_1.getDocs)(q);
                if (querySnapshot.empty) {
                    yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "cart"), {
                        product_name: props.name,
                        user_email: firebase_1.signedInUser,
                        amount: amount
                    });
                    props.open("cart");
                }
                else {
                    props.open("duplicate");
                }
            }
        });
    }
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section flex" }, { children: [(0, jsx_runtime_1.jsxs)(react_2.Swiper, Object.assign({ className: "thumb", modules: [swiper_1.Pagination, swiper_1.A11y, swiper_1.Autoplay], spaceBetween: 0, slidesPerView: 1, pagination: { clickable: true }, loop: true, autoplay: { delay: 3000 } }, { children: [(0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[0], alt: `${props.name}01` }) }), (0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[1], alt: `${props.name}02` }) }), (0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: props.urls[2], alt: `${props.name}03` }) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "info" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ method: "post" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsx)("strong", { children: props.name }) }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "price-wish-container flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price big-txt" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [price, "\uC6D0"] }) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "wish-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: wishToggle ? "wish-btn on" : "wish-btn", onClick: openWishPop }) }))] })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cnt-container flex" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "cnt-box" }, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "minus", onClick: minus }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "cnt", value: amount, onChange: changeAmt }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "plus", onClick: plus })] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "price big-txt" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [totPrice, "\uC6D0"] }) }))] })), (0, jsx_runtime_1.jsx)("p", { children: "30,000\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC \uBC30\uC1A1" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "util-btn-container flex" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cart-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "cart-btn gray-style-btn", type: "button", onClick: addCart }, { children: "\uC7A5\uBC14\uAD6C\uB2C8" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "order-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "order-btn" }, { children: "\uAD6C\uB9E4\uD558\uAE30" })) }))] }))] })) }))] })));
}
function Nav(props) {
    const [detailClass, setDetailClass] = (0, react_1.useState)(" on");
    const [reviewClass, setReviewClass] = (0, react_1.useState)("");
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
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "menu-lnb" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "border-style-btn" + detailClass, onClick: onDetail }, { children: "\uC0C1\uC138\uC815\uBCF4" })) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "border-style-btn" + reviewClass, onClick: onReview }, { children: "\uAD6C\uB9E4\uD6C4\uAE30 (3)" })) })] })) })));
}
function ReviewSection(props) {
    const reviews = [];
    for (let i = 0; i < 3; i++) {
        reviews.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "review-container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "review-point" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "point", style: { width: "60%" } }) })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "user-id" }, { children: "sohy****" })), (0, jsx_runtime_1.jsx)("span", { children: "2022.05.16" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uC138\uC548 \uD6C4 \uCD09\uCD09\uD574\uC11C \uC790\uC8FC \uC4F0\uB294 \uC544\uC774\uD15C\uC785\uB2C8\uB2E4." }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: "/", onClick: event => {
                                    event.preventDefault();
                                    resize(event);
                                } }, { children: [(0, jsx_runtime_1.jsx)("img", { src: require("../../../assets/product/detail/review.jpg"), alt: "\uB9AC\uBDF0 \uC774\uBBF8\uC9C0" }), (0, jsx_runtime_1.jsx)("button", { className: "image-more" })] })) }))] }))] }), i));
    }
    function resize(e) {
        let a = e.target.parentNode;
        a.removeAttribute("href");
        let thumb = null;
        if (a !== null) {
            thumb = a.parentNode;
            if (thumb !== null)
                thumb.classList.add("resize");
        }
    }
    return ((0, jsx_runtime_1.jsx)("section", Object.assign({ className: "review-section" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-top flex" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "REVIEW" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "review-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "review-pop-btn border-style-btn", onClick: () => props.open("review") }, { children: "\uD6C4\uAE30 \uC791\uC131\uD558\uAE30" })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "total-point" }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ style: { margin: "0" } }, { children: "\uAD6C\uB9E4\uC790 \uD3C9\uC810" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "rating" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "4.9" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "review-point" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "point", style: { width: "60%" } }) }))] })), reviews] })) })));
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
        content = (0, jsx_runtime_1.jsx)(ReviewSection, { open: (_pop) => setPop(_pop) });
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
        else if (pop === "duplicate") {
            setPopContent((0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC774\uBBF8 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACA8\uC788\uB294 \uC0C1\uD488\uC785\uB2C8\uB2E4." }));
        }
        else if (pop === "review") {
            setPopContent((0, jsx_runtime_1.jsx)(ReviewPop_1.default, { close: closePop }));
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
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-container big-container" }, { children: [(0, jsx_runtime_1.jsx)(ProductSection, { name: name, price: price, urls: urls, open: (_pop) => setPop(_pop) }), (0, jsx_runtime_1.jsx)(Nav, { onChangeTap: (_tap) => setTap(_tap) }), content] })), popContent, (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
function Detail() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Detail;
