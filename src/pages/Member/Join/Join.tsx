import "./Join.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PrivacyPolicyDetail } from "../../PrivacyPolicy/PrivacyPolicy";
import { TermsOfUseDetail } from "../../TermsOfUse/TermsOfUse";

const StyledInput = styled.input`
    appearance: none;
    border: 1.5px solid #aaa;
    width: 0.9rem;
    height: 0.9rem;

    &:checked {
        border: transparent;
        background: #e5e5e5
            url("data:image/svg+xml,%3Csvg width='1.5rem' height='1.5rem' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
            no-repeat 50% / 100%;
    }
`;

type Prop = {
    closePop: Function;
};

function TermsPop(props: Prop) {
    return (
        <div>
            <div className="popup-container terms-pop">
                <h2>이용약관</h2>
                <hr />
                <TermsOfUseDetail />
                <button type="button" className="pop-close-btn" onClick={() => props.closePop()}></button>
            </div>
            <div className="dim"></div>
        </div>
    );
}

function PrivacyPop(props: Prop) {
    return (
        <div>
            <div className="popup-container privacy-pop">
                <h2>개인정보 처리방침</h2>
                <hr />
                <PrivacyPolicyDetail />
                <button type="button" className="pop-close-btn" onClick={() => props.closePop()}></button>
            </div>
            <div className="dim"></div>
        </div>
    );
}

function Agree() {
    const [allChk, setAllChk] = useState(false);
    const [termsChk, setTermsChk] = useState(false);
    const [privacyChk, setPrivacyChk] = useState(false);
    const [termsPop, setTermsPop] = useState<null | JSX.Element>(null);
    const [privacyPop, setPrivacyPop] = useState<null | JSX.Element>(null);

    const termsPopContent = <TermsPop closePop={() => setTermsPop(null)} />;
    const privacyPopContent = <PrivacyPop closePop={() => setPrivacyPop(null)} />;

    const allChkEvent = () => {
        setAllChk(!allChk);
        setTermsChk(!allChk);
        setPrivacyChk(!allChk);
    };

    useEffect(() => {
        if (termsChk && privacyChk) {
            setAllChk(true);
        } else {
            setAllChk(false);
        }
    }, [termsChk, privacyChk]);

    return (
        <div className="agree-container small-txt">
            <div>
                <StyledInput id="agreeAllChk" type="checkbox" checked={allChk} onChange={allChkEvent} />
                <label htmlFor="agreeAllChk">
                    <strong>전체약관 항목에 동의합니다.</strong>
                </label>
            </div>
            <div>
                <StyledInput id="agreeServiceChk" type="checkbox" checked={termsChk} onChange={() => setTermsChk(!termsChk)} />
                <label htmlFor="agreeServiceChk">
                    <strong>이용약관 동의 (필수)</strong>
                </label>
                <a
                    href="/"
                    className="terms-pop-link"
                    onClick={event => {
                        event.preventDefault();
                        setTermsPop(termsPopContent);
                    }}
                >
                    보기
                </a>
            </div>
            {termsPop}
            <div>
                <StyledInput id="agreePrivacyChk" type="checkbox" checked={privacyChk} onChange={() => setPrivacyChk(!privacyChk)} />
                <label htmlFor="agreePrivacyChk">
                    <strong>개인정보 수집 및 이용 동의 (필수)</strong>
                </label>
                <a
                    href="/"
                    className="privacy-pop-link"
                    onClick={event => {
                        event.preventDefault();
                        setPrivacyPop(privacyPopContent);
                    }}
                >
                    보기
                </a>
            </div>
            {privacyPop}
        </div>
    );
}

function Form() {
    return (
        <form className="join-form" method="post" action="#">
            <div className="input-container">
                <input type="text" placeholder="이메일" />
                <input type="password" placeholder="비밀번호" />
                <input type="password" placeholder="비밀번호 확인" />
                <input type="text" placeholder="이름" />
                <div className="flex">
                    <input type="text" placeholder="핸드폰번호" />
                    <button type="button" className="small-txt radius-style-btn">
                        인증번호 요청
                    </button>
                </div>
                <input type="text" placeholder="인증번호 6자리 입력" />
            </div>
            <Agree />
            <div className="join-btn-wrap">
                <button className="join-btn">가입하기</button>
            </div>
        </form>
    );
}

function Main() {
    return (
        <main>
            <div className="join-container middle-container">
                <h1 className="join-title">SIGN UP</h1>
                <Form></Form>
            </div>
        </main>
    );
}

function Join() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Join;
