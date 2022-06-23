import "./OrderList.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import { Link } from "react-router-dom";
import React from "react";

function SearchSection() {
    let onBtn: null | HTMLButtonElement = null;
    const btns = [];
    const btnTitles = ["1개월", "3개월", "6개월", "12개월"];

    function searchPeriod(e: React.MouseEvent) {
        if (onBtn !== null) onBtn.classList.remove("on-btn");
        let clickBtn = e.target as HTMLButtonElement;
        clickBtn.classList.add("on-btn");
        onBtn = clickBtn;
    }

    for (let i = 0; i < btnTitles.length; i++) {
        btns.push(
            <button key={i} className="radius-style-btn" onClick={searchPeriod}>
                {btnTitles[i]}
            </button>
        );
    }

    return (
        <section className="search-section flex">
            <span className="small-txt">구매기간</span>
            <div className="section-inner-left">
                <span className="select-month">{btns}</span>
            </div>
            <div className="section-inner-right">
                <input className="history-start-date small-txt" type="date" />
                ~
                <input className="history-end-date small-txt" type="date" />
                <span className="btn-wrap">
                    <button className="search-btn small-txt">조회</button>
                </span>
            </div>
        </section>
    );
}

function Table() {
    return (
        <table className="order-table">
            <thead>
                <tr>
                    <th>주문일자</th>
                    <th colSpan={2}>상품</th>
                    <th>수량</th>
                    <th>금액</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr className="order-item">
                    <td className="order-date" rowSpan={2}>
                        2022.05.17
                        <div className="order-num"></div>
                        <Link to="/mypage/orderDetail">상세보기</Link>
                    </td>
                    <td className="order-item-thumb">
                        <Link to="/detail">
                            <img src={require("../../../assets/product/new/new02.jpg")} alt="신제품02" />
                        </Link>
                    </td>
                    <td className="order-item-name">
                        <Link to="/detail">티트리 스칼프 스케일링 샴푸 바 135G</Link>
                    </td>
                    <td className="order-amount">1</td>
                    <td className="order-price">22,000원</td>
                    <td className="order-status">
                        <strong>주문완료</strong>
                    </td>
                </tr>
                <tr className="order-item">
                    <td className="order-item-thumb">
                        <Link to="/detail">
                            <img src={require("../../../assets/product/new/new02.jpg")} alt="신제품02" />
                        </Link>
                    </td>
                    <td className="order-item-name">
                        <Link to="/detail">티트리 스칼프 스케일링 샴푸 바 135G</Link>
                    </td>
                    <td className="order-amount">1</td>
                    <td className="order-price">22,000원</td>
                    <td className="order-status">
                        <strong>주문완료</strong>
                    </td>
                </tr>
                <tr className="order-item">
                    <td className="order-date">
                        2022.05.17
                        <div className="order-num"></div>
                        <Link to="/mypage/orderDetail">상세보기</Link>
                    </td>
                    <td className="order-item-thumb">
                        <Link to="/detail">
                            <img src={require("../../../assets/product/new/new02.jpg")} alt="신제품02" />
                        </Link>
                    </td>
                    <td className="order-item-name">
                        <Link to="/detail">티트리 스칼프 스케일링 샴푸 바 135G</Link>
                    </td>
                    <td className="order-amount">1</td>
                    <td className="order-price">22,000원</td>
                    <td className="order-status">
                        <strong>주문완료</strong>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function Main() {
    return (
        <main>
            <div className="order-list big-container">
                <h1>MYPAGE</h1>
                <Lnb title="orderList" />
                <SearchSection />
                <Table />
            </div>
        </main>
    );
}

function OrderList() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default OrderList;
