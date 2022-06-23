import "./WishList.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import { Link } from "react-router-dom";

function Util() {
    return (
        <div className="util-container flex">
            <span className="num">
                <strong>전체 2개</strong>
            </span>
            <div className="btn-wrap">
                <button className="all-del-btn radius-style-btn">전체 삭제</button>
            </div>
        </div>
    );
}

function Table() {
    return (
        <table className="wish-list">
            <thead>
                <tr>
                    <th colSpan={2}>상품</th>
                    <th>가격</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                <tr className="wish-item">
                    <td className="thumb">
                        <Link to="/detail">
                            <img src={require("../../../assets/product/new/new02.jpg")} alt="신제품02" />
                        </Link>
                    </td>
                    <td className="name">
                        <Link to="/detail">로즈마리 스칼프 스케일링 샴푸 바 135G</Link>
                    </td>
                    <td className="price">22,000원</td>
                    <td className="util-btn-container">
                        <div>
                            <button className="radius-style-btn">장바구니</button>
                        </div>
                        <div>
                            <button className="radius-style-btn">삭제</button>
                        </div>
                    </td>
                </tr>
                <tr className="wish-item">
                    <td className="thumb">
                        <Link to="/detail">
                            <img src={require("../../../assets/product/new/new03.jpg")} alt="신제품03" />
                        </Link>
                    </td>
                    <td className="name">
                        <Link to="/detail">로즈마리 스칼프 스케일링 샴푸 바 135G</Link>
                    </td>
                    <td className="price">22,000원</td>
                    <td className="util-btn-container">
                        <div>
                            <button className="radius-style-btn">장바구니</button>
                        </div>
                        <div>
                            <button className="radius-style-btn">삭제</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function Main() {
    return (
        <main>
            <div className="big-container">
                <h1>MYPAGE</h1>
                <Lnb title="wishList" />
                <section className="wish-section">
                    <Util />
                    <Table />
                </section>
            </div>
        </main>
    );
}

function WishList() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default WishList;
