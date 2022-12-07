import MoveTop from "../MoveTop/MoveTop";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    addDoc,
    collection,
    DocumentData,
    FieldPath,
    getDocs,
    limit,
    orderBy,
    OrderByDirection,
    query,
    QuerySnapshot,
    startAfter,
    where
} from "firebase/firestore";
import { db, signedInUser } from "../../firebase";
import { getImage } from "../../utils/getImage";
import styled from "styled-components";
import CartPop from "../../pages/Mypage/Cart/CartPop/CartPop";
import { getFormatPrice } from "../../utils/getFormatPrice";

type CategoryProp = {
    category: {};
    pathname: string;
};

const Category = (props: CategoryProp) => {
    const category = props.category;
    const pathname = props.pathname;
    const title = category[pathname].title;
    const desc = category[pathname].desc;

    return (
        <div className="section-title">
            <h1>{title}</h1>
            <p style={{ wordBreak: "keep-all" }}>{desc}</p>
        </div>
    );
};

const StyledButton = styled.button`
    @media (min-width: 900px) {
        width: 30%;
    }
`;

const SelectBox = styled.div`
    position: relative;
    text-align: right;
    padding-right: 16px;
`;

const SelectBtn = styled.button`
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

const SelectList = styled.ul`
    width: 100px;
    position: absolute;
    top: 40px;
    right: 16px;
    border: 1px solid rgb(237, 237, 237);
    background-color: rgb(255, 255, 255);
    z-index: 102;
`;

const SelectItem = styled.li`
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

type ListProps = {
    pathname: string;
};

interface Order {
    field: string | FieldPath;
    direction: OrderByDirection;
}

function ProductList(props: ListProps) {
    const pathname = props.pathname;

    const [cartPop, setCartPop] = useState({ state: "", desc: null });
    const [moreBtn, setMoreBtn] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectItem, setSelectItem] = useState("등록순");
    const [order, setOrder] = useState<Order>({ field: "product_id", direction: "desc" });

    const navigate = useNavigate();
    const selectBtnRef = useRef(null);
    const selectListRef = useRef(null);

    const selectItemList = ["등록순", "낮은가격순", "높은가격순"];
    const selectItems = selectItemList.map(item => (
        <SelectItem key={item} onClick={e => handleSort(e)} className={item === selectItem ? "active" : ""}>
            {item}
        </SelectItem>
    ));

    // 장바구니 팝업창 제어
    const closePop = () => {
        setCartPop(cartPop => ({ ...cartPop, state: "", desc: null }));
    };

    useEffect(() => {
        if (cartPop.state) {
            setCartPop(cartPop => ({
                ...cartPop,
                desc: (
                    <CartPop close={closePop} title={cartPop.state === "overlap" ? "이미 장바구니에 담겨있는 상품입니다." : "상품이 장바구니에 담겼습니다."} />
                )
            }));
        }
    }, [cartPop.state]);

    const handleAddCart = async (productName: string) => {
        if (!signedInUser) {
            navigate("/login", { state: { moveTo: -1 } });
        } else {
            const q = query(collection(db, "cart"), where("user_email", "==", signedInUser), where("product_name", "==", productName));
            const cartItem = await getDocs(q);
            const cartList = await getDocs(query(collection(db, "cart"), where("user_email", "==", signedInUser)));

            if (cartItem.empty) {
                await addDoc(collection(db, "cart"), {
                    cart_id: cartList.size + 1,
                    product_name: productName,
                    user_email: signedInUser,
                    amount: 1
                });

                setCartPop(cartPop => ({ ...cartPop, state: "new" }));
            } else {
                setCartPop(cartPop => ({ ...cartPop, state: "overlap" }));
            }
        }
    };

    // 상품 리스트 가져오기
    const fetchProducts = async (field: string | FieldPath, direction: OrderByDirection, isMoreBtnClicked: boolean) => {
        const limitNum = 9;
        let productSnapshot: QuerySnapshot<DocumentData>;
        let productList: any[];

        if (isMoreBtnClicked) {
            // 상품 추가로 가져오기
            const moreQ = query(
                collection(db, "product"),
                where("product_type", "==", pathname),
                orderBy(field, direction),
                startAfter(lastVisible),
                limit(limitNum)
            );

            productSnapshot = await getDocs(moreQ);
            productList = [...products];

            // 나머지 상품 갯수가 limit 이하인 경우 더보기 버튼 감추기
            const q = query(collection(db, "product"), where("product_type", "==", pathname), orderBy(field, direction), startAfter(lastVisible));
            const restProducts = await getDocs(q);

            if (restProducts.size <= limitNum) {
                setMoreBtn(false);
            }
        } else {
            // 상품 가져오기
            const first = query(collection(db, "product"), where("product_type", "==", pathname), orderBy(field, direction), limit(limitNum));
            productSnapshot = await getDocs(first);
            productList = [];

            // 전체 상품 갯수에 따라 더보기 버튼 보이기 or 감추기
            const q = query(collection(db, "product"), where("product_type", "==", pathname));
            const totProducts = await getDocs(q);

            if (totProducts.size > limitNum) {
                setMoreBtn(true);
            } else {
                setMoreBtn(false);
            }
        }

        setLastVisible(productSnapshot.docs[productSnapshot.docs.length - 1]);

        // 상품 리스트 만들기
        if (productSnapshot.empty) {
            productList.push(<li style={{ padding: "20px", marginTop: "50px", marginBottom: "40vh" }}>등록된 상품이 없습니다.</li>);
        } else {
            // storage 이미지 가져오기
            const promises = productSnapshot.docs.map(doc => getImage(doc.data().product_thumb_01));
            const urls = await Promise.all(promises);

            productSnapshot.docs.forEach((doc, i) => {
                const data = doc.data();

                productList.push(
                    <li key={doc.id} className="product">
                        <Link
                            to="/detail"
                            state={{
                                name: data.product_name,
                                price: data.product_price,
                                thumb01: data.product_thumb_01,
                                thumb02: data.product_thumb_02,
                                thumb03: data.product_thumb_03,
                                detail: data.product_detail
                            }}
                        >
                            <div className="thumb">
                                <img src={urls[i]} alt={data.product_name} />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>{data.product_name}</strong>
                                </div>
                                <span className="price">
                                    <strong>{getFormatPrice(data.product_price)}</strong>
                                </span>
                                <span>원</span>
                            </div>
                        </Link>
                        <div className="util-btn-container">
                            <button className="cart-btn gray-style-btn" onClick={() => handleAddCart(data.product_name)}>
                                <span>CART</span>
                            </button>
                        </div>
                    </li>
                );
            });
        }

        setProducts(productList);
    };

    useEffect(() => {
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

    const handleSort = (e: React.MouseEvent<HTMLElement>) => {
        const selectItem = (e.target as HTMLElement).innerText;
        let field: string | FieldPath = "product_id";
        let direction: OrderByDirection = "desc";

        if (selectItem === "등록순") {
            field = "product_id";
            direction = "desc";
        } else if (selectItem === "낮은가격순") {
            field = "product_price";
            direction = "asc";
        } else if (selectItem === "높은가격순") {
            field = "product_price";
            direction = "desc";
        }

        // 셀렉트 박스 제어
        handleSelect();
        setSelectItem(selectItem);

        // 상품 정렬
        fetchProducts(field, direction, false);
        setOrder(orderBy => ({ ...orderBy, field: field, direction: direction }));
    };

    return (
        <>
            <SelectBox>
                <SelectBtn className="unactive" onClick={handleSelect} ref={selectBtnRef}>
                    {selectItem}
                </SelectBtn>
                <SelectList className="display-none" ref={selectListRef}>
                    {selectItems}
                </SelectList>
            </SelectBox>
            <ul className="product-list flex">{products}</ul>
            {moreBtn && (
                <div style={{ textAlign: "center", padding: "0 20px" }}>
                    <StyledButton
                        className="border-style-btn"
                        onClick={() => {
                            fetchProducts(order.field, order.direction, true);
                        }}
                    >
                        더보기
                    </StyledButton>
                </div>
            )}
            {cartPop.desc}
        </>
    );
}

const ProductMain = () => {
    const pathname = useLocation().pathname.substring(1);
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

    return (
        <main>
            <section className="product-section">
                <Category category={category} pathname={pathname} />
                <ProductList pathname={pathname} />
            </section>
            <MoveTop />
        </main>
    );
};

export default ProductMain;
