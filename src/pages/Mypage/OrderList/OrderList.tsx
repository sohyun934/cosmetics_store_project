import "./OrderList.css";
import Lnb from "../../../components/Lnb/Lnb";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, doc, DocumentData, getDoc, getDocs, limit, orderBy, query, QuerySnapshot, startAfter, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { getImage } from "../../../utils/getImage";
import { onAuthStateChanged } from "firebase/auth";
import Pagination from "react-js-pagination";

function OrderTable() {
    const [page, setPage] = useState(1);
    const [totItemsCnt, setTotItemsCnt] = useState(0);
    const [orderItems, setOrderItems] = useState([]);

    // 페이지네이션
    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    // 주문 내역 리스트 가져오기
    const fetchOrder = async (userEmail: string) => {
        let orderSnapshot: QuerySnapshot<DocumentData>;
        const orderItems = [];

        const q = query(collection(db, "order"), where("email", "==", userEmail), orderBy("order_id", "desc"));
        const querySnapshot = await getDocs(q);
        setTotItemsCnt(querySnapshot.size);

        if (page === 1) {
            const first = query(collection(db, "order"), where("email", "==", userEmail), orderBy("order_id", "desc"), limit(5));
            orderSnapshot = await getDocs(first);
        } else {
            let lastVisible = querySnapshot.docs[(page - 1) * 5 - 1];
            const next = query(collection(db, "order"), where("email", "==", userEmail), orderBy("order_id", "desc"), startAfter(lastVisible), limit(5));
            orderSnapshot = await getDocs(next);
        }

        for (let document of orderSnapshot.docs) {
            const order = document.data();
            const productNames = order.product_name_list;
            const orderDate = order.order_date;
            const amountList = order.amount_list;

            // 주문 상품 정보 가져오기
            for (let i = 0; i < productNames.length; i++) {
                const docRef = doc(db, "product", productNames[i]);
                const docSnap = await getDoc(docRef);
                const product = docSnap.data();

                const name = product.product_name;
                const price = product.product_price;
                const thumb01 = await getImage(product.product_thumb_01);
                const thumb02 = product.product_thumb_02;
                const thumb03 = product.product_thumb_03;
                const detail = product.product_detail;

                const state = {
                    name: name,
                    price: price,
                    thumb01: thumb01,
                    thumb02: thumb02,
                    thumb03: thumb03,
                    detail: detail
                };

                orderItems.push(
                    <tr key={document.id + docSnap.id} className="order-item">
                        {i === 0 && (
                            <td className="order-date" rowSpan={productNames.length}>
                                {orderDate}
                                <div className="order-num"></div>
                                <Link to={`/mypage/orderDetail?orderNo=${document.id}`}>상세보기</Link>
                            </td>
                        )}
                        <td className="order-item-thumb">
                            <Link to="/detail" state={state}>
                                <img src={thumb01} alt={productNames[i]} />
                            </Link>
                        </td>
                        <td className="order-item-name">
                            <Link to="/detail" state={state}>
                                {productNames[i]}
                            </Link>
                        </td>
                        <td className="order-amount">{amountList[i]}</td>
                        <td className="order-price">{price}원</td>
                        <td className="order-status">
                            <strong>주문완료</strong>
                        </td>
                    </tr>
                );
            }
        }

        setOrderItems(orderItems);
    };

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                fetchOrder(user.email);
            }
        });
    }, [page]);

    return (
        <>
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
                    {orderItems.length > 0 ? (
                        orderItems
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
                                <p>주문 내역이 없습니다.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {orderItems.length > 0 && (
                <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
                    totalItemsCount={totItemsCnt}
                    pageRangeDisplayed={5}
                    prevPageText="‹"
                    nextPageText="›"
                    onChange={handlePageChange}
                />
            )}
        </>
    );
}

function OrderList() {
    return (
        <main>
            <div className="order-list big-container">
                <h1>MYPAGE</h1>
                <Lnb title="orderList" />
                <OrderTable />
            </div>
        </main>
    );
}

export default OrderList;
