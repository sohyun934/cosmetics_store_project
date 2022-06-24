import "./Join.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PrivacyPolicyDetail } from "../../PrivacyPolicy/PrivacyPolicy";
import { TermsOfUseDetail } from "../../TermsOfUse/TermsOfUse";
import { useForm } from "react-hook-form";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../../firebase";

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

interface Inputs {
    email: string;
    password: string;
    confirmPw: string;
    name: string;
    mobileNumber: number;
    certNumber: number;
}

function Form() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, dirtyFields },
        getValues
    } = useForm<Inputs>({ mode: "onChange" });

    let display = "none";
    if (dirtyFields.email) display = "block";

    async function fetchUser() {
        const q = query(collection(db, "users"), where("email", "==", getValues("email")));
        const userSnapshot = await getDocs(q);
        return userSnapshot.size > 0;
    }

    const onSubmit = data => {};

    return (
        <form className="join-form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="이메일"
                    {...register("email", {
                        required: true,
                        pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                        validate: async () => (await fetchUser()) === false
                    })}
                />
                {errors.email?.type === "required" && <p className="errorMsg">이메일을 입력해 주세요.</p>}
                {errors.email?.type === "pattern" && <p className="errorMsg">유효하지 않은 이메일 형식입니다.</p>}
                {errors.email?.type === "validate" && <p className="errorMsg">이미 존재하는 이메일입니다.</p>}
                {errors.email?.type !== "required" && errors.email?.type !== "pattern" && errors.email?.type !== "validate" && (
                    <p style={{ marginTop: "0", color: "#008B00", display: display }}>사용 가능한 이메일입니다.</p>
                )}
                <input
                    type="password"
                    placeholder="비밀번호"
                    {...register("password", {
                        required: true,
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                        minLength: 8,
                        maxLength: 16
                    })}
                />
                {errors.password?.type === "required" && <p className="errorMsg">비밀번호를 입력해 주세요.</p>}
                {(errors.password?.type === "pattern" || errors.password?.type === "minLength" || errors.password?.type === "maxLength") && (
                    <p className="errorMsg">8~16자 이내로 영문, 숫자, 특수문자를 포함하여 입력해 주세요.</p>
                )}
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register("confirmPw", {
                        validate: value => value === String(watch("password"))
                    })}
                />
                {errors.confirmPw && <p className="errorMsg">비밀번호가 일치하지 않습니다.</p>}
                <input
                    type="text"
                    placeholder="이름"
                    {...register("name", {
                        required: true
                    })}
                />
                {errors.name && <p className="errorMsg">이름을 입력해 주세요.</p>}
                <div className="flex">
                    <input
                        type="text"
                        placeholder="핸드폰번호"
                        {...register("mobileNumber", {
                            required: true
                        })}
                    />
                    <button type="button" className="small-txt radius-style-btn">
                        인증번호 요청
                    </button>
                </div>
                {errors.mobileNumber && <p className="errorMsg">핸드폰번호를 입력해주세요.</p>}
                <input
                    type="text"
                    placeholder="인증번호 6자리 입력"
                    {...register("certNumber", {
                        required: true
                    })}
                />
                {errors.certNumber && <p className="errorMsg">인증번호를 입력해주세요.</p>}
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
