import "../../styles/style.css";
import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Gnb() {
    return (
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
    );
}

function LeftGnb() {
    return (
        <nav className="header-gnb-left">
            <Gnb />
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

function SideGnb() {
    return (
        <nav className="side-gnb">
            <Gnb />
        </nav>
    );
}

function RightGnb() {
    return (
        <nav className="header-gnb-right">
            <ul className="flex">
                <li>
                    <Link to="/login">
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

    return (
        <header className={toggle ? "header side-active" : "header"}>
            <LeftGnb />
            <SideGnbBtn activeSideGnb={() => setToggle(!toggle)} />
            <SideGnb />
            <div className="logo">
                <Link to="/">
                    <img src={require("../../assets/common/logo.png")} alt="로고" />
                </Link>
            </div>
            <RightGnb />
        </header>
    );
}

export default Header;
