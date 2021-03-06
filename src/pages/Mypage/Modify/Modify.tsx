import "./Modify.css";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import { SubmitHandler, useForm } from "react-hook-form";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import { deleteUser, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, updatePassword, User } from "firebase/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

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
        reset
    } = useForm<Inputs>({ mode: "onChange" });

    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;
    const [userPw, setUserPw] = useState(state.password);

    const fetchUser = async (user: User) => {
        const q = query(collection(db, "users"), where("email", "==", user.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();

            setUserState({
                name: user.name,
                email: user.email,
                phoneNumber: user.phone_number,
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

    // ?????? ???????????? API
    const handleComplete = data => {
        let addr = "";

        // ???????????? ????????? ????????? ???????????? ??????
        if (data.userSelectedType === "R") addr = data.roadAddress;
        // ???????????? ?????? ????????? ???????????? ??????(J)
        else addr = data.jibunAddress;

        setUserState(userState => ({ ...userState, postCode: data.zonecode, address: addr }));
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, userPw);

        if (user) {
            // ???????????? ????????????
            reauthenticateWithCredential(user, credential).then(() => {
                const updatePw = getValues("password");

                updatePassword(user, updatePw);
                setUserPw(updatePw);
            });

            // ???????????? ????????????
            const q = query(collection(db, "users"), where("email", "==", user.email));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async document => {
                const userRef = doc(db, "users", document.id);

                await updateDoc(userRef, {
                    post_code: userState.postCode,
                    address: userState.address,
                    detail_address: userState.detailAddress
                }).then(() => {
                    reset({
                        password: "",
                        confirmPw: ""
                    });
                    alert("???????????? ????????? ?????????????????????.");
                });
            });
        } else {
            navigate("/", { replace: true });
        }
    };

    const handleUserDelete = e => {
        e.preventDefault();

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, userPw);

        if (user) {
            reauthenticateWithCredential(user, credential).then(() => {
                if (window.confirm("?????? ?????????????????????????")) {
                    const auth = getAuth();
                    const user = auth.currentUser;

                    deleteUser(user)
                        .then(async () => {
                            const q = query(collection(db, "users"), where("email", "==", user.email));

                            const querySnapshot = await getDocs(q);
                            querySnapshot.forEach(async document => {
                                await deleteDoc(doc(db, "users", document.id));
                            });

                            alert("????????? THE NATURAL??? ?????????????????? ???????????????.");
                            navigate("/");
                        })
                        .catch(error => {
                            alert("?????? ?????? ?????? ????????? ??????????????????.\n" + error.message);
                        });
                }
            });
        }
    };

    return (
        <form className="modify-form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
                <StyledInput type="text" placeholder="?????????" value={userState.email} readOnly />
                <input
                    type="password"
                    placeholder="????????????"
                    {...register("password", {
                        required: true,
                        pattern: regExpPw,
                        minLength: 8,
                        maxLength: 16
                    })}
                />
                {errors.password?.type === "required" && <p className="error-msg">??????????????? ????????? ?????????.</p>}
                {(errors.password?.type === "pattern" || errors.password?.type === "minLength" || errors.password?.type === "maxLength") && (
                    <p className="error-msg">8~16??? ????????? ??????, ??????, ??????????????? ???????????? ????????? ?????????.</p>
                )}
                <input
                    type="password"
                    placeholder="???????????? ??????"
                    {...register("confirmPw", {
                        validate: value => value === getValues("password")
                    })}
                />
                {errors.confirmPw && <p className="error-msg">??????????????? ???????????? ????????????.</p>}
                <StyledInput type="text" value={userState.name} readOnly />
                <StyledInput type="text" value={userState.phoneNumber} readOnly />
                <div className="postcode-wrap">
                    <StyledInput
                        className="userPostcode"
                        type="text"
                        placeholder="????????????"
                        value={userState.postCode || ""}
                        onChange={e => setUserState(userState => ({ ...userState, postCode: e.target.value }))}
                        readOnly
                    />
                    <button type="button" className="search-btn" onClick={handleClick}></button>
                </div>
                <StyledInput
                    className="userAddress"
                    type="text"
                    placeholder="?????? ??????"
                    value={userState.address || ""}
                    onChange={e => setUserState(userState => ({ ...userState, address: e.target.value }))}
                    readOnly
                />
                <input
                    className="userDetailAddress"
                    type="text"
                    placeholder="?????? ??????"
                    value={userState.detailAddress || ""}
                    onChange={e => setUserState(userState => ({ ...userState, detailAddress: e.target.value }))}
                />
            </div>
            <div className="btn-wrap">
                <button className="modify-btn" disabled={!isValid}>
                    ??????????????????
                </button>
            </div>
            <div className="member-leave small-txt">
                <a href="/" onClick={e => handleUserDelete(e)}>
                    ????????????
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
            // ???????????? ????????? ????????? ?????? ??????
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
