import "../../styles/style.css";
import "./Header.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

function LeftGnb() {
    return (
        <nav className="header-gnb-left">
            <ul>
                <li>
                    <Link to="/new">신제품</Link>
                </li>
                <li>
                    <Link to="/best">베스트</Link>
                </li>
                <li>
                    <Link to="/hair">헤어케어</Link>
                </li>
                <li>
                    <Link to="/skin">스킨케어</Link>
                </li>
                <li>
                    <Link to="/body">바디케어</Link>
                </li>
            </ul>
        </nav>
    );
}

type Prop = {
    activeSideGnb: Function;
};

function SideGnbBtn(props: Prop) {
    return (
        <button className="side-gnb-btn" onClick={() => props.activeSideGnb()}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </button>
    );
}

type SideGnbProp = {
    logInOut: string;
    logOut: Function;
};

function SideGnb(props: SideGnbProp) {
    const navigate = useNavigate();

    return (
        <nav className="side-gnb">
            <ul>
                <li>
                    <Link to="/new">신제품</Link>
                </li>
                <li>
                    <Link to="/best">베스트</Link>
                </li>
                <li>
                    <Link to="/hair">헤어케어</Link>
                </li>
                <li>
                    <Link to="/skin">스킨케어</Link>
                </li>
                <li>
                    <Link to="/body">바디케어</Link>
                </li>
                <li>
                    <button
                        className="border-style-btn"
                        style={{ marginTop: "20px" }}
                        onClick={e => {
                            props.logInOut === "로그아웃" ? props.logOut(e) : navigate("/login");
                        }}
                    >
                        {props.logInOut}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

type RightGnbProp = {
    logOutDisplay: string;
    logOut: Function;
};

function RightGnb(props: RightGnbProp) {
    return (
        <nav className="header-gnb-right">
            <ul className="flex">
                <li style={{ display: props.logOutDisplay }}>
                    <a href="/" onClick={e => props.logOut(e)} style={{ verticalAlign: "middle" }}>
                        LOGOUT
                    </a>
                </li>
                <li>
                    <Link to={props.logOutDisplay === "none" ? "/login" : "/mypage/myPageAuthentification"}>
                        <img src={require("../../assets/common/mypage.png")} alt="마이페이지" />
                    </Link>
                </li>
                <li>
                    <Link to="/mypage/cart">
                        <img src={require("../../assets/common/cart.png")} alt="장바구니" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

function Header() {
    const [toggle, setToggle] = useState(false);
    const [logInOut, setLogInOut] = useState("로그인");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                // User is signed in
                setLogInOut("로그아웃");
            }
        });
    }, []);

    function logOut(e) {
        e.preventDefault();

        signOut(auth)
            .then(() => {
                if (toggle) setToggle(false);
                setLogInOut("로그인");
            })
            .catch(error => {
                alert("로그아웃 과정 중에 오류가 발생했습니다.\n" + error.message);
            });
    }

    return (
        <header className={toggle ? "header side-active" : "header"}>
            <LeftGnb />
            <SideGnbBtn activeSideGnb={() => setToggle(!toggle)} />
            <SideGnb logInOut={logInOut} logOut={e => logOut(e)} />
            <div className="logo">
                <Link to="/">
                    <img src={require("../../assets/common/logo.png")} alt="로고" />
                </Link>
            </div>
            <RightGnb logOutDisplay={logInOut === "로그인" ? "none" : "block"} logOut={e => logOut(e)} />
        </header>
    );
}

export default Header;
