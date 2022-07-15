import "./Cart.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
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

const StyledSelect = styled.select`
    width: 45px;
    height: 25px;
    padding: 0 0 0 5px;
    border: 1px solid #d0d0d0;
    border-radius: 5px;
    font-size: 12px;
    background: white;
    margin-left: 10px;
`;

function CartSection() {
    const [cartList, setCartList] = useState([]);
    const [cartIdList, setCartIdList] = useState([]);
    const [cartAmountList, setCartAmountList] = useState([]);
    const [cartPriceList, setCartPriceList] = useState([]);
    const [checkList, setCheckList] = useState([]);

    const [orderPrice, setOrderPrice] = useState("0");
    const [fee, setFee] = useState("0");
    const [totPrice, setTotPrice] = useState("0");

    // 주문서 가격 설정
    function handlePrice(orderPrice: number): void {
        setOrderPrice(String(orderPrice).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

        let fee = 0;
        if (orderPrice > 0 && orderPrice < 30000) fee = 3000;
        setFee(String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

        setTotPrice(String(orderPrice + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    }

    // 장바구니 상품 수량 변경
    async function handleAmt(i: number, id: string, amount: string): Promise<void> {
        const cartItemRef = doc(db, "cart", id);

        await updateDoc(cartItemRef, {
            amount: amount
        }).then(() => {
            const newAmountList = [...cartAmountList];
            newAmountList[i] = amount;
            setCartAmountList(newAmountList);

            let orderPrice = 0;
            for (let i = 0; i < cartPriceList.length; i++) orderPrice += cartPriceList[i] * newAmountList[i];
            handlePrice(orderPrice);

            window.confirm("수량 변경이 완료되었습니다.");
        });
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
        const cartIdList = [];
        const cartAmountList = [];
        const cartPriceList = [];
        const cartList = [];

        querySnapshot.docs.map(async (doc, i) => {
            const cartItem = doc.data();
            const product = products[i].data();

            orderPrice += product.product_price * cartItem.amount;
            cartIdList.push(doc.id);
            cartAmountList.push(cartItem.amount);
            cartPriceList.push(product.product_price);
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
                    </td>
                </>
            );
        });

        handlePrice(orderPrice);
        setCartIdList(cartIdList);
        setCartAmountList(cartAmountList);
        setCartPriceList(cartPriceList);
        setCartList(cartList);
    }

    function getCartList() {
        onAuthStateChanged(auth, user => {
            if (user) fetchCart(user.email);
        });
    }

    useEffect(() => {
        getCartList();
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
        await deleteDoc(doc(db, "cart", id)).then(() => {
            setCheckList([]);
            getCartList();
        });
    }

    // 장바구니 선택 삭제
    async function delCartItems(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        if (checkList.length === 0) {
            alert("선택된 상품이 없습니다.");
        } else {
            if (window.confirm("선택된 상품을 삭제하시겠습니까?")) {
                for (let id of checkList) {
                    await deleteDoc(doc(db, "cart", id)).then(() => {
                        setCheckList([]);
                        getCartList();
                    });
                }
            }
        }
    }

    // 장바구니 전체 삭제
    async function delCartList(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        if (window.confirm("장바구니를 비우시겠습니까?")) {
            for (let id of cartIdList) {
                await deleteDoc(doc(db, "cart", id)).then(() => {
                    setCheckList([]);
                    getCartList();
                });
            }
        }
    }

    return (
        <>
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
                                        <td>
                                            <StyledSelect defaultValue={cartAmountList[i]} onChange={e => handleAmt(i, cartIdList[i], e.target.value)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </StyledSelect>
                                        </td>
                                        <td className="del-util">
                                            <button type="button" className="del-btn" onClick={() => delCartItem(cartIdList[i])}></button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr key="empty" className="cart-item">
                                <td className="empty">장바구니에 담긴 상품이 없습니다.</td>
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
            <section className="order-section">
                <div className="section-inner">
                    <h2>Order</h2>
                    <hr />
                    <div className="order-price flex">
                        <span className="title">주문금액</span>
                        <span className="price">
                            <strong>{orderPrice}원</strong>
                        </span>
                    </div>
                    <div className="delivery-fee flex">
                        <span className="title">배송비</span>
                        <span className="fee">
                            <strong>{fee}원</strong>
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
        </>
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
