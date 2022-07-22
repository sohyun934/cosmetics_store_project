import "./Modify.css";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import { SubmitHandler, useForm } from "react-hook-form";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword, User } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

interface Inputs {
    password: string;
    confirmPw: string;
}

interface CustomizedState {
    password: string;
}

const StyledInput = styled.input`
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;

function Form() {
    const [disabled, setDisabled] = useState(true);
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        postCode: "",
        address: "",
        detailAddress: ""
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        setValue
    } = useForm<Inputs>({ mode: "onChange" });

    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const location = useLocation();
    const state = location.state as CustomizedState;
    const userPw = state.password;

    const fetchUser = async (user: User) => {
        const q = query(collection(db, "users"), where("email", "==", user.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();

            setUserState({
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                postCode: user.post_code,
                address: user.address,
                detailAddress: user.detail_address
            });
        });
    };

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                fetchUser(user);
            }
        });
    }, []);

    // 다음 우편번호 API
    const handleComplete = data => {
        let addr = "";

        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R") addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else addr = data.jibunAddress;

        setUserState(userState => ({ ...userState, postCode: data.zonecode, address: addr }));
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    // 유효성 검증 완료 후 수정 버튼 활성화
    useEffect(() => {
        if (isValid) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isValid, errors]);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, userPw);

        // 비밀번호 업데이트
        reauthenticateWithCredential(user, credential).then(() => {
            updatePassword(user, getValues("password"));
        });

        // 회원정보 업데이트
        const q = query(collection(db, "users"), where("email", "==", user.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async document => {
            const userRef = doc(db, "users", document.id);

            await updateDoc(userRef, {
                post_code: userState.postCode,
                address: userState.address,
                detail_address: userState.detailAddress
            }).then(() => {
                setValue("password", "");
                setValue("confirmPw", "");
                alert("회원정보 수정이 완료되었습니다.");
            });
        });
    };

    return (
        <form className="modify-form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <StyledInput type="text" placeholder="이메일" value={userState.email} readOnly />
                <input
                    type="password"
                    placeholder="비밀번호"
                    {...register("password", {
                        required: true,
                        pattern: regExpPw,
                        minLength: 8,
                        maxLength: 16
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
                <StyledInput type="text" value={userState.name} readOnly />
                <StyledInput type="text" value={userState.phoneNumber} readOnly />
                <div className="postcode-wrap">
                    <StyledInput
                        className="userPostcode"
                        type="text"
                        placeholder="우편번호"
                        value={userState.postCode || ""}
                        onChange={e => setUserState(userState => ({ ...userState, postCode: e.target.value }))}
                        readOnly
                    />
                    <button type="button" className="search-btn" onClick={handleClick}></button>
                </div>
                <StyledInput
                    className="userAddress"
                    type="text"
                    placeholder="기본 주소"
                    value={userState.address || ""}
                    onChange={e => setUserState(userState => ({ ...userState, address: e.target.value }))}
                    readOnly
                />
                <input
                    className="userDetailAddress"
                    type="text"
                    placeholder="상세 주소"
                    value={userState.detailAddress || ""}
                    onChange={e => setUserState(userState => ({ ...userState, detailAddress: e.target.value }))}
                />
            </div>
            <div className="btn-wrap">
                <button className="modify-btn" disabled={disabled}>
                    회원정보수정
                </button>
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
                    <Form />
                </div>
            </div>
        </main>
    );
}

function Modify() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;

    useEffect(() => {
        if (!state) {
            // 비밀번호 인증을 거치지 않은 경우
            navigate("/mypage/myPageAuthentification");
        }
    });

    return (
        <>
            {state && (
                <div>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            )}
        </>
    );
}

export default Modify;
