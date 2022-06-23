import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MoveTop from "../../../components/MoveTop/MoveTop";
import { Link } from "react-router-dom";

function Main() {
    const products = [];

    for (let i = 0; i < 12; i++) {
        products.push(
            <li key={i} className="product">
                <Link to="/detail">
                    <div className="thumb">
                        <img src={require("../../../assets/product/body/body01.jpg")} alt="바디케어01" />
                        <button className="wish-btn"></button>
                    </div>
                    <div className="info">
                        <div className="name">
                            <strong>임브레이스 바디워시 네롤리 & 패츌리 300ML</strong>
                        </div>
                        <div className="price">
                            <strong>28,000원</strong>
                        </div>
                    </div>
                </Link>
                <div className="util-btn-container">
                    <button className="cart-btn gray-style-btn">
                        <span>CART</span>
                    </button>
                </div>
            </li>
        );
    }

    return (
        <main>
            <section className="product-section">
                <div className="section-title">
                    <h1>BODY CARE</h1>
                    <p>일상의 무게를 줄여주는 바디케어를 경험해보세요</p>
                </div>
                <div className="list-filter">
                    <select>
                        <option value="new">등록순</option>
                        <option value="rank">판매순</option>
                        <option value="low-price">낮은가격순</option>
                        <option value="high-price">높은가격순</option>
                    </select>
                </div>
                <ul className="product-list flex">{products}</ul>
            </section>
            <MoveTop />
        </main>
    );
}

function Body() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Body;
