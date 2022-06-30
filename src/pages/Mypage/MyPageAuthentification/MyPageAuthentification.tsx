import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Main() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                // User is signed out
                navigate("/", { replace: true });
            }
        });
    });

    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="section-title">비밀번호 확인</h1>
                <form className="auth-form" action="#" method="post">
                    <p>개인 정보를 보호하기 위해 비밀번호를 다시 입력해 주세요.</p>
                    <div className="input-wrap" style={{ padding: "24px 0" }}>
                        <input id="userPw" type="password" placeholder="비밀번호" />
                    </div>
                    <div className="btn-wrap">
                        <button className="auth-btn">확인</button>
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
