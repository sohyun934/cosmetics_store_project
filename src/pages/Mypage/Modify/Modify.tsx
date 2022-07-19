import "./Modify.css";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import { SubmitHandler, useForm } from "react-hook-form";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db, signedInUser } from "../../../firebase";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, User, UserCredential } from "firebase/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

type Prop = {
    email: string;
    name: string;
    mobile: string;
    postCode: string;
    address: string;
    detailAddress: string;
};

interface Inputs {
    password: string;
    confirmPw: string;
}

interface CustomizedState {
    password: string;
    user: User;
    userCredential: UserCredential;
}

const StyledInput = styled.input`
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;

function Form(props: Prop) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [disabled, setDisabled] = useState(true);

    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues
    } = useForm<Inputs>({ mode: "all" });

    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const navigate = useNavigate();
    const location = useLocation();

    async function fetchUser() {
        const q = query(collection(db, "users"), where("email", "==", signedInUser));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();

            setEmail(user.email);
            setName(user.name);
            setPhoneNumber(user.phoneNumber);
            setPostCode(user.post_code);
            setAddress(user.address);
            setDetailAddress(user.detail_address);
        });
    }

    useEffect(() => {
        // url로 직접 접속, 새로고침 시 인증 페이지로 이동
        fetchUser().catch(() => navigate("/mypage/myPageAuthentification"));
    }, []);

    // 다음 우편번호 API
    function handleComplete(data) {
        let addr = "";

        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R") addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else addr = data.jibunAddress;

        setPostCode(data.zonecode);
        setAddress(addr);
    }

    function handleClick() {
        open({ onComplete: handleComplete });
    }

    // 유효성 검증 완료 후 수정 버튼 활성화
    useEffect(() => {
        if (isValid) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isValid, errors]);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const state = location.state as CustomizedState;
        const password = state.password;

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);

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
                post_code: postCode,
                address: address,
                detail_address: detailAddress
            }).then(() => alert("회원정보가 수정되었습니다."));
        });
    };

    return (
        <form className="modify-form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <StyledInput type="text" placeholder="이메일" value={email} readOnly />
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
                <StyledInput type="text" value={name} readOnly />
                <StyledInput type="text" value={phoneNumber} readOnly />
                <div className="postcode-wrap">
                    <StyledInput
                        className="userPostcode"
                        type="text"
                        placeholder="우편번호"
                        value={postCode || ""}
                        onChange={e => setPostCode(e.target.value)}
                        readOnly
                    />
                    <button type="button" className="search-btn" onClick={handleClick}></button>
                </div>
                <StyledInput
                    className="userAddress"
                    type="text"
                    placeholder="기본 주소"
                    value={address || ""}
                    onChange={e => setAddress(e.target.value)}
                    readOnly
                />
                <input
                    className="userDetailAddress"
                    type="text"
                    placeholder="상세 주소"
                    value={detailAddress || ""}
                    onChange={event => setDetailAddress(event.target.value)}
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
