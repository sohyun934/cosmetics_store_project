import "./Login.css";
import { Link, To, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

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
                    setErrorMsg("이메일을 입력해주세요.");
                } else if (errorCode === "auth/internal-error") {
                    setErrorMsg("비밀번호를 입력해주세요.");
                } else if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                    setErrorMsg("이메일 또는 비밀번호가 일치하지 않습니다.");
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
                        <input type="text" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>
                    <div className="input-wrap">
                        <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
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
                    <input id="saveUserId" type="checkbox" value="" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
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

function Login() {
    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="login-title">SIGN IN</h1>
                <FormAndUtil />
            </div>
        </main>
    );
}

export default Login;
