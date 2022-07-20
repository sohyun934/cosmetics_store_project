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
require("./Home.css");
const Header_1 = __importDefault(require("../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../components/Footer/Footer"));
const MoveTop_1 = __importDefault(require("../../components/MoveTop/MoveTop"));
const react_1 = require("swiper/react");
const swiper_1 = require("swiper");
require("swiper/css");
require("swiper/css/pagination");
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("react");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const getImage_1 = require("../../utils/getImage");
function Slider() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_1.Swiper, Object.assign({ modules: [swiper_1.Pagination, swiper_1.A11y, swiper_1.Autoplay], spaceBetween: 0, slidesPerView: 1, pagination: { clickable: true }, loop: true, autoplay: { delay: 3000 } }, { children: [(0, jsx_runtime_1.jsx)(react_1.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/main/main01.jpg"), alt: "\uBA54\uC77801" }) }), (0, jsx_runtime_1.jsx)(react_1.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/main/main02.jpg"), alt: "\uBA54\uC77802" }) }), (0, jsx_runtime_1.jsx)(react_1.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: require("../../assets/main/main03.jpg"), alt: "\uBA54\uC77803" }) })] })) }));
}
function HairSection(props) {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "hair-section flex" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner-left" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "section-title" }, { children: "HAIR CARE" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "section-desc small-txt" }, { children: "\uB2E4\uC591\uD55C \uD5E4\uC5B4\uCF00\uC5B4\uB97C \uACBD\uD5D8\uD574\uBCF4\uC138\uC694" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/hair", className: "border-style-btn small-txt" }, { children: "\uD5E4\uC5B4\uCF00\uC5B4 \uC81C\uD488 \uB354\uBCF4\uAE30" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-inner-right" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: props.products })) }))] })));
}
function SkinSection(props) {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "skin-section flex" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner-left" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "section-title" }, { children: "SKIN CARE" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "section-desc small-txt" }, { children: "\uAC74\uAC15\uD55C \uD53C\uBD80\uB97C \uB9CC\uB4DC\uB294 \uC2A4\uD0A8\uCF00\uC5B4\uB97C \uB9CC\uB098\uBCF4\uC138\uC694" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/skin", className: "border-style-btn small-txt" }, { children: "\uC2A4\uD0A8\uCF00\uC5B4 \uC81C\uD488 \uB354\uBCF4\uAE30" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-inner-right" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: props.products })) }))] })));
}
function BodySection(props) {
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "body-section flex" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner-left" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "section-title" }, { children: "BODY CARE" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "section-desc small-txt" }, { children: "\uC77C\uC0C1\uC758 \uBB34\uAC8C\uB97C \uC904\uC5EC\uC8FC\uB294 \uC544\uB85C\uB9C8\uD14C\uB77C\uD53C \uBC14\uB514\uCF00\uC5B4\uB97C \uACBD\uD5D8\uD574\uBCF4\uC138\uC694" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/body", className: "border-style-btn small-txt" }, { children: "\uBC14\uB514\uCF00\uC5B4 \uC81C\uD488 \uB354\uBCF4\uAE30" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-inner-right" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: props.products })) }))] })));
}
function Main() {
    const [hairProducts, setHairProducts] = (0, react_2.useState)([]);
    const [skinProducts, setSkinProducts] = (0, react_2.useState)([]);
    const [bodyProducts, setBodyProducts] = (0, react_2.useState)([]);
    const fetchProducts = (section) => __awaiter(this, void 0, void 0, function* () {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", section), (0, firestore_1.orderBy)("product_id", "desc"), (0, firestore_1.limit)(3));
        const productSnapshot = yield (0, firestore_1.getDocs)(q);
        // storage 이미지 가져오기
        const promises = productSnapshot.docs.map(doc => (0, getImage_1.getImage)(doc.data().product_thumb_01));
        const urls = yield Promise.all(promises);
        // firestore 데이터 가져와서 리스트 만들기
        const productList = [];
        productSnapshot.docs.forEach((doc, i) => {
            const data = doc.data();
            productList.push((0, jsx_runtime_1.jsx)("li", Object.assign({ className: "product" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: {
                        name: data.product_name,
                        price: data.product_price,
                        thumb01: data.product_thumb_01,
                        thumb02: data.product_thumb_02,
                        thumb03: data.product_thumb_03,
                        detail: data.product_detail
                    } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[i], alt: data.product_name }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: data.product_name }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [data.product_price, "\uC6D0"] }) }))] }))] })) }), doc.id));
        });
        if (section === "hair") {
            setHairProducts(productList);
        }
        else if (section === "skin") {
            setSkinProducts(productList);
        }
        else if (section === "body") {
            setBodyProducts(productList);
        }
    });
    (0, react_2.useEffect)(() => {
        fetchProducts("hair");
        fetchProducts("skin");
        fetchProducts("body");
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", Object.assign({ className: "main-container" }, { children: [(0, jsx_runtime_1.jsx)(Slider, {}), (0, jsx_runtime_1.jsx)(HairSection, { products: hairProducts }), (0, jsx_runtime_1.jsx)(SkinSection, { products: skinProducts }), (0, jsx_runtime_1.jsx)(BodySection, { products: bodyProducts }), (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] })));
}
function Home() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = Home;
