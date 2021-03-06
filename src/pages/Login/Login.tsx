import "./Login.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, To, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

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

interface CustomizedState {
    moveTo: To;
}

function FormAndUtil() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;
    const moveTo = state.moveTo;

    useEffect(() => {
        if (getCookie("email")) {
            setEmail(getCookie("email"));
            setIsChecked(true);
        }
    }, []);

    const getCookie = (name: string) => {
        const search = name + "=";
        if (document.cookie.length > 0) {
            let offset = document.cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length; // set index of beginning of value
                let end = document.cookie.indexOf(";", offset); // set index of end of cookie value
                if (end === -1) end = document.cookie.length;
                return unescape(document.cookie.substring(offset, end));
            }
        }
    };

    const setCookie = (name: string, value: string, expiredays: number) => {
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";";
    };

    const logIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                if (isChecked) {
                    setCookie("email", user.email, 7);
                } else {
                    setCookie("email", user.email, 0);
                }

                setErrorMsg("");
                navigate(moveTo);
            })
            .catch(error => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-email") {
                    setErrorMsg("???????????? ??????????????????.");
                } else if (errorCode === "auth/internal-error") {
                    setErrorMsg("??????????????? ??????????????????.");
                } else if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                    setErrorMsg("????????? ?????? ??????????????? ???????????? ????????????.");
                }
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            logIn();
        }
    };

    return (
        <div>
            <form className="login-form">
                <div className="input-container">
                    <div className="input-wrap">
                        <input type="text" placeholder="?????????" value={email} onChange={e => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>
                    <div className="input-wrap">
                        <input type="password" placeholder="????????????" onChange={e => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>
                    <p className="error-msg">{errorMsg}</p>
                </div>
                <div className="btn-wrap">
                    <button type="button" className="login-btn" onClick={logIn}>
                        ?????????
                    </button>
                </div>
            </form>
            <div className="util-container flex">
                <div className="id-save-wrap small-txt">
                    <StyledInput id="saveUserId" type="checkbox" value="" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="saveUserId">????????? ??????</label>
                </div>
                <div className="find-join-wrap small-txt">
                    <Link to="/member/findPw">???????????? ?????? | </Link>
                    <Link to="/member/join" className="join">
                        ????????????
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Main() {
    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="login-title">SIGN IN</h1>
                <FormAndUtil />
            </div>
        </main>
    );
}

function Login() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Login;
