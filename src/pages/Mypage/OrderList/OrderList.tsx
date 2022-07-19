import "./OrderList.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Lnb from "../../../components/Lnb/Lnb";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db, signedInUser } from "../../../firebase";
import { getImage } from "../../../utils/getImage";

// function SearchSection() {
//     let onBtn: null | HTMLButtonElement = null;
//     const btns = [];
//     const btnTitles = ["1개월", "3개월", "6개월", "12개월"];

//     function searchPeriod(e: React.MouseEvent) {
//         if (onBtn !== null) onBtn.classList.remove("on-btn");
//         let clickBtn = e.target as HTMLButtonElement;
//         clickBtn.classList.add("on-btn");
//         onBtn = clickBtn;
//     }

//     for (let i = 0; i < btnTitles.length; i++) {
//         btns.push(
//             <button key={i} className="radius-style-btn" onClick={searchPeriod}>
//                 {btnTitles[i]}
//             </button>
//         );
//     }

//     return (
//         <section className="search-section flex">
//             <span className="small-txt">구매기간</span>
//             <div className="section-inner-left">
//                 <span className="select-month">{btns}</span>
//             </div>
//             <div className="section-inner-right">
//                 <input className="history-start-date small-txt" type="date" />
//                 ~
//                 <input className="history-end-date small-txt" type="date" />
//                 <span className="btn-wrap">
//                     <button className="search-btn small-txt">조회</button>
//                 </span>
//             </div>
//         </section>
//     );
// }

function OrderTable() {
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();

    async function fetchOrder() {
        const orderItems = [];

        const q = query(collection(db, "order"), where("email", "==", signedInUser), orderBy("order_id", "desc"));
        const orderSnapshot = await getDocs(q);

        const productNames = [];
        const products = {};

        orderSnapshot.forEach(doc => {
            productNames.push(...doc.data().product_name_list);
        });

        for (let i = 0; i < productNames.length; i++) {
            const docRef = doc(db, "product", productNames[i]);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();

            const url = await getImage(product.product_thumb_01);
            const url2 = product.product_thumb_02;
            const url3 = product.product_thumb_03;
            const price = product.product_price;
            const name = product.product_name;
            const detail = product.product_detail;
            products[productNames[i]] = [name, price, url, url2, url3, detail];
        }

        orderSnapshot.forEach(document => {
            const order = document.data();
            const productNames = order.product_name_list;
            const amountList = order.amount_list;

            const year = order.order_id.substr(0, 4);
            const month = order.order_id.substr(4, 2);
            const day = order.order_id.substr(6, 2);
            const orderDate = year + "." + month + "." + day;

            for (let i = 0; i < productNames.length; i++) {
                const state = {
                    name: products[productNames[i]][0],
                    price: products[productNames[i]][1],
                    thumb01: products[productNames[i]][2],
                    thumb02: products[productNames[i]][3],
                    thumb03: products[productNames[i]][4],
                    detail: products[productNames[i]][5]
                };

                orderItems.push(
                    <tr key={document.id + i} className="order-item">
                        {i === 0 ? (
                            <td className="order-date" rowSpan={productNames.length}>
                                {orderDate}
                                <div className="order-num"></div>
                                <Link
                                    to="/mypage/orderDetail"
                                    state={{
                                        orderId: order.order_id
                                    }}
                                >
                                    상세보기
                                </Link>
                            </td>
                        ) : (
                            ""
                        )}
                        <td className="order-item-thumb">
                            <Link to="/detail" state={state}>
                                <img src={products[productNames[i]][2]} alt={productNames[i]} />
                            </Link>
                        </td>
                        <td className="order-item-name">
                            <Link to="/detail" state={state}>
                                {productNames[i]}
                            </Link>
                        </td>
                        <td className="order-amount">{amountList[i]}</td>
                        <td className="order-price">{products[productNames[i]][1]}원</td>
                        <td className="order-status">
                            <strong>주문완료</strong>
                        </td>
                    </tr>
                );
            }
        });

        setOrderItems(orderItems);
    }

    useEffect(() => {
        // url로 직접 접속, 새로고침 시 인증 페이지로 이동
        fetchOrder().catch(() => navigate("/mypage/myPageAuthentification"));
    }, []);

    return (
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
    );
}

function Main() {
    return (
        <main>
            <div className="order-list big-container">
                <h1>MYPAGE</h1>
                <Lnb title="orderList" />
                {/* <SearchSection /> */}
                <OrderTable />
            </div>
        </main>
    );
}

function OrderList() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default OrderList;
