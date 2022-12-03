import "./OrderDetail.css";
import ReviewPop from "./ReviewPop/ReviewPop";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db, signedInUser } from "../../../firebase";
import { getImage } from "../../../utils/getImage";
import { DeliverySection, PaySection } from "../../Order/OrderComplete/OrderComplete";
import { onAuthStateChanged } from "firebase/auth";
import { getFormatPrice } from "../../../utils/getFormatPrice";

type DetailSectionProp = {
    orderDetail: any;
    orderNum: string;
};

const DetailSection = (props: DetailSectionProp) => {
    const orderDate = props.orderDetail.order_date;
    const orderNum = props.orderNum;

    return (
        <section className="detail-section">
            <h3>상세 정보</h3>
            <div className="order-detail-container">
                <span>
                    주문일자 : <strong>{orderDate}</strong>
                </span>
                <span className="order-num">
                    주문번호 : <strong>{orderNum}</strong>
                </span>
            </div>
        </section>
    );
};

type OrderItemSectionProp = {
    orderDetail: any;
};

const OrderItemSection = (props: OrderItemSectionProp) => {
    const orderDetail = props.orderDetail;
    const orderList = orderDetail.order_list;

    const reviewId = useRef(null);
    const reviewBtnRef = useRef(null);

    const [products, setProducts] = useState([]);
    const [reviewPop, setReviewPop] = useState<null | JSX.Element>(null);

    const handleClick = (productName: string) => {
        setReviewPop(
            <ReviewPop
                reviewId={reviewId.current}
                close={(isWrite: boolean | undefined) => {
                    setReviewPop(null);
                    if (isWrite) {
                        reviewBtnRef.current.innerText = "리뷰수정";
                    }
                }}
                productName={productName}
            />
        );
    };

    const fetchProducts = async () => {
        const products = [];

        for (let i = 0; i < orderList.length; i++) {
            // 주문 상품 데이터
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

            // 리뷰 데이터
            const reviewQuery = query(collection(db, "reviews"), where("email", "==", signedInUser), where("product_name", "==", productName));
            const reviewSnapshot = await getDocs(reviewQuery);

            if (!reviewSnapshot.empty) {
                reviewId.current = reviewSnapshot.docs[0].id;
            }

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
                            <div>
                                <button className="review-pop-btn radius-style-btn" onClick={() => handleClick(productName)} ref={reviewBtnRef}>
                                    {reviewSnapshot.empty ? "리뷰작성" : "리뷰수정"}
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }

        setProducts(products);
    };

    useEffect(() => {
        fetchProducts();
    }, [orderDetail]);

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
            {reviewPop}
        </section>
    );
};

const OrderDetail = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const docId = query.get("orderNo");
    const [orderDetail, setOrderDetail] = useState({ id: "", data: {} });

    const fetchOrder = async () => {
        const docRef = doc(db, "order", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setOrderDetail({ id: docSnap.id, data: docSnap.data() });
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                fetchOrder();
            }
        });
    }, []);

    return (
        <>
            {Object.keys(orderDetail.data).length > 0 && (
                <main className="wrap">
                    <div className="order-detail big-container">
                        <DetailSection orderDetail={orderDetail.data} orderNum={orderDetail.id} />
                        <OrderItemSection orderDetail={orderDetail.data} />
                        <DeliverySection orderDetail={orderDetail.data} />
                        <PaySection orderDetail={orderDetail.data} />
                        <div className="list-btn-wrap">
                            <Link to="/mypage/orderList" className="order-list-btn border-style-btn">
                                목록
                            </Link>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default OrderDetail;
