import "./OrderDetail.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ReviewPop from "../../../components/ReviewPop/ReviewPop";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, signedInUser } from "../../../firebase";
import { getImage } from "../../../utils/getImage";

type SectionProp = {
    orderDetail: any;
};

function DetailSection(props: SectionProp) {
    let year: string;
    let month: string;
    let day: string;
    let orderDate: string;
    let orderId: string;

    if (props.orderDetail.order_id) {
        year = props.orderDetail.order_id.substr(0, 4);
        month = props.orderDetail.order_id.substr(4, 2);
        day = props.orderDetail.order_id.substr(6, 2);
        orderDate = year + "-" + month + "-" + day;
        orderId = props.orderDetail.order_id;
    }

    return (
        <section className="detail-section">
            <h3>상세 정보</h3>
            <div className="detail-container">
                <span>
                    주문일자 : <strong>{orderDate}</strong>
                </span>
                <span className="order-num">
                    주문번호 : <strong>{orderId}</strong>
                </span>
            </div>
        </section>
    );
}

type ItemProp = {
    open: Function;
    orderDetail: any;
    reviewId: string;
};

function OrderItemSection(props: ItemProp) {
    const orderDetail = props.orderDetail;
    const reviewId = props.reviewId;

    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        const products = [];

        if (orderDetail.order_list) {
            for (let i = 0; i < orderDetail.order_list.length; i++) {
                const amount = orderDetail.amount_list[i];

                const productName = orderDetail.product_name_list[i];
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

                const reviewQuery = query(collection(db, "reviews"), where("email", "==", signedInUser), where("product_name", "==", productName));
                const reviewSnapshot = await getDocs(reviewQuery);

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
                            <td className="order-status">
                                <div>
                                    <strong>주문완료</strong>
                                </div>
                                <div>
                                    {/* <div>
                                        <button className="radius-style-btn">주문취소</button>
                                    </div> */}
                                    <div>
                                        <button className="review-pop-btn radius-style-btn" onClick={() => props.open(productName)}>
                                            {reviewSnapshot.empty ? "리뷰작성" : "리뷰수정"}
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                }
            }

            setProducts(products);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [orderDetail, reviewId]);

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
    const [reviewId, setReviewId] = useState("");
    const [reviewPop, setReviewPop] = useState<null | JSX.Element>(null);

    const location = useLocation();
    const state = location.state as CustomizedState;
    const orderId = state.orderId;

    async function fetchOrder() {
        const docRef = doc(db, "order", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) setOrderDetail(docSnap.data());
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <main className="wrap">
            <div className="order-detail big-container">
                <DetailSection orderDetail={orderDetail} />
                <OrderItemSection
                    open={(productName: string) =>
                        setReviewPop(
                            <ReviewPop
                                close={(reviewId: string) => {
                                    setReviewPop(null);
                                    if (reviewId) setReviewId(reviewId);
                                }}
                                productName={productName}
                            />
                        )
                    }
                    orderDetail={orderDetail}
                    reviewId={reviewId}
                />
                <DeliverySection orderDetail={orderDetail} />
                <PaySection orderDetail={orderDetail} />
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
