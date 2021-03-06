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
const CartPop_1 = __importDefault(require("../../pages/Mypage/Cart/CartPop/CartPop"));
const StyledButton = styled_components_1.default.button `
    @media (min-width: 900px) {
        width: 30%;
    }
`;
function ProductMain() {
    const [pop, setPop] = (0, react_1.useState)({ state: "", content: null });
    const [products, setProducts] = (0, react_1.useState)([]);
    const [moreBtn, setMoreBtn] = (0, react_1.useState)(false);
    const [lastVisible, setLastVisible] = (0, react_1.useState)(null);
    const [order, setOrder] = (0, react_1.useState)({ field: "product_id", direction: "desc" });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const pathname = (0, react_router_dom_1.useLocation)().pathname.substring(1);
    const limitNum = 9;
    const category = {
        hair: {
            title: "HAIR CARE",
            desc: "????????? ??????????????? ??????????????????"
        },
        skin: {
            title: "SKIN CARE",
            desc: "????????? ????????? ????????? ??????????????? ???????????????"
        },
        body: {
            title: "BODY CARE",
            desc: "????????? ????????? ???????????? ??????????????? ??????????????????"
        }
    };
    const closePop = () => {
        setPop(pop => (Object.assign(Object.assign({}, pop), { state: "", content: null })));
    };
    (0, react_1.useEffect)(() => {
        if (pop.state === "cart") {
            setPop(pop => (Object.assign(Object.assign({}, pop), { content: (0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC0C1\uD488\uC774 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACBC\uC2B5\uB2C8\uB2E4." }) })));
        }
        else if (pop.state === "overlap") {
            setPop(pop => (Object.assign(Object.assign({}, pop), { content: (0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: "\uC774\uBBF8 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACA8\uC788\uB294 \uC0C1\uD488\uC785\uB2C8\uB2E4." }) })));
        }
    }, [pop.state]);
    const handleAddCart = (productName) => __awaiter(this, void 0, void 0, function* () {
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
                    amount: 1
                });
                setPop(pop => (Object.assign(Object.assign({}, pop), { state: "cart" })));
            }
            else {
                setPop(pop => (Object.assign(Object.assign({}, pop), { state: "overlap" })));
            }
        }
    });
    // ?????? ????????? ????????????
    const fetchProducts = (field, direction, isClicked) => __awaiter(this, void 0, void 0, function* () {
        let productSnapshot;
        let productList;
        // ????????? ????????? ????????? ??????
        if (isClicked) {
            // ????????? ?????? ????????? limit ????????? ?????? ????????? ?????? ?????????
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.startAfter)(lastVisible));
            const restProducts = yield (0, firestore_1.getDocs)(q);
            if (restProducts.size <= limitNum)
                setMoreBtn(false);
            // ?????? ????????? ????????????
            const more = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.startAfter)(lastVisible), (0, firestore_1.limit)(limitNum));
            productSnapshot = yield (0, firestore_1.getDocs)(more);
            productList = [...products];
        }
        else {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname));
            const totProducts = yield (0, firestore_1.getDocs)(q);
            // ?????? ?????? ????????? limit??? ???????????? ?????? ????????? ?????? ??????
            if (totProducts.size > limitNum) {
                setMoreBtn(true);
            }
            // ?????? ????????????
            const first = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.limit)(limitNum));
            productSnapshot = yield (0, firestore_1.getDocs)(first);
            productList = [];
        }
        setLastVisible(productSnapshot.docs[productSnapshot.docs.length - 1]);
        if (productSnapshot.empty) {
            productList.push((0, jsx_runtime_1.jsx)("li", Object.assign({ style: { padding: "20px", marginTop: "50px", marginBottom: "40vh" } }, { children: "\uB4F1\uB85D\uB41C \uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })));
        }
        else {
            // storage ????????? ????????????
            const promises = productSnapshot.docs.map(doc => (0, getImage_1.getImage)(doc.data().product_thumb_01));
            const urls = yield Promise.all(promises);
            // firestore ????????? ???????????? ????????? ?????????
            productSnapshot.docs.forEach((doc, i) => {
                const data = doc.data();
                productList.push((0, jsx_runtime_1.jsxs)("li", Object.assign({ className: "product" }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: "/detail", state: {
                                name: data.product_name,
                                price: data.product_price,
                                thumb01: data.product_thumb_01,
                                thumb02: data.product_thumb_02,
                                thumb03: data.product_thumb_03,
                                detail: data.product_detail
                            } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "thumb" }, { children: (0, jsx_runtime_1.jsx)("img", { src: urls[i], alt: data.product_name }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "info" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "name" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: data.product_name }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "price" }, { children: (0, jsx_runtime_1.jsxs)("strong", { children: [data.product_price, "\uC6D0"] }) }))] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "util-btn-container" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "cart-btn gray-style-btn", onClick: () => handleAddCart(data.product_name) }, { children: (0, jsx_runtime_1.jsx)("span", { children: "CART" }) })) }))] }), doc.id));
            });
        }
        setProducts(productList);
    });
    (0, react_1.useEffect)(() => {
        fetchProducts("product_id", "desc", false);
    }, []);
    // ?????? ????????? ??????
    const handleSort = (e) => {
        let field = "product_id";
        let direction = "desc";
        if (e.target.value === "new") {
            field = "product_id";
            direction = "desc";
        }
        else if (e.target.value === "low-price") {
            field = "product_price";
            direction = "asc";
        }
        else if (e.target.value === "high-price") {
            field = "product_price";
            direction = "desc";
        }
        fetchProducts(field, direction, false);
        setOrder(orderBy => (Object.assign(Object.assign({}, orderBy), { field: field, direction: direction })));
    };
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-title" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: category[pathname].title }), (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { wordBreak: "keep-all" } }, { children: category[pathname].desc }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "list-filter" }, { children: (0, jsx_runtime_1.jsxs)("select", Object.assign({ onChange: e => handleSort(e) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "new" }, { children: "\uB4F1\uB85D\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "low-price" }, { children: "\uB0AE\uC740\uAC00\uACA9\uC21C" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "high-price" }, { children: "\uB192\uC740\uAC00\uACA9\uC21C" }))] })) })), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: products })), moreBtn && ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: { textAlign: "center", padding: "0 20px" } }, { children: (0, jsx_runtime_1.jsx)(StyledButton, Object.assign({ className: "border-style-btn", onClick: () => {
                                fetchProducts(order.field, order.direction, true);
                            } }, { children: "\uB354\uBCF4\uAE30" })) })))] })), pop.content, (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
}
exports.default = ProductMain;
