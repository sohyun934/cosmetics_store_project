import "./Cart.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { getImage } from "../../../utils/getImage";
import { onAuthStateChanged } from "firebase/auth";

const StyledInput = styled.input`
    appearance: none;
    border: 1.5px solid #aaa;
    width: 0.9rem;
    height: 0.9rem;

    &:checked {
        border: transparent;
        background: #e5e5e5
            url("data:image/svg+xml,%3Csvg width='1.5rem' height='1.5rem' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' 
	stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
            no-repeat 50% / 100%;
    }
`;

type CartProp = {
    setOrderPrice: Function;
};

function CartSection(props: CartProp) {
    const [amount, setAmount] = useState(1);
    const [cartList, setCartList] = useState([]);
    const [cartIdList, setCartIdList] = useState([]);
    const [checkList, setCheckList] = useState([]);

    // 장바구니 상품 수량 변경
    function minus(): void {
        setAmount(amount === 1 ? 1 : amount - 1);
    }

    function changeAmt(e: React.ChangeEvent<HTMLInputElement>): void {
        const amount = Number(e.target.value);

        if (amount >= 3) {
            alert("최대 주문수량은 3개 입니다.");
            setAmount(3);
        } else if (amount < 1) {
            alert("최소 주문수량은 1개 입니다.");
            setAmount(1);
        } else if (isNaN(amount)) {
            alert("숫자만 입력 가능합니다.");
            setAmount(1);
        } else {
            setAmount(Number(e.target.value));
        }
    }

    function plus(): void {
        setAmount(amount === 3 ? 3 : amount + 1);

        if (amount === 3) alert("최대 주문수량은 3개 입니다.");
    }

    // 장바구니 리스트 가져오기
    async function fetchCart(userEmail: string) {
        const q = query(collection(db, "cart"), where("user_email", "==", userEmail), orderBy("cart_id", "desc"));
        const querySnapshot = await getDocs(q);

        // 장바구니에 담긴 product 정보 가져오기
        const productsPromises = querySnapshot.docs.map(document => getDoc(doc(db, "product", document.data().product_name)));
        const products = await Promise.all(productsPromises);
        const urlsPromises = products.map(product => getImage(product.data().product_thumb_01));
        const urls = await Promise.all(urlsPromises);

        let orderPrice = 0;
        const cartList = [];
        const cartIdList = [];

        querySnapshot.docs.map(async (doc, i) => {
            const cartItem = doc.data();
            const product = products[i].data();
            orderPrice += product.product_price * cartItem.amount;

            cartIdList.push(doc.id);

            cartList.push(
                <>
                    <td className="thumb">
                        <Link
                            to="/detail"
                            state={{
                                name: product.product_name,
                                price: product.product_price,
                                thumb01: product.product_thumb_01,
                                thumb02: product.product_thumb_02,
                                thumb03: product.product_thumb_03,
                                detail: product.product_detail
                            }}
                        >
                            <img src={urls[i]} alt={cartItem.product_name} />
                        </Link>
                    </td>
                    <td className="info">
                        <div className="name">
                            <Link
                                to="/detail"
                                state={{
                                    name: product.product_name,
                                    price: product.product_price,
                                    thumb01: product.product_thumb_01,
                                    thumb02: product.product_thumb_02,
                                    thumb03: product.product_thumb_03,
                                    detail: product.product_detail
                                }}
                            >
                                {cartItem.product_name}
                            </Link>
                        </div>
                        <div className="price">{product.product_price}</div>
                        <div className="flex">
                            <span className="cnt-box">
                                <button type="button" className="minus" onClick={minus}></button>
                                <input type="text" className="cnt" value={cartItem.amount} onChange={changeAmt} />
                                <button type="button" className="plus" onClick={plus}></button>
                            </span>
                        </div>
                    </td>
                    <td className="del-util">
                        <button type="button" className="del-btn" onClick={() => delCartItem(doc.id)}></button>
                    </td>
                </>
            );
        });

        props.setOrderPrice(orderPrice);
        setCartList(cartList);
        setCartIdList(cartIdList);
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) fetchCart(user.email);
        });
    }, []);

    // 체크박스 단일 선택
    function handleSingleCheck(isChecked: boolean, id: string) {
        if (isChecked) {
            setCheckList(checkList => [...checkList, id]);
        } else {
            setCheckList(checkList => checkList.filter(el => el !== id));
        }
    }

    // 체크박스 전체 선택
    function handleAllCheck(isChecked: boolean) {
        if (isChecked) {
            setCheckList(cartIdList);
        } else {
            setCheckList([]);
        }
    }

    // 장바구니 개별 삭제
    async function delCartItem(id: string) {
        await deleteDoc(doc(db, "cart", id));
        window.location.reload();
    }

    // 장바구니 선택 삭제
    async function delCartItems(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        if (checkList.length === 0) {
            alert("선택된 상품이 없습니다.");
        } else {
            if (window.confirm("선택된 상품을 삭제하시겠습니까?")) {
                for (let id of checkList) await deleteDoc(doc(db, "cart", id));
                window.location.reload();
            }
        }
    }

    // 장바구니 전체 삭제
    async function delCartList(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        if (window.confirm("장바구니를 비우시겠습니까?")) {
            for (let id of cartIdList) await deleteDoc(doc(db, "cart", id));
            window.location.reload();
        }
    }

    return (
        <section className="cart-section">
            <h2>Cart</h2>
            <table className="cart-list">
                <tbody>
                    {cartList.length > 0 ? (
                        cartList.map((val, i) => {
                            return (
                                <tr key={i} className="cart-item">
                                    <td className="del-chk">
                                        <StyledInput
                                            type="checkbox"
                                            checked={checkList.includes(cartIdList[i]) ? true : false}
                                            onChange={e => handleSingleCheck(e.target.checked, cartIdList[i])}
                                        />
                                    </td>
                                    {val}
                                </tr>
                            );
                        })
                    ) : (
                        <tr key="empty" className="cart-item">
                            <td className="empty">장바구니가 비어있습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="cart-del-wrap small-txt">
                <StyledInput
                    type="checkbox"
                    checked={cartList.length !== 0 && checkList.length === cartList.length ? true : false}
                    onChange={e => handleAllCheck(e.target.checked)}
                />
                <a href="/" onClick={delCartItems}>
                    선택삭제
                </a>
                <a href="/" onClick={delCartList}>
                    전체삭제
                </a>
            </div>
        </section>
    );
}

type Prop = {
    price: number;
};

function OrderSection(props: Prop) {
    const price = String(props.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    let fee = 3000;
    if (props.price >= 30000) fee = 0;
    const strFee = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const totPrice = String(props.price + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return (
        <section className="order-section">
            <div className="section-inner">
                <h2>Order</h2>
                <hr />
                <div className="order-price flex">
                    <span className="title">주문금액</span>
                    <span className="price">
                        <strong>{price}원</strong>
                    </span>
                </div>
                <div className="delivery-fee flex">
                    <span className="title">배송비</span>
                    <span className="fee">
                        <strong>{strFee}원</strong>
                    </span>
                </div>
                <p className="small-txt">* 30,000원 이상 구매 시 무료 배송</p>
                <hr />
                <div className="total-price flex">
                    <span className="title">
                        <strong>합계</strong>
                    </span>
                    <span className="price">
                        <strong>{totPrice}원</strong>
                    </span>
                </div>
            </div>
            <div className="btn-wrap flex">
                <button className="part-order-btn gray-style-btn">선택상품 구매하기</button>
                <button className="all-order-btn">전체 구매하기</button>
            </div>
        </section>
    );
}

function Main() {
    const [orderPrice, setOrderPrice] = useState(0);

    return (
        <main>
            <div className="big-container">
                <h1>MYPAGE</h1>
                <Lnb title="cart" />
                <div className="section-container">
                    <form className="flex" action="#" method="post">
                        <CartSection setOrderPrice={(orderPrice: React.SetStateAction<number>) => setOrderPrice(orderPrice)} />
                        <OrderSection price={orderPrice} />
                    </form>
                </div>
            </div>
        </main>
    );
}

function Cart() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Cart;
