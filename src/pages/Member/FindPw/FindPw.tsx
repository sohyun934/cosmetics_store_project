import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db, auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function Main() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [successMsg, setSuccessMsg] = useState("none");
    const [errorMsg, setErrorMsg] = useState("none");

    async function fetchUser() {
        const q = query(collection(db, "users"), where("name", "==", name), where("email", "==", email));
        const userSnapshot = await getDocs(q);

        if (userSnapshot.size > 0) {
            setErrorMsg("none");

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    setSuccessMsg("block");
                })
                .catch(error => {
                    setSuccessMsg("none");
                    alert("이메일 발송 중에 오류가 발생했습니다.\n" + error.message);
                });
        } else {
            setErrorMsg("block");
        }
    }

    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="find-title">FIND PW</h1>
                <form className="find-form">
                    <div className="input-container">
                        <div className="input-wrap">
                            <input id="userName" type="text" placeholder="이름" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="input-wrap">
                            <input id="userEmail" type="text" placeholder="이메일" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <p className="success-msg" style={{ display: successMsg }}>
                            비밀번호 재설정을 위한 이메일이 발송되었습니다.
                        </p>
                        <p className="error-msg" style={{ display: errorMsg }}>
                            입력한 정보와 일치하는 계정이 없습니다.
                        </p>
                    </div>
                    <div className="btn-wrap">
                        <button type="button" className="find-btn" style={{ marginTop: "20px" }} onClick={fetchUser} disabled={successMsg === "block" ? true : false}>
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
