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
                        <img src={require("../../../assets/product/skin/skin01.jpg")} alt="스킨케어01" />
                        <button className="wish-btn"></button>
                    </div>
                    <div className="info">
                        <div className="name">
                            <strong>알로에 하이펙티브 세럼 40%</strong>
                        </div>
                        <div className="price">
                            <strong>33,000원</strong>
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
                    <h1>SKIN CARE</h1>
                    <p>건강한 피부를 만드는 스킨케어를 만나보세요</p>
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

function Skin() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Skin;
