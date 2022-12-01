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
const getFormatPrice_1 = require("../../utils/getFormatPrice");
function Slider() {
    const slideList = [];
    for (let i = 1; i <= 3; i++) {
        slideList.push((0, jsx_runtime_1.jsx)(react_1.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("img", { src: require(`../../assets/main/main0${i}.jpg`), alt: `메인0${i}` }) }, i));
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_1.Swiper, Object.assign({ modules: [swiper_1.Pagination, swiper_1.A11y, swiper_1.Autoplay], spaceBetween: 0, slidesPerView: 1, pagination: { clickable: true }, loop: true, autoplay: { delay: 3000 } }, { children: slideList })) }));
}
function Section(props) {
    const sections = props.sections;
    const sectionsList = [];
    for (let key in sections) {
        const section = sections[key];
        sectionsList.push((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-inner-left" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "section-title" }, { children: section.title })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "section-desc small-txt" }, { children: section.desc })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: section.link_to, className: "border-style-btn small-txt" }, { children: section.link_content }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "section-inner-right" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: section.products })) }))] }), section.title));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: sectionsList });
}
function Main() {
    const [sections, setSections] = (0, react_2.useState)({
        hair: { title: "HAIR CARE", desc: "다양한 헤어케어를 경험해보세요", link_to: "/hair", link_content: "헤어케어 제품 더보기", products: [] },
        skin: { title: "SKIN CARE", desc: "건강한 피부를 만드는 스킨케어를 만나보세요", link_to: "/skin", link_content: "스킨케어 제품 더보기", products: [] },
        body: {
            title: "BODY CARE",
            desc: "일상의 무게를 줄여주는 아로마테라피 바디케어를 경험해보세요",
            link_to: "/body",
            link_content: "바디케어 제품 더보기",
            products: []
        }
    });
    const copiedSections = Object.assign({}, sections);
    const fetchProducts = (section) => __awaiter(this, void 0, void 0, function* () {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", section), (0, firestore_1.orderBy)("product_id", "desc"), (0, firestore_1.limit)(3));
        const productSnapshot = yield (0, firestore_1.getDocs)(q);
        // storage 이미지 가져오기
        const promises = productSnapshot.docs.map(doc => (0, getImage_1.getImage)(doc.data().product_thumb_01));
        const urls = yield Promise.all(promises);
        // firestore 데이터 가져와서 리스트 만들기
        const products = productSnapshot.docs.map((doc, i) => {
            const data = doc.data();
            return ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: "product" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: {
                        name: data.product_name,
                        price: data.product_price,
                        thumb01: data.product_thumb_01,
                        thumb02: data.product_thumb_02,
                        thumb03: data.product_thumb_03,
                        detail: data.product_detail
                    } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[i], alt: data.product_name }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: data.product_name }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [(0, getFormatPrice_1.getFormatPrice)(data.product_price), "\uC6D0"] }) }))] }))] })) }), doc.id));
        });
        copiedSections[section].products = products;
    });
    (0, react_2.useEffect)(() => {
        Promise.all([fetchProducts("hair"), fetchProducts("skin"), fetchProducts("body")]).then(() => {
            setSections(copiedSections);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", Object.assign({ className: "main-container" }, { children: [(0, jsx_runtime_1.jsx)(Slider, {}), (0, jsx_runtime_1.jsx)(Section, { sections: sections }), (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] })));
}
function Home() {
    return (0, jsx_runtime_1.jsx)(Main, {});
}
exports.default = Home;
