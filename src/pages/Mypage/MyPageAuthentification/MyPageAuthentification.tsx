import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, signedInUser } from "../../../firebase";

function MyPageAuthentification() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleAuth = () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(signedInUser, password);

        reauthenticateWithCredential(user, credential)
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
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAuth();
        }
    };

    return (
        <>
            <main className="middle-main">
                <div className="middle-container">
                    <h1 className="section-title">비밀번호 확인</h1>
                    <form className="auth-form">
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
                                onKeyPress={handleKeyPress}
                            />
                            <p className="error-msg">{errorMsg}</p>
                        </div>
                        <div className="btn-wrap">
                            <button type="button" className="auth-btn" onClick={handleAuth}>
                                확인
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default MyPageAuthentification;
