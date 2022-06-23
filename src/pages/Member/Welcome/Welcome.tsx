import "./Welcome.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

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

function Welcome() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Welcome;
