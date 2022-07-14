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
const styled_components_1 = __importDefault(require("styled-components"));
const StyledButton = styled_components_1.default.button `
    @media (min-width: 900px) {
        width: 30%;
    }
`;
function ProductMain() {
    const [more, setMore] = (0, react_1.useState)(false);
    const [products, setProducts] = (0, react_1.useState)([]);
    const [wishToggle, setWishToggle] = (0, react_1.useState)(false);
    const [lastVisible, setLastVisible] = (0, react_1.useState)(null);
    const pathname = (0, react_router_dom_1.useLocation)().pathname.substring(1);
    const limitNum = 12;
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
    // 상품 리스트 가져오기
    function fetchProducts(field, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            let productSnapshot;
            let productList;
            if (products.length === 0) {
                // 전체 상품 갯수가 limit을 초과하는 경우 더보기 버튼 노출
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction));
                const totProducts = yield (0, firestore_1.getDocs)(q);
                if (totProducts.size > limitNum)
                    setMore(true);
                // 상품 가져오기
                const first = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.limit)(limitNum));
                productSnapshot = yield (0, firestore_1.getDocs)(first);
                productList = [];
            }
            else {
                // 나머지 상품 갯수가 limit 이하인 경우 더보기 버튼 감추기
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.startAfter)(lastVisible));
                const restProducts = yield (0, firestore_1.getDocs)(q);
                if (restProducts.size <= limitNum)
                    setMore(false);
                // 더보기 버튼 클릭 시 상품 추가로 가져오기
                const more = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.startAfter)(lastVisible), (0, firestore_1.limit)(limitNum));
                productSnapshot = yield (0, firestore_1.getDocs)(more);
                productList = [...products];
            }
            setLastVisible(productSnapshot.docs[productSnapshot.docs.length - 1]);
            if (productSnapshot.empty) {
                productList.push((0, jsx_runtime_1.jsx)("li", Object.assign({ style: { padding: "20px", marginTop: "50px", marginBottom: "40vh" } }, { children: "\uB4F1\uB85D\uB41C \uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })));
            }
            else {
                // storage 이미지 가져오기
                const promises = productSnapshot.docs.map(doc => (0, getImage_1.getImage)(doc.data().product_thumb_01));
                const urls = yield Promise.all(promises);
                // firestore 데이터 가져와서 리스트 만들기
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
            }
            setProducts(productList);
        });
    }
    (0, react_1.useEffect)(() => {
        fetchProducts("product_id", "desc");
    }, []);
    // 상품 리스트 정렬
    function sortProducts(e) {
        if (e.target.value === "new") {
            fetchProducts("product_id", "desc");
        }
        else if (e.target.value === "low-price") {
            fetchProducts("product_price", "asc");
        }
        else if (e.target.value === "high-price") {
            fetchProducts("product_price", "desc");
        }
    }
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-title" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: category[pathname].title }), (0, jsx_runtime_1.jsx)("p", { children: category[pathname].desc })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-filter" }, { children: (0, jsx_runtime_1.jsxs)("select", Object.assign({ onChange: e => sortProducts(e) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "new" }, { children: "\uB4F1\uB85D\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "low-price" }, { children: "\uB0AE\uC740\uAC00\uACA9\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "high-price" }, { children: "\uB192\uC740\uAC00\uACA9\uC21C" }))] })) })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: products })), more ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: { textAlign: "center", padding: "0 20px" } }, { children: (0, jsx_runtime_1.jsx)(StyledButton, Object.assign({ className: "border-style-btn", onClick: () => {
                                fetchProducts("product_id", "desc");
                            } }, { children: "\uB354\uBCF4\uAE30" })) }))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] })), (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
exports.default = ProductMain;
