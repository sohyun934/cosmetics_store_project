import "./Order.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db, signedInUser } from "../../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";

interface CustomizedState {
    orderList: string[];
    orderPrice: string;
    fee: string;
    totPrice: string;
}

const StyledInput = styled.input`
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;

function OrderForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [deliveryMsg, setDeliveryMsg] = useState("");
    const [disabled, setDisabled] = useState(true);

    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;

    let orderList: string[];
    let orderPrice: string = "0";
    let fee: string = "0";
    let totPrice: string = "0";

    if (state) {
        orderList = state.orderList;
        orderPrice = state.orderPrice;
        fee = state.fee;
        totPrice = state.totPrice;
    }

    // 사용자 정보 가져오기
    async function fetchUser() {
        const q = query(collection(db, "users"), where("email", "==", signedInUser));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();

            setName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setPostcode(user.post_code);
            setAddress(user.address);
            setDetailAddress(user.detail_address);
        });
    }

    useEffect(() => {
        // url로 직접 접속하는 경우 장바구니로 이동
        if (!state) {
            alert("정상적이지 않은 접근입니다.");
            navigate("/mypage/cart");
        } else {
            // 새로고침 시 장바구니로 이동
            fetchUser().catch(() => {
                navigate("/mypage/cart");
            });
        }
    }, []);

    // 다음 우편번호 API
    function handleComplete(data) {
        let addr = "";

        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R") addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else addr = data.jibunAddress;

        setPostcode(data.zonecode);
        setAddress(addr);
    }

    function handleClick() {
        open({ onComplete: handleComplete });
    }

    // 유효성 검증 후 결제하기 버튼 활성화
    useEffect(() => {
        if (name && phoneNumber && postcode && address && detailAddress) setDisabled(false);
        else setDisabled(true);
    }, [name, phoneNumber, postcode, address, detailAddress]);

    function getToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (1 + date.getMonth())).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        return year + month + day;
    }

    // 난수 생성
    function generateRandomCode(n: number) {
        let str = "";
        for (let i = 0; i < n; i++) str += Math.floor(Math.random() * 10);

        return str;
    }

    // 주문 진행
    async function order() {
        const today = getToday();
        const randomCode = generateRandomCode(4);
        const orderId = today + randomCode;

        const amountList = [];
        const productNameList = [];

        for (let i = 0; i < orderList.length; i++) {
            const cartRef = doc(db, "cart", orderList[i]);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cart = cartSnap.data();

                amountList.push(cart.amount);
                productNameList.push(cart.product_name);

                // 장바구니에서 삭제
                await deleteDoc(doc(db, "cart", orderList[i]));
            }
        }

        // firestore에 주문 정보 등록
        await setDoc(doc(db, "order", orderId), {
            order_id: orderId,
            order_list: orderList,
            amount_list: amountList,
            product_name_list: productNameList,
            name: name,
            email: email,
            phone_number: phoneNumber,
            postcode: postcode,
            address: address,
            detail_address: detailAddress,
            delivery_msg: deliveryMsg,
            order_price: orderPrice,
            fee: fee,
            tot_price: totPrice
        }).then(() => {
            navigate("/order/orderComplete", {
                replace: true,
                state: {
                    orderId: orderId
                }
            });
        });
    }

    return (
        <form className="flex" action="#" method="post">
            <section className="delivery-section">
                <h2>Delivery</h2>
                <div className="input-container">
                    <input type="text" placeholder="받는 분" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="핸드폰번호" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    <div className="postcode-wrap">
                        <StyledInput
                            className="userPostcode"
                            type="text"
                            placeholder="우편번호"
                            value={postcode}
                            onChange={e => setPostcode(e.target.value)}
                            readOnly
                        />
                        <button type="button" className="search-btn" onClick={handleClick}></button>
                    </div>
                    <StyledInput
                        className="userAddress"
                        type="text"
                        placeholder="기본 주소"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        readOnly
                    />
                    <input
                        className="userDetailAddress"
                        type="text"
                        placeholder="상세 주소"
                        value={detailAddress}
                        onChange={e => setDetailAddress(e.target.value)}
                    />
                </div>
                <div className="delivery-msg">
                    <select onChange={e => setDeliveryMsg(e.target.value)}>
                        <option value="">직접 입력</option>
                        <option>배송 전 연락 부탁드립니다.</option>
                        <option>부재 시 경비실에 맡겨주세요.</option>
                        <option>문 앞 배송 부탁드립니다.</option>
                    </select>
                    <textarea
                        rows={5}
                        cols={50}
                        maxLength={50}
                        placeholder="배송메시지 직접 입력 (50자 이내)"
                        value={deliveryMsg}
                        onChange={e => setDeliveryMsg(e.target.value)}
                        style={{ fontSize: "1rem" }}
                    ></textarea>
                </div>
            </section>
            <section className="check-out-section">
                <div className="section-inner">
                    <h2>Check Out</h2>
                    <hr />
                    <div className="check-out-price flex">
                        <span>주문금액</span>
                        <span className="price">
                            <strong>{orderPrice}원</strong>
                        </span>
                    </div>
                    <div className="delivery-fee flex">
                        <span>배송비</span>
                        <span className="fee">
                            <strong>{fee}원</strong>
                        </span>
                    </div>
                    <p className="small-txt">* 30,000원 이상 구매 시 무료 배송</p>
                    <hr />
                    <div className="total-price flex">
                        <span>
                            <strong>합계</strong>
                        </span>
                        <span className="price">
                            <strong>{totPrice}원</strong>
                        </span>
                    </div>
                </div>
                <div className="btn-container flex">
                    <Link to="/mypage/cart" className="cancel-btn border-style-btn">
                        취소하기
                    </Link>
                    <button type="button" className="pay-btn" onClick={order} disabled={disabled}>
                        결제하기
                    </button>
                </div>
            </section>
        </form>
    );
}

function Main() {
    return (
        <main>
            <div className="order-container big-container">
                <h1>ORDER</h1>
                <div className="section-container">
                    <OrderForm />
                </div>
            </div>
        </main>
    );
}

function Order() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Order;
