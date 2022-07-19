import "./OrderComplete.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getImage } from "../../../utils/getImage";

type SectionProp = {
    orderDetail: any;
};

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

function OrderItemSection(props: SectionProp) {
    const orderList = props.orderDetail.order_list;
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        const products = [];

        if (orderList) {
            for (let i = 0; i < orderList.length; i++) {
                const amount = props.orderDetail.amount_list[i];

                const productName = props.orderDetail.product_name_list[i];
                const productRef = doc(db, "product", productName);
                const productSnap = await getDoc(productRef);
                const product = productSnap.data();

                const thumb = await getImage(product.product_thumb_01);
                const price = product.product_price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                const state = {
                    name: product.product_name,
                    price: product.product_price,
                    thumb01: product.product_thumb_01,
                    thumb02: product.product_thumb_02,
                    thumb03: product.product_thumb_03,
                    detail: product.product_detail
                };

                if (productSnap.exists()) {
                    products.push(
                        <tr key={i} className="order-item">
                            <td className="order-item-thumb">
                                <Link to="/detail" state={state}>
                                    <img src={thumb} alt={productName} />
                                </Link>
                            </td>
                            <td className="order-item-name">
                                <Link to="/detail" state={state}>
                                    {productName}
                                </Link>
                            </td>
                            <td className="order-amount">{amount}</td>
                            <td className="order-price">{price}원</td>
                        </tr>
                    );
                }
            }

            setProducts(products);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [orderList]);

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
                <tbody>{products}</tbody>
            </table>
        </section>
    );
}

function DeliverySection(props: SectionProp) {
    let firstNumber: string;
    let thirdNumber: string;
    let phoneNumber: string = props.orderDetail.phone_number;

    if (phoneNumber) {
        firstNumber = phoneNumber.slice(0, 3);
        thirdNumber = phoneNumber.slice(-4);
        phoneNumber = firstNumber + "-****-" + thirdNumber;
    }

    return (
        <section className="delivery-section">
            <h3>배송지 정보</h3>
            <table>
                <tbody>
                    <tr>
                        <th>받는분</th>
                        <td>{props.orderDetail.name}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            ({props.orderDetail.postcode})
                            <br />
                            {props.orderDetail.address + " " + props.orderDetail.detail_address}
                        </td>
                    </tr>
                    <tr>
                        <th>배송 메시지</th>
                        <td>{props.orderDetail.delivery_msg ? props.orderDetail.delivery_msg : "\u00A0"}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

function PaySection(props: SectionProp) {
    return (
        <section className="payment-section">
            <h3>결제 정보</h3>
            <table>
                <tbody>
                    <tr>
                        <th>상품 금액</th>
                        <td>{props.orderDetail.order_price}원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>{props.orderDetail.fee}원</td>
                    </tr>
                    <tr>
                        <th>전체 금액</th>
                        <td>{props.orderDetail.tot_price}원</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

interface CustomizedState {
    orderId: string;
}

function Main() {
    const [orderDetail, setOrderDetail] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;

    let orderId: string;
    if (state) orderId = state.orderId;

    async function fetchOrder() {
        const docRef = doc(db, "order", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) setOrderDetail(docSnap.data());
    }

    useEffect(() => {
        if (!state) {
            // url로 직접 접속하는 경우 장바구니로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/mypage/cart");
        } else {
            fetchOrder();
        }
    }, []);

    return (
        <main>
            <div className="order-detail big-container">
                <NoticeSection />
                <OrderItemSection orderDetail={orderDetail} />
                <DeliverySection orderDetail={orderDetail} />
                <PaySection orderDetail={orderDetail} />
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
