import "./Join.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PrivacyPolicyDetail } from "../../PrivacyPolicy/PrivacyPolicy";
import { TermsOfUseDetail } from "../../TermsOfUse/TermsOfUse";
import { SubmitHandler, useForm } from "react-hook-form";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signOut } from "firebase/auth";

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

type PopProp = {
    closePop: Function;
};

function TermsPop(props: PopProp) {
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

function PrivacyPop(props: PopProp) {
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

type Prop = {
    allChk: Function;
};

function Agree(props: Prop) {
    const [checkList, setCheckList] = useState([]);
    const [termsPop, setTermsPop] = useState<null | JSX.Element>(null);
    const [privacyPop, setPrivacyPop] = useState<null | JSX.Element>(null);

    const termsPopContent = <TermsPop closePop={() => setTermsPop(null)} />;
    const privacyPopContent = <PrivacyPop closePop={() => setPrivacyPop(null)} />;

    // 체크박스 단일 선택
    const handleSingleCheck = (isChecked: boolean, checkItem: string) => {
        if (isChecked) {
            setCheckList(checkList => [...checkList, checkItem]);
        } else {
            setCheckList(checkList => checkList.filter(el => el !== checkItem));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (isChecked: boolean) => {
        if (isChecked) {
            setCheckList(["termsOfService", "privacy"]);
        } else {
            setCheckList([]);
        }
    };

    useEffect(() => {
        props.allChk(checkList.length === 2);
    }, [checkList, props]);

    return (
        <div className="agree-container small-txt">
            <div>
                <StyledInput
                    id="agreeAllChk"
                    type="checkbox"
                    checked={checkList.length === 2 ? true : false}
                    onChange={e => handleAllCheck(e.target.checked)}
                />
                <label htmlFor="agreeAllChk">
                    <strong>전체약관 항목에 동의합니다.</strong>
                </label>
            </div>
            <div>
                <StyledInput
                    id="agreeServiceChk"
                    type="checkbox"
                    checked={checkList.includes("termsOfService") ? true : false}
                    onChange={e => handleSingleCheck(e.target.checked, "termsOfService")}
                />
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
                <StyledInput
                    id="agreePrivacyChk"
                    type="checkbox"
                    checked={checkList.includes("privacy") ? true : false}
                    onChange={e => handleSingleCheck(e.target.checked, "privacy")}
                />
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
        formState: { errors, isValid },
        getValues,
        setError,
        setValue,
        watch
    } = useForm<Inputs>({ mode: "onChange" });

    const email = watch("email");
    const password = getValues("password");
    const authCode = watch("authCode");

    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    const regExpPhoneNumber = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    const [emailSuccessMsg, setEmailSuccessMsg] = useState("none");
    const [codeInputDisplay, setCodeInputDisplay] = useState("none");
    const [authSuccessMsg, setAuthSucessMsg] = useState("none");
    const [allChk, setAllChk] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    // 이메일 중복 확인
    const fetchUser = async () => {
        const q = query(collection(db, "users"), where("email", "==", getValues("email")));
        const userSnapshot = await getDocs(q);
        return userSnapshot.size > 0;
    };

    useEffect(() => {
        if (email) {
            if (!errors.email?.type) {
                setEmailSuccessMsg("block");
            } else {
                setEmailSuccessMsg("none");
            }
        }
    }, [email, errors.email?.type]);

    // 휴대폰 인증 번호 전송
    const handlePhoneAuth = () => {
        const phoneNumber = getValues("phoneNumber");

        if (!phoneNumber) {
            trigger("phoneNumber");
        } else if (!errors.phoneNumber?.type) {
            if (!window.recaptchaVerifier) {
                // 인증 번호 최초 요청 시
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "authCodeBtn",
                    {
                        size: "invisible",
                        callback: (response: any) => {
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
    };

    // 휴대폰 인증 번호 검증
    useEffect(() => {
        // 인증 번호 요청 후 검증 시작
        if (window.confirmationResult) {
            if (authCode.length !== 6) {
                setAuthSucessMsg("none");
            } else {
                window.confirmationResult
                    .confirm(authCode)
                    .then((result: any) => {
                        setAuthSucessMsg("block");

                        // 인증 후 자동 로그인 해제
                        signOut(auth).then(() => {});
                    })
                    .catch((error: { code: string }) => {
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
    }, [authCode, setError]);

    // 신규 회원 데이터 create
    useEffect(() => {
        if (isValid && allChk) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isValid, allChk]);

    const onSubmit: SubmitHandler<Inputs> = data => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                await addDoc(collection(db, "users"), {
                    email: data.email,
                    name: data.name,
                    phoneNumber: data.phoneNumber
                });

                window.recaptchaVerifier = null;
                window.confirmationResult = null;

                navigate("/member/welcome", {
                    replace: true,
                    state: { join: "complete" }
                });
            })
            .catch(error => {
                alert("가입 과정 중 오류가 발생했습니다.\n" + error.message);
            });
    };

    return (
        <form className="join-form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="이메일"
                    {...register("email", {
                        required: true,
                        pattern: regExpEmail,
                        validate: async () => (await fetchUser()) === false
                    })}
                />
                {errors.email?.type === "required" && <p className="error-msg">이메일을 입력해 주세요.</p>}
                {errors.email?.type === "pattern" && <p className="error-msg">유효하지 않은 이메일 형식입니다.</p>}
                {errors.email?.type === "validate" && <p className="error-msg">이미 존재하는 이메일입니다.</p>}
                <p className="success-msg" style={{ display: emailSuccessMsg }}>
                    사용 가능한 이메일입니다.
                </p>
                <input
                    type="password"
                    placeholder="비밀번호"
                    {...register("password", {
                        required: true,
                        pattern: regExpPw,
                        minLength: 8,
                        maxLength: 16,
                        validate: () => trigger("confirmPw")
                    })}
                />
                {errors.password?.type === "required" && <p className="error-msg">비밀번호를 입력해 주세요.</p>}
                {(errors.password?.type === "pattern" || errors.password?.type === "minLength" || errors.password?.type === "maxLength") && (
                    <p className="error-msg">8~16자 이내로 영문, 숫자, 특수문자를 포함하여 입력해 주세요.</p>
                )}
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register("confirmPw", {
                        validate: value => value === getValues("password")
                    })}
                />
                {errors.confirmPw && <p className="error-msg">비밀번호가 일치하지 않습니다.</p>}
                <input
                    type="text"
                    placeholder="이름"
                    {...register("name", {
                        required: true
                    })}
                />
                {errors.name && <p className="error-msg">이름을 입력해 주세요.</p>}
                <div className="flex">
                    <input
                        type="text"
                        placeholder="휴대폰 번호"
                        {...register("phoneNumber", {
                            required: true,
                            pattern: regExpPhoneNumber
                        })}
                    />
                    <button id="authCodeBtn" type="button" className="small-txt radius-style-btn" onClick={handlePhoneAuth}>
                        인증번호 요청
                    </button>
                </div>
                {errors.phoneNumber?.type === "required" && <p className="error-msg">휴대폰 번호를 입력해주세요.</p>}
                {errors.phoneNumber?.type === "pattern" && <p className="error-msg">휴대폰 번호가 유효하지 않습니다.</p>}
                {errors.phoneNumber && <p className="error-msg">{errors.phoneNumber.message}</p>}
                <p className="success-msg" style={{ display: codeInputDisplay === "none" ? "none" : "block" }}>
                    인증번호가 발송되었습니다.
                </p>
                <div style={{ display: codeInputDisplay }}>
                    <div className="flex">
                        <input type="text" placeholder="인증번호 6자리 입력" {...register("authCode", { validate: value => value.length === 6 })} />
                    </div>
                    {errors.authCode?.type === "validate" && <p className="error-msg">인증번호 6자리를 입력해주세요.</p>}
                    {errors.authCode && <p className="error-msg">{errors.authCode.message}</p>}
                    <p className="success-msg" style={{ display: authSuccessMsg }}>
                        인증번호가 일치합니다.
                    </p>
                </div>
            </div>
            <Agree allChk={(allChk: boolean) => setAllChk(allChk)} />
            <div className="join-btn-wrap">
                <button className={"join-btn"} disabled={disabled}>
                    가입하기
                </button>
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
