import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthCredential, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, User } from "firebase/auth";
import { auth } from "../../../firebase";

function Main() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let signedInUser: User;
    let credential: AuthCredential;

    onAuthStateChanged(auth, user => {
        if (user) {
            signedInUser = user;
            credential = EmailAuthProvider.credential(user.email, password);
        }
    });

    function passwordChk() {
        reauthenticateWithCredential(signedInUser, credential)
            .then(() => {
                navigate("/mypage/modify", {
                    state: {
                        password: password
                    }
                });
            })
            .catch(error => {
                setErrorMsg("비밀번호가 일치하지 않습니다.");
            });
    }

    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="section-title">비밀번호 확인</h1>
                <form className="auth-form" action="#" method="post">
                    <p>개인 정보를 보호하기 위해 비밀번호를 다시 입력해 주세요.</p>
                    <div className="input-wrap" style={{ padding: "24px 0" }}>
                        <input
                            id="userPw"
                            type="password"
                            placeholder="비밀번호"
                            onChange={e => {
                                setPassword(e.target.value);
                                setErrorMsg("");
                            }}
                        />
                        <p className="error-msg">{errorMsg}</p>
                    </div>
                    <div className="btn-wrap">
                        <button type="button" className="auth-btn" onClick={passwordChk}>
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

function MyPageAuthentification() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default MyPageAuthentification;
