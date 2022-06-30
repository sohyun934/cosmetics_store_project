import "./OrderDetail.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ReviewPop from "../../../components/ReviewPop/ReviewPop";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

function DetailSection() {
    return (
        <section className="detail-section">
            <h3>상세 정보</h3>
            <div className="detail-container">
                <span>
                    주문일자 : <strong>2022-05-17</strong>
                </span>
                <span className="order-num">
                    주문번호 : <strong>Y22051708789</strong>
                </span>
            </div>
        </section>
    );
}

type Prop = {
    open: Function;
};

function OrderItemSection(props: Prop) {
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
                <td className="order-status">
                    <div>
                        <strong>주문완료</strong>
                    </div>
                    <div>
                        <div>
                            <button className="radius-style-btn">주문취소</button>
                        </div>
                        <div>
                            <button className="review-pop-btn radius-style-btn" onClick={() => props.open()}>
                                리뷰작성
                            </button>
                        </div>
                    </div>
                </td>
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
                        <th>상태</th>
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
    const [reviewPop, setReviewPop] = useState<null | JSX.Element>(null);
    const popContent = <ReviewPop close={() => setReviewPop(null)} />;
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (!user) {
                // User is signed out
                navigate("/", { replace: true });
            }
        });
    });

    return (
        <main className="wrap">
            <div className="order-detail big-container">
                <DetailSection />
                <OrderItemSection open={() => setReviewPop(popContent)} />
                <DeliverySection />
                <PaySection />
                <div className="list-btn-wrap">
                    <Link to="/mypage/orderList" className="order-list-btn border-style-btn">
                        목록
                    </Link>
                </div>
            </div>
            {reviewPop}
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
