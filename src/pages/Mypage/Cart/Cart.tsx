import "./Cart.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

function CartSection() {
    const [amount, setAmount] = useState(1);
    const [cartList, setCartList] = useState([]);

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

    async function fetchCart(userEmail: string) {
        const q = query(collection(db, "cart"), where("user_email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            setCartList([
                <tr key="empty" className="cart-item">
                    <td className="empty">장바구니가 비어있습니다.</td>
                </tr>
            ]);
        } else {
            // 장바구니에 담긴 product 정보 가져오기
            const productsPromises = querySnapshot.docs.map(document => getDoc(doc(db, "product", document.data().product_name)));
            const products = await Promise.all(productsPromises);
            const urlsPromises = products.map(product => getImage(product.data().product_thumb_01));
            const urls = await Promise.all(urlsPromises);

            const cartList = [];

            querySnapshot.docs.map(async (doc, i) => {
                const cartItem = doc.data();
                const product = products[i].data();
                const totPrice = product.product_price * cartItem.amount;

                cartList.push(
                    <tr key={i} className="cart-item">
                        <td className="del-chk">
                            <StyledInput type="checkbox" />
                        </td>
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
                            <div className="price">{totPrice}</div>
                            <div className="flex">
                                <span className="cnt-box">
                                    <button type="button" className="minus" onClick={minus}></button>
                                    <input type="text" className="cnt" value={cartItem.amount} onChange={changeAmt} />
                                    <button type="button" className="plus" onClick={plus}></button>
                                </span>
                            </div>
                        </td>
                        <td className="del-util">
                            <button type="button" className="del-btn"></button>
                        </td>
                    </tr>
                );
            });

            setCartList(cartList);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) fetchCart(user.email);
        });
    }, []);

    function allDel(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
    }

    return (
        <section className="cart-section">
            <h2>Cart</h2>
            <table className="cart-list">
                <tbody>{cartList}</tbody>
            </table>
            <div className="cart-del-wrap small-txt">
                <StyledInput type="checkbox" />
                <a href="/" onClick={allDel}>
                    전체 삭제
                </a>
            </div>
        </section>
    );
}

type Prop = {
    price: string;
};

function OrderSection(props: Prop) {
    const price = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let fee = 3000;
    if (Number(props.price) >= 30000) fee = 0;
    const strFee = String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const totPrice = String(Number(props.price) + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

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
    return (
        <main>
            <div className="big-container">
                <h1>MYPAGE</h1>
                <Lnb title="cart" />
                <div className="section-container">
                    <form className="flex" action="#" method="post">
                        <CartSection />
                        <OrderSection price="44000" />
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
