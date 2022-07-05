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
const MoveTop_1 = __importDefault(require("../MoveTop/MoveTop"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const getImage_1 = require("../../utils/getImage");
function ProductMain() {
    const [empty, setEmpty] = (0, react_1.useState)(false);
    const [products, setProducts] = (0, react_1.useState)([]);
    const [wishToggle, setWishToggle] = (0, react_1.useState)(false);
    const pathname = (0, react_router_dom_1.useLocation)().pathname.substring(1);
    const category = {
        new: {
            title: "NEW",
            desc: "가장 먼저 만나보는 더 내추럴의 신제품"
        },
        best: {
            title: "BEST",
            desc: "가장 사랑 받는 더 내추럴의 베스트 제품"
        },
        hair: {
            title: "HAIR CARE",
            desc: "다양한 헤어케어를 경험해보세요"
        },
        skin: {
            title: "SKIN CARE",
            desc: "건강한 피부를 만드는 스킨케어를 만나보세요"
        },
        body: {
            title: "BODY CARE",
            desc: "일상의 무게를 줄여주는 바디케어를 경험해보세요"
        }
    };
    function fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname));
            const productSnapshot = yield (0, firestore_1.getDocs)(q);
            if (productSnapshot.empty) {
                setEmpty(true);
            }
            else {
                // storage 이미지 가져오기
                const promises = productSnapshot.docs.map(doc => (0, getImage_1.getImage)(doc.data().product_thumb_01));
                const urls = yield Promise.all(promises);
                // firestore 데이터 가져와서 리스트 만들기
                const productList = [];
                productSnapshot.docs.map((doc, i) => __awaiter(this, void 0, void 0, function* () {
                    const data = doc.data();
                    productList.push((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "product" }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: {
                                    name: data.product_name,
                                    price: data.product_price,
                                    thumb01: data.product_thumb_01,
                                    thumb02: data.product_thumb_02,
                                    thumb03: data.product_thumb_03,
                                    detail: data.product_detail
                                } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "thumb" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: urls[i], alt: data.product_name }), (0, jsx_runtime_1.jsx)("button", { className: wishToggle ? "wish-btn on " : "wish-btn", onClick: () => setWishToggle(!wishToggle) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: data.product_name }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [data.product_price, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "util-btn-container" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "cart-btn gray-style-btn" }, { children: (0, jsx_runtime_1.jsx)("span", { children: "CART" }) })) }))] }), doc.id));
                }));
                setProducts(productList);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchProducts();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-title" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: category[pathname].title }), (0, jsx_runtime_1.jsx)("p", { children: category[pathname].desc })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-filter" }, { children: (0, jsx_runtime_1.jsxs)("select", { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "new" }, { children: "\uB4F1\uB85D\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "rank" }, { children: "\uD310\uB9E4\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "low-price" }, { children: "\uB0AE\uC740\uAC00\uACA9\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "high-price" }, { children: "\uB192\uC740\uAC00\uACA9\uC21C" }))] }) })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: empty ? "등록된 상품이 없습니다." : products }))] })), (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
exports.default = ProductMain;
