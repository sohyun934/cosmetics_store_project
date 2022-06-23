import "./OrderComplete.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

function NoticeSection() {
    return (
        <section className="notice-section">
            <h2>결제가 정상적으로 완료되었습니다.</h2>
            <div className="list-btn-wrap">
                <Link to="/" className="order-list-btn border-style-btn">
                    메인으로 돌아가기
                </Link>
            </div>
        </section>
    );
}

function OrderItemSection() {
    const trs = [];

    for (let i = 0; i < 3; i++) {
        trs.push(
            <tr key={i} className="order-item">
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
            </tr>
        );
    }

    return (
        <section className="order-item-section">
            <h3>주문 상품</h3>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>주문 정보</th>
                        <th>수량</th>
                        <th>금액</th>
                    </tr>
                </thead>
                <tbody>{trs}</tbody>
            </table>
        </section>
    );
}

function DeliverySection() {
    return (
        <section className="delivery-section">
            <h3>배송지 정보</h3>
            <table>
                <tbody>
                    <tr>
                        <th>받는분</th>
                        <td>김소현</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>010-****-0407</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            (02390)
                            <br />
                            서울 송파구 벚꽃로2길
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

function PaySection() {
    return (
        <section className="payment-section">
            <h3>결제 정보</h3>
            <table>
                <tbody>
                    <tr>
                        <th>상품 금액</th>
                        <td>29,300원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>3,000원</td>
                    </tr>
                    <tr>
                        <th>전체 금액</th>
                        <td>32,300원</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

function Main() {
    return (
        <main>
            <div className="order-detail big-container">
                <NoticeSection />
                <OrderItemSection />
                <DeliverySection />
                <PaySection />
            </div>
        </main>
    );
}

function OrderDetail() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default OrderDetail;
