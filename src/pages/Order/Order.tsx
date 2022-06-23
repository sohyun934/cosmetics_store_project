import "./Order.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type DeliveryProp = {
    name: string;
    postCode: string;
    address: string;
    detailAddress: string;
    mobile: string;
    email: string;
};

function DeliverySection(props: DeliveryProp) {
    const [name, setName] = useState(props.name);
    const [mobile, setMobile] = useState(props.mobile);
    const [postCode, setPostCode] = useState(props.postCode);
    const [address, setAddress] = useState(props.address);
    const [detailAddress, setDetailAddress] = useState(props.detailAddress);

    return (
        <section className="delivery-section">
            <h2>Delivery</h2>
            <div className="input-container">
                <input type="text" placeholder="받는 분" value={name} onChange={event => setName(event.target.value)} />
                <input type="text" placeholder="핸드폰번호" value={mobile} onChange={event => setMobile(event.target.value)} />
                <div className="postcode-wrap">
                    <input className="userPostcode" type="text" placeholder="우편번호" value={postCode} onChange={event => setPostCode(event.target.value)} />
                    <button type="button" className="search-btn"></button>
                </div>
                <input className="userAddress" type="text" placeholder="기본 주소" value={address} onChange={event => setAddress(event.target.value)} />
                <input className="userDetailAddress" type="text" placeholder="상세 주소" value={detailAddress} onChange={event => setDetailAddress(event.target.value)} />
            </div>
            <div className="delivery-msg">
                <select>
                    <option value="etc">직접 입력</option>
                    <option value="msg01">배송 전 연락 부탁드립니다.</option>
                    <option value="msg02">부재 시 경비실에 맡겨주세요.</option>
                    <option value="msg03">문 앞 배송 부탁드립니다.</option>
                </select>
                <textarea rows={5} cols={50} maxLength={50} placeholder="배송메시지 직접 입력 (50자 이내)"></textarea>
            </div>
        </section>
    );
}

type CheckOutProp = {
    price: string;
};

function CheckOutSection(props: CheckOutProp) {
    const price = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let fee = 3000;
    if (Number(props.price) >= 30000) fee = 0;
    const totPrice = String(fee + Number(props.price)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return (
        <section className="check-out-section">
            <div className="section-inner">
                <h2>Check Out</h2>
                <hr />
                <div className="check-out-price flex">
                    <span>주문금액</span>
                    <span className="price">
                        <strong>{price}원</strong>
                    </span>
                </div>
                <div className="delivery-fee flex">
                    <span>배송비</span>
                    <span className="fee">
                        <strong>{String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</strong>
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
                <Link to="/mypage/cart" className="cancel-btn gray-style-btn">
                    취소하기
                </Link>
                <button className="pay-btn">결제하기</button>
            </div>
        </section>
    );
}

function Main() {
    return (
        <main>
            <div className="order-container big-container">
                <h1>ORDER</h1>
                <div className="section-container">
                    <form className="flex" action="#" method="post">
                        <DeliverySection name="김소현" mobile="010-0000-0000" postCode="00000" address="서울시" detailAddress="더 내추럴 빌딩" email="a6570407@naver.com" />
                        <CheckOutSection price="24000" />
                    </form>
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
