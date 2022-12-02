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
const Category = (props) => {
    const category = props.category;
    const pathname = props.pathname;
    const title = category[pathname].title;
    const desc = category[pathname].desc;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "section-title" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: title }), (0, jsx_runtime_1.jsx)("p", Object.assign({ style: { wordBreak: "keep-all" } }, { children: desc }))] })));
};
const StyledButton = styled_components_1.default.button `
    @media (min-width: 900px) {
        width: 30%;
    }
`;
const SelectBox = styled_components_1.default.div `
    position: relative;
    text-align: right;
    padding-right: 16px;
`;
const SelectBtn = styled_components_1.default.button `
    width: 100px;
    height: 40px;
    text-align: left;
    background: white;
    color: black;
    font-size: 14px;
    background: right
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath d='M18.71 8.21a1 1 0 0 0-1.42 0l-4.58 4.58a1 1 0 0 1-1.42 0L6.71 8.21a1 1 0 0 0-1.42 0 1 1 0 0 0 0 1.41l4.59 4.59a3 3 0 0 0 4.24 0l4.59-4.59a1 1 0 0 0 0-1.41Z'/%3E%3C/svg%3E")
        no-repeat;
`;
const SelectList = styled_components_1.default.ul `
    width: 100px;
    position: absolute;
    top: 40px;
    right: 16px;
    border: 1px solid rgb(237, 237, 237);
    background-color: rgb(255, 255, 255);
    z-index: 102;
`;
const SelectItem = styled_components_1.default.li `
    text-align: center;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    letter-spacing: -0.5px;
    cursor: pointer;

    &:hover {
        background-color: #e5e5e5;
    }
`;
function ProductList(props) {
    const pathname = props.pathname;
    const [cartPop, setCartPop] = (0, react_1.useState)({ state: "", desc: null });
    const [moreBtn, setMoreBtn] = (0, react_1.useState)(false);
    const [lastVisible, setLastVisible] = (0, react_1.useState)(null);
    const [products, setProducts] = (0, react_1.useState)([]);
    const [selectItem, setSelectItem] = (0, react_1.useState)("등록순");
    const [order, setOrder] = (0, react_1.useState)({ field: "product_id", direction: "desc" });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const selectBtnRef = (0, react_1.useRef)(null);
    const selectListRef = (0, react_1.useRef)(null);
    const selectItemList = ["등록순", "낮은가격순", "높은가격순"];
    const selectItems = selectItemList.map(item => ((0, jsx_runtime_1.jsx)(SelectItem, Object.assign({ onClick: e => handleSort(e), className: item === selectItem ? "active" : "" }, { children: item }), item)));
    // 장바구니 팝업창 제어
    const closePop = () => {
        setCartPop(cartPop => (Object.assign(Object.assign({}, cartPop), { state: "", desc: null })));
    };
    (0, react_1.useEffect)(() => {
        if (cartPop.state) {
            setCartPop(cartPop => (Object.assign(Object.assign({}, cartPop), { desc: ((0, jsx_runtime_1.jsx)(CartPop_1.default, { close: closePop, title: cartPop.state === "overlap" ? "이미 장바구니에 담겨있는 상품입니다." : "상품이 장바구니에 담겼습니다." })) })));
        }
    }, [cartPop.state]);
    const handleAddCart = (productName) => __awaiter(this, void 0, void 0, function* () {
        if (!firebase_1.signedInUser) {
            navigate("/login", { state: { moveTo: -1 } });
        }
        else {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", firebase_1.signedInUser), (0, firestore_1.where)("product_name", "==", productName));
            const cartItem = yield (0, firestore_1.getDocs)(q);
            const cartList = yield (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "cart"), (0, firestore_1.where)("user_email", "==", firebase_1.signedInUser)));
            if (cartItem.empty) {
                yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "cart"), {
                    cart_id: cartList.size + 1,
                    product_name: productName,
                    user_email: firebase_1.signedInUser,
                    amount: 1
                });
                setCartPop(cartPop => (Object.assign(Object.assign({}, cartPop), { state: "new" })));
            }
            else {
                setCartPop(cartPop => (Object.assign(Object.assign({}, cartPop), { state: "overlap" })));
            }
        }
    });
    // 상품 리스트 가져오기
    const fetchProducts = (field, direction, isMoreBtnClicked) => __awaiter(this, void 0, void 0, function* () {
        const limitNum = 9;
        let productSnapshot;
        let productList;
        if (isMoreBtnClicked) {
            // 상품 추가로 가져오기
            const moreQ = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.startAfter)(lastVisible), (0, firestore_1.limit)(limitNum));
            productSnapshot = yield (0, firestore_1.getDocs)(moreQ);
            productList = [...products];
            // 나머지 상품 갯수가 limit 이하인 경우 더보기 버튼 감추기
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.startAfter)(lastVisible));
            const restProducts = yield (0, firestore_1.getDocs)(q);
            if (restProducts.size <= limitNum) {
                setMoreBtn(false);
            }
        }
        else {
            // 상품 가져오기
            const first = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname), (0, firestore_1.orderBy)(field, direction), (0, firestore_1.limit)(limitNum));
            productSnapshot = yield (0, firestore_1.getDocs)(first);
            productList = [];
            // 전체 상품 갯수에 따라 더보기 버튼 보이기 or 감추기
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "product"), (0, firestore_1.where)("product_type", "==", pathname));
            const totProducts = yield (0, firestore_1.getDocs)(q);
            if (totProducts.size > limitNum) {
                setMoreBtn(true);
            }
            else {
                setMoreBtn(false);
            }
        }
        setLastVisible(productSnapshot.docs[productSnapshot.docs.length - 1]);
        // 상품 리스트 만들기
        if (productSnapshot.empty) {
            productList.push((0, jsx_runtime_1.jsx)("li", Object.assign({ style: { padding: "20px", marginTop: "50px", marginBottom: "40vh" } }, { children: "\uB4F1\uB85D\uB41C \uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })));
        }
        else {
            // storage 이미지 가져오기
            const promises = productSnapshot.docs.map(doc => (0, getImage_1.getImage)(doc.data().product_thumb_01));
            const urls = yield Promise.all(promises);
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
        // 셀렉트 박스 초기화
        const selectList = selectListRef.current;
        if (!selectList.classList.contains("display-none")) {
            selectList.classList.add("display-none");
        }
        setSelectItem("등록순");
        // 상품 리스트 출력
        fetchProducts("product_id", "desc", false);
    }, [pathname]);
    // 상품 리스트 정렬 제어
    const handleSelect = () => {
        const selectBtn = selectBtnRef.current;
        const selectList = selectListRef.current;
        selectList.classList.toggle("display-none");
        selectBtn.classList.toggle("unactive");
    };
    const handleSort = (e) => {
        const selectItem = e.target.innerText;
        let field = "product_id";
        let direction = "desc";
        if (selectItem === "등록순") {
            field = "product_id";
            direction = "desc";
        }
        else if (selectItem === "낮은가격순") {
            field = "product_price";
            direction = "asc";
        }
        else if (selectItem === "높은가격순") {
            field = "product_price";
            direction = "desc";
        }
        // 셀렉트 박스 제어
        handleSelect();
        setSelectItem(selectItem);
        // 상품 정렬
        fetchProducts(field, direction, false);
        setOrder(orderBy => (Object.assign(Object.assign({}, orderBy), { field: field, direction: direction })));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(SelectBox, { children: [(0, jsx_runtime_1.jsx)(SelectBtn, Object.assign({ className: "unactive", onClick: handleSelect, ref: selectBtnRef }, { children: selectItem })), (0, jsx_runtime_1.jsx)(SelectList, Object.assign({ className: "display-none", ref: selectListRef }, { children: selectItems }))] }), (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "product-list flex" }, { children: products })), moreBtn && ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: { textAlign: "center", padding: "0 20px" } }, { children: (0, jsx_runtime_1.jsx)(StyledButton, Object.assign({ className: "border-style-btn", onClick: () => {
                        fetchProducts(order.field, order.direction, true);
                    } }, { children: "\uB354\uBCF4\uAE30" })) }))), cartPop.desc] }));
}
const ProductMain = () => {
    const pathname = (0, react_router_dom_1.useLocation)().pathname.substring(1);
    const category = {
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
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("section", Object.assign({ className: "product-section" }, { children: [(0, jsx_runtime_1.jsx)(Category, { category: category, pathname: pathname }), (0, jsx_runtime_1.jsx)(ProductList, { pathname: pathname })] })), (0, jsx_runtime_1.jsx)(MoveTop_1.default, {})] }));
};
exports.default = ProductMain;
