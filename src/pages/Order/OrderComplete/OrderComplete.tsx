import "./OrderComplete.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getImage } from "../../../utils/getImage";
import { getFormatPrice } from "../../../utils/getFormatPrice";

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
    const orderDetail = props.orderDetail;
    const orderList = orderDetail.order_list;
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const products = [];

        if (orderList) {
            for (let i = 0; i < orderList.length; i++) {
                const amount = orderDetail.amount_list[i];

                const productName = orderDetail.product_name_list[i];
                const productRef = doc(db, "product", productName);
                const productSnap = await getDoc(productRef);
                const product = productSnap.data();

                const thumb = await getImage(product.product_thumb_01);
                const price = getFormatPrice(product.product_price);
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
    };

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

type DeliverySectionProp = {
    orderDetail: any;
};

export function DeliverySection(props: DeliverySectionProp) {
    const orderDetail = props.orderDetail;
    const firstNumber = orderDetail.phone_number.slice(0, 3);
    const thirdNumber = orderDetail.phone_number.slice(-4);
    const phoneNumber = firstNumber + "-****-" + thirdNumber;

    return (
        <section className="delivery-section">
            <h3>배송지 정보</h3>
            <table>
                <tbody>
                    <tr>
                        <th>받는분</th>
                        <td>{orderDetail.name}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            ({orderDetail.post_code})
                            <br />
                            {orderDetail.address + " " + orderDetail.detail_address}
                        </td>
                    </tr>
                    <tr>
                        <th>배송 메시지</th>
                        <td>{orderDetail.deliveryMsg ? orderDetail.deliveryMsg : "\u00A0"}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export function PaySection(props: SectionProp) {
    const orderDetail = props.orderDetail;

    return (
        <section className="payment-section">
            <h3>결제 정보</h3>
            <table>
                <tbody>
                    <tr>
                        <th>상품 금액</th>
                        <td>{orderDetail.order_price}원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>{orderDetail.fee}원</td>
                    </tr>
                    <tr>
                        <th>전체 금액</th>
                        <td>{orderDetail.tot_price}원</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

interface CustomizedState {
    docId: string;
}

function Main() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;
    const [orderDetail, setOrderDetail] = useState({});

    let docId: string;
    if (state) docId = state.docId;

    const fetchOrder = async () => {
        const docRef = doc(db, "order", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) setOrderDetail(docSnap.data());
    };

    useEffect(() => {
        if (!state) {
            // url로 직접 접속하는 경우 메인페이지로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/");
        } else {
            fetchOrder();
        }
    }, []);

    return (
        <>
            {state && Object.keys(orderDetail).length > 0 && (
                <main>
                    <div className="order-detail big-container">
                        <NoticeSection />
                        <OrderItemSection orderDetail={orderDetail} />
                        <DeliverySection orderDetail={orderDetail} />
                        <PaySection orderDetail={orderDetail} />
                    </div>
                </main>
            )}
        </>
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
