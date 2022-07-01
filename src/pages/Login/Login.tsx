import "./Login.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
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

function FormAndUtil() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("email")) {
            setEmail(getCookie("email"));
            setIsChecked(true);
        }
    }, []);

    function getCookie(name) {
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
    }

    function setCookie(name, value, expiredays) {
        const todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";";
    }

    function logIn() {
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
                navigate("/");
            })
            .catch(error => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-email") {
                    setErrorMsg("이메일을 입력해주세요.");
                } else if (errorCode === "auth/internal-error") {
                    setErrorMsg("비밀번호를 입력해주세요.");
                } else if (errorCode === "auth/user-not-found") {
                    setErrorMsg("존재하지 않는 이메일 계정입니다.");
                } else if (errorCode === "auth/wrong-password") {
                    setErrorMsg("비밀번호가 일치하지 않습니다.");
                }
            });
    }

    return (
        <div>
            <form className="login-form" action="#" method="post">
                <div className="input-container">
                    <div className="input-wrap">
                        <input type="text" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrap">
                        <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <p className="error-msg">{errorMsg}</p>
                </div>
                <div className="btn-wrap">
                    <button type="button" className="login-btn" onClick={logIn}>
                        로그인
                    </button>
                </div>
            </form>
            <div className="util-container flex">
                <div className="id-save-wrap small-txt">
                    <StyledInput id="saveUserId" type="checkbox" value="" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="saveUserId">아이디 저장</label>
                </div>
                <div className="find-join-wrap small-txt">
                    <Link to="/member/findPw">비밀번호 찾기 | </Link>
                    <Link to="/member/join" className="join">
                        회원가입
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
