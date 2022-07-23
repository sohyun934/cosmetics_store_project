import "../../styles/style.css";
import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

function LeftGnb() {
    return (
        <nav className="header-gnb-left">
            <ul>
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
    isLoggedIn: boolean;
    logOut: Function;
    closeGnb: Function;
};

function SideGnb(props: SideGnbProp) {
    const isLoggedIn = props.isLoggedIn;
    const navigate = useNavigate();

    const handleLog = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoggedIn) props.logOut(e);
        else navigate("/login", { state: { moveTo: -1 } });
        props.closeGnb();
    };

    return (
        <nav className="side-gnb">
            <ul>
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
                    <button className="border-style-btn" style={{ marginTop: "20px" }} onClick={handleLog}>
                        {isLoggedIn ? "로그아웃" : "로그인"}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

type RightGnbProp = {
    isLoggedIn: boolean;
    logOut: Function;
};

function RightGnb(props: RightGnbProp) {
    const isLoggedIn = props.isLoggedIn;

    return (
        <nav className="header-gnb-right">
            <ul className="flex">
                {isLoggedIn && (
                    <li>
                        <a href="/" onClick={e => props.logOut(e)} style={{ verticalAlign: "middle" }}>
                            LOGOUT
                        </a>
                    </li>
                )}
                <li>
                    <Link to={isLoggedIn ? "/mypage/myPageAuthentification" : "/login"} state={{ moveTo: "/mypage/myPageAuthentification" }}>
                        <img src={require("../../assets/common/mypage.png")} alt="마이페이지" />
                    </Link>
                </li>
                <li>
                    <Link to={isLoggedIn ? "/mypage/cart" : "/login"} state={{ moveTo: "/mypage/cart" }}>
                        <img src={require("../../assets/common/cart.png")} alt="장바구니" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

function Header() {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [toggle, setToggle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    function logOut(e: React.MouseEvent) {
        e.preventDefault();

        signOut(auth)
            .then(() => {
                setIsLoggedIn(false);

                // 마이페이지, 주문 페이지에서 로그아웃 시 메인 페이지로 이동
                if (pathname.indexOf("mypage") !== -1 || pathname.indexOf("order") !== -1) navigate("/", { replace: true });
            })
            .catch(error => {
                alert("로그아웃 과정 중에 오류가 발생했습니다.\n" + error.message);
            });
    }

    return (
        <header className={toggle ? "header side-active" : "header"}>
            <LeftGnb />
            <SideGnbBtn activeSideGnb={() => setToggle(!toggle)} />
            <SideGnb isLoggedIn={isLoggedIn} logOut={logOut} closeGnb={() => setToggle(false)} />
            <div className="logo">
                <Link to="/">
                    <img src={require("../../assets/common/logo.png")} alt="로고" />
                </Link>
            </div>
            <RightGnb isLoggedIn={isLoggedIn} logOut={logOut} />
        </header>
    );
}

export default Header;
