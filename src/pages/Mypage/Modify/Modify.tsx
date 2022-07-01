import "./Modify.css";
import { useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";

type Prop = {
    email: string;
    name: string;
    mobile: string;
    postCode: string;
    address: string;
    detailAddress: string;
};

function Form(props: Prop) {
    const [postCode, setPostCode] = useState(props.postCode);
    const [address, setAddress] = useState(props.address);
    const [detailAddress, setDetailAddress] = useState(props.detailAddress);

    return (
        <form className="modify-form" method="post">
            <div className="input-container">
                <input type="text" placeholder="이메일" value="a6570407@naver.com" readOnly disabled />
                <input type="password" placeholder="비밀번호" />
                <input type="password" placeholder="비밀번호 확인" />
                <input type="text" value={props.name} readOnly disabled />
                <input type="text" value={props.mobile} readOnly disabled />
                <div className="postcode-wrap">
                    <input className="userPostcode" type="text" placeholder="우편번호" value={postCode} onChange={event => setPostCode(event.target.value)} />
                    <button type="button" className="search-btn"></button>
                </div>
                <input className="userAddress" type="text" placeholder="기본 주소" value={address} onChange={event => setAddress(event.target.value)} />
                <input className="userDetailAddress" type="text" placeholder="상세 주소" value={detailAddress} onChange={event => setDetailAddress(event.target.value)} />
            </div>
            <div className="btn-wrap">
                <button className="modify-btn">회원정보수정</button>
            </div>
            <div className="member-leave small-txt">
                <a href="/" onClick={event => event.preventDefault()}>
                    회원탈퇴
                </a>
            </div>
        </form>
    );
}

function Main() {
    return (
        <main>
            <div className="big-container">
                <h1>MYPAGE</h1>
                <Lnb title="modify" />
                <div className="modify-wrap">
                    <Form email="a6570407@naver.com" name="김소현" mobile="010-0000-0000" postCode="00000" address="서울시" detailAddress="더 내추럴 빌딩" />
                </div>
            </div>
        </main>
    );
}

function Modify() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Modify;
