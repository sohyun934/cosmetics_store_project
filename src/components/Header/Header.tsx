import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

type LeftNavBarProp = {
    navList: any[];
    isLogined: boolean;
    logOut: Function;
    closeGnb: Function;
    toggleSideGnb: Function;
};

const LeftNavBar = (props: LeftNavBarProp) => {
    const navigate = useNavigate();

    const navList = props.navList;
    const navItems = navList.map(navItem => (
        <li key={navItem.title}>
            <Link to={navItem.link_to}>{navItem.title}</Link>
        </li>
    ));

    const isLogined = props.isLogined;
    const logOut = props.logOut;
    const closeGnb = props.closeGnb;
    const toggleSideGnb = props.toggleSideGnb;

    const handleLog = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLogined) {
            logOut(e);
        } else {
            navigate("/login", { state: { moveTo: -1 } });
        }
        closeGnb();
    };

    return (
        <>
            <nav className="header-gnb-left">
                <ul>{navItems}</ul>
            </nav>
            <button className="side-gnb-btn" aria-label="navigation menu" onClick={() => toggleSideGnb()}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
            <nav className="side-gnb">
                <ul>
                    {navItems}
                    <li>
                        <button className="border-style-btn" style={{ marginTop: "20px" }} onClick={handleLog}>
                            {isLogined ? "로그아웃" : "로그인"}
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

type RightNavBarProp = {
    isLogined: boolean;
    logOut: Function;
};

const RightNavBar = (props: RightNavBarProp) => {
    const logOut = props.logOut;
    const isLogined = props.isLogined;

    return (
        <nav className="header-gnb-right">
            <ul className="flex">
                {isLogined && (
                    <li>
                        <a href="/" onClick={e => logOut(e)} style={{ verticalAlign: "middle" }}>
                            LOGOUT
                        </a>
                    </li>
                )}
                <li>
                    <Link to={isLogined ? "/mypage/myPageAuthentification" : "/login"} state={{ moveTo: "/" }}>
                        <img src={require("../../assets/common/mypage.png")} alt="마이페이지" />
                    </Link>
                </li>
                <li>
                    <Link to={isLogined ? "/mypage/cart" : "/login"} state={{ moveTo: "/mypage/cart" }}>
                        <img src={require("../../assets/common/cart.png")} alt="장바구니" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const Header = () => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const navList = [
        { link_to: "/hair", title: "헤어케어" },
        { link_to: "/skin", title: "스킨케어" },
        { link_to: "/body", title: "바디케어" }
    ];

    const [toggle, setToggle] = useState(false);
    const [isLogined, setIsLogined] = useState(false);

    useEffect(() => {
        if (toggle) {
            setToggle(false);
        }
    }, [pathname]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsLogined(true);
            } else {
                // 로그아웃, 세션 종료 시
                setIsLogined(false);
            }
        });
    }, []);

    const logOut = (e: React.MouseEvent) => {
        e.preventDefault();

        signOut(auth)
            .then(() => {
                // 마이페이지, 주문 페이지에서 로그아웃 시 메인 페이지로 이동
                if (pathname.indexOf("mypage") !== -1 || pathname.indexOf("order") !== -1) navigate("/", { replace: true });
            })
            .catch(error => {
                alert("로그아웃 과정 중에 오류가 발생했습니다.\n" + error.message);
            });
    };

    return (
        <header className={toggle ? "header side-active" : "header"}>
            <LeftNavBar navList={navList} isLogined={isLogined} logOut={logOut} closeGnb={() => setToggle(false)} toggleSideGnb={() => setToggle(!toggle)} />
            <div className="logo">
                <Link to="/">
                    <img src={require("../../assets/common/logo.png")} alt="로고" />
                </Link>
            </div>
            <RightNavBar isLogined={isLogined} logOut={logOut} />
        </header>
    );
};

export default Header;
