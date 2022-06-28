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
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

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
    phoneNumber: string;
    authCode: string;
}

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

function Form() {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        getValues,
        setError,
        setValue,
        watch
    } = useForm<Inputs>({ mode: "onChange" });

    // 이메일 중복 확인
    const email = watch("email");
    const [emailSuccessMsg, setEmailSuccessMsg] = useState("none");

    useEffect(() => {
        if (email) {
            if (!errors.email?.type) setEmailSuccessMsg("block");
            else setEmailSuccessMsg("none");
        }
    }, [email, errors.email?.type]);

    async function fetchUser() {
        const q = query(collection(db, "users"), where("email", "==", getValues("email")));
        const userSnapshot = await getDocs(q);
        return userSnapshot.size > 0;
    }

    // 휴대폰 인증 번호 전송
    const [codeInputDisplay, setCodeInputDisplay] = useState("none");

    function getAuthCode() {
        const phoneNumber = getValues("phoneNumber");

        if (!phoneNumber) {
            trigger("phoneNumber");
        } else if (!errors.phoneNumber?.type) {
            const auth = getAuth();

            if (!window.recaptchaVerifier) {
                // 인증 번호 최초 요청 시
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "authCodeBtn",
                    {
                        size: "invisible",
                        callback: response => {
                            // reCAPTCHA solved, allow signInWithPhoneNumber.
                        }
                    },
                    auth
                );
            } else {
                // 인증 번호 재요청 시
                setValue("authCode", "");
                window.recaptchaVerifier.recaptcha.reset();
            }

            const appVerifier = window.recaptchaVerifier;

            signInWithPhoneNumber(auth, "+82" + phoneNumber, appVerifier)
                .then(confirmationResult => {
                    window.confirmationResult = confirmationResult;
                    setCodeInputDisplay("block");
                })
                .catch(error => {
                    setError("phoneNumber", {
                        type: "server",
                        message: "SMS 발송에 실패하였습니다."
                    });
                });
        }
    }

    // 휴대폰 인증 번호 검증
    const code = watch("authCode");
    const [authSuccessMsg, setAuthSucessMsg] = useState("none");

    useEffect(() => {
        // 인증 번호 요청 후 검증 시작
        if (window.confirmationResult) {
            if (code.length !== 6) {
                setAuthSucessMsg("none");
            } else {
                window.confirmationResult
                    .confirm(code)
                    .then(result => {
                        setAuthSucessMsg("block");
                    })
                    .catch(error => {
                        setAuthSucessMsg("none");

                        if (error.code === "auth/invalid-verification-code") {
                            setError("authCode", {
                                type: "confirm",
                                message: "인증번호가 일치하지 않습니다."
                            });
                        } else if (error.code === "auth/code-expired") {
                            setError("authCode", {
                                type: "expired",
                                message: "인증이 만료되었습니다. 인증번호를 다시 요청해주세요."
                            });
                        }
                    });
            }
        }
    }, [code, setError]);

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
                <p className="successMsg" style={{ display: emailSuccessMsg }}>
                    사용 가능한 이메일입니다.
                </p>
                <input
                    type="password"
                    placeholder="비밀번호"
                    {...register("password", {
                        required: true,
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                        minLength: 8,
                        maxLength: 16,
                        validate: () => trigger("confirmPw")
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
                        validate: value => value === getValues("password")
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
                        placeholder="휴대폰 번호"
                        {...register("phoneNumber", {
                            required: true,
                            pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
                        })}
                    />
                    <button id="authCodeBtn" type="button" className="small-txt radius-style-btn" onClick={getAuthCode}>
                        인증번호 요청
                    </button>
                </div>
                {errors.phoneNumber?.type === "required" && <p className="errorMsg">휴대폰 번호를 입력해주세요.</p>}
                {errors.phoneNumber?.type === "pattern" && <p className="errorMsg">휴대폰 번호가 유효하지 않습니다.</p>}
                {errors.phoneNumber && <p className="errorMsg">{errors.phoneNumber.message}</p>}
                <div style={{ display: codeInputDisplay }}>
                    <div className="flex">
                        <input type="text" placeholder="인증번호 6자리 입력" {...register("authCode", { validate: value => value.length === 6 })} />
                    </div>
                    {errors.authCode?.type === "validate" && <p className="errorMsg">인증번호 6자리를 입력해주세요.</p>}
                    {errors.authCode && <p className="errorMsg">{errors.authCode.message}</p>}
                    <p className="successMsg" style={{ display: authSuccessMsg }}>
                        인증번호가 일치합니다.
                    </p>
                </div>
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
