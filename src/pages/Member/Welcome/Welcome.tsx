import "./Welcome.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Main() {
    return (
        <main className="middle-main">
            <div className="middle-container welcome-container">
                <h2>THE NATURAL 회원이 되신 것을</h2>
                <h2>환영합니다!</h2>
                <div className="btn-wrap">
                    <Link to="/" className="move-btn">
                        쇼핑하러 가기
                    </Link>
                </div>
            </div>
        </main>
    );
}

interface CustomizedState {
    join: string;
}

function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;

    useEffect(() => {
        if (!state) {
            // url로 직접 접속하는 경우 메인페이지로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/");
        }
    });

    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Welcome;
