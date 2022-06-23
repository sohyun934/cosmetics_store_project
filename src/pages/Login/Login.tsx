import "./Login.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

function Form() {
    return (
        <form className="login-form" action="#" method="post">
            <div className="input-container">
                <div className="input-wrap">
                    <input type="text" placeholder="이메일" />
                </div>
                <div className="input-wrap">
                    <input type="password" placeholder="비밀번호" />
                </div>
            </div>
            <div className="btn-wrap">
                <button className="login-btn">로그인</button>
            </div>
        </form>
    );
}

function Util() {
    return (
        <div className="util-container flex">
            <div className="id-save-wrap small-txt">
                <StyledInput id="saveUserId" type="checkbox" value="" />
                <label htmlFor="saveUserId">아이디 저장</label>
            </div>
            <div className="find-join-wrap small-txt">
                <Link to="/member/findPw">비밀번호 찾기 | </Link>
                <Link to="/member/join" className="join">
                    회원가입
                </Link>
            </div>
        </div>
    );
}

function Main() {
    return (
        <main className="middle-main">
            <div className="middle-container">
                <h1 className="login-title">SIGN IN</h1>
                <Form />
                <Util />
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
