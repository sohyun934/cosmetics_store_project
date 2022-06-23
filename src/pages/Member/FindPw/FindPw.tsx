import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

function Main() {
    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="find-title">FIND PW</h1>
                <form className="find-form">
                    <div className="input-container">
                        <div className="input-wrap">
                            <input id="userName" type="text" placeholder="이름" />
                        </div>
                        <div className="input-wrap">
                            <input id="userEmail" type="text" placeholder="이메일" />
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button className="find-btn" style={{ marginTop: "20px" }}>
                            이메일 인증
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

function FindId() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default FindId;
