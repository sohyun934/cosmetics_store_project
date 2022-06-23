import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MoveTop from "../../../components/MoveTop/MoveTop";
import { useState } from "react";
import { Link } from "react-router-dom";

function Main() {
    const products = [];
    const [wishToggle, setWishToggle] = useState(false);

    for (let i = 0; i < 12; i++) {
        products.push(
            <li key={i} className="product">
                <Link to="/detail">
                    <div className="thumb">
                        <img src={require("../../../assets/product/hair/hair01.jpg")} alt="헤어케어01" />
                        <button className={wishToggle ? "wish-btn on " : "wish-btn"} onClick={() => setWishToggle(!wishToggle)}></button>
                    </div>
                    <div className="info">
                        <div className="name">
                            <strong>로즈마리 스칼프 스케일링 샴푸 1L</strong>
                        </div>
                        <div className="price">
                            <strong>42,000원</strong>
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
                    <h1>HAIR CARE</h1>
                    <p>다양한 헤어케어를 경험해보세요</p>
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

function Hair() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Hair;
