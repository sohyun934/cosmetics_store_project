import "./Order.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, signedInUser } from "../../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import { getDate } from "../../utils/getDate";

interface CustomizedState {
    fromCart: boolean;
    orderList: string[];
    amount: number | undefined;
    orderPrice: string;
    fee: string;
    totPrice: string;
}

const StyledInput = styled.input`
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;

type Prop = {
    state: CustomizedState;
};

declare global {
    interface Window {
        IMP: any;
    }
}

function OrderForm(props: Prop) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        postCode: "",
        address: "",
        detailAddress: ""
    });

    const checkOut = {
        orderPrice: props.state.orderPrice,
        fee: props.state.fee,
        totPrice: props.state.totPrice
    };

    const order = {
        fromCart: props.state.fromCart,
        orderList: props.state.orderList,
        amount: props.state.amount
    };

    const navigate = useNavigate();
    const [deliveryMsg, setDeliveryMsg] = useState("");
    const [disabled, setDisabled] = useState(true);

    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    // 사용자 정보 가져오기
    const fetchUser = async () => {
        const q = query(collection(db, "users"), where("email", "==", signedInUser));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();

            setUser({
                name: user.name,
                email: user.email,
                phoneNumber: user.phone_number,
                postCode: user.post_code,
                address: user.address,
                detailAddress: user.detail_address
            });
        });
    };

    useEffect(() => {
        // 새로고침 시 이전페이지로 이동
        fetchUser().catch(() => {
            navigate(-1);
        });
    }, []);

    // 다음 우편번호 API
    const handleComplete = data => {
        let addr = "";

        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R") addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else addr = data.jibunAddress;

        setUser(user => ({ ...user, postCode: data.zonecode, address: addr }));
    };

    const handleSearch = () => {
        open({ onComplete: handleComplete });
    };

    // 유효성 검증 후 결제하기 버튼 활성화
    useEffect(() => {
        if (user.name && user.phoneNumber && user.postCode && user.address && user.detailAddress) setDisabled(false);
        else setDisabled(true);
    }, [user]);

    // 난수 생성
    const getRandomCode = (n: number) => {
        let str = "";

        for (let i = 0; i < n; i++) {
            str += Math.floor(Math.random() * 10);
        }

        return str;
    };

    // 주문 진행
    const handleOrder = async () => {
        const querySnapshot = await getDocs(collection(db, "order"));
        const orderId = querySnapshot.size + 1;

        const date = getDate();
        const randomCode = getRandomCode(4);
        const orderNum = date.join("") + randomCode;

        const amountList = [];
        const productNameList = [];

        if (order.fromCart) {
            // 장바구니에서 주문
            for (let i = 0; i < order.orderList.length; i++) {
                const cartRef = doc(db, "cart", order.orderList[i]);
                const cartSnap = await getDoc(cartRef);

                if (cartSnap.exists()) {
                    const cart = cartSnap.data();

                    amountList.push(cart.amount);
                    productNameList.push(cart.product_name);
                }
            }
        } else {
            // 상품 상세페이지에서 주문
            amountList.push(order.amount);
            productNameList.push(order.orderList[0]);
        }

        // 아임포트 결제 연동
        const IMP = window.IMP;
        IMP.init("imp78071137");

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay(
            {
                // param
                pg: "kakaopay",
                pay_method: "card",
                merchant_uid: orderNum,
                name: productNameList.length === 1 ? productNameList[0] : productNameList[productNameList.length - 1] + ` 외 ${productNameList.length - 1}건`,
                amount: checkOut.totPrice,
                buyer_email: user.email,
                buyer_name: user.name,
                buyer_tel: user.phoneNumber,
                buyer_addr: user.address + " " + user.detailAddress,
                buyer_postcode: user.postCode
            },
            async rsp => {
                if (rsp.success) {
                    // 결제 성공 시 주문한 상품 장바구니에서 삭제
                    order.orderList.forEach(async orderItem => {
                        await deleteDoc(doc(db, "cart", orderItem));
                    });

                    // firestore에 주문 정보 등록
                    await setDoc(doc(db, "order", orderNum), {
                        order_id: orderId,
                        order_date: date.join("."),
                        order_list: order.orderList,
                        amount_list: amountList,
                        product_name_list: productNameList,
                        name: user.name,
                        email: user.email,
                        phone_number: user.phoneNumber,
                        post_code: user.postCode,
                        address: user.address,
                        detail_address: user.detailAddress,
                        delivery_msg: deliveryMsg,
                        order_price: checkOut.orderPrice,
                        fee: checkOut.fee,
                        tot_price: checkOut.totPrice
                    }).then(() => {
                        navigate("/order/orderComplete", {
                            replace: true,
                            state: {
                                docId: orderNum
                            }
                        });
                    });
                } else {
                    alert(`${rsp.error_msg}`);
                    navigate("/", { replace: true });
                }
            }
        );
    };

    return (
        <form className="flex">
            <section className="delivery-section">
                <h2>Delivery</h2>
                <div className="input-container">
                    <input type="text" placeholder="받는 분" value={user.name} onChange={e => setUser(user => ({ ...user, name: e.target.value }))} />
                    <input
                        type="text"
                        placeholder="핸드폰번호"
                        value={user.phoneNumber}
                        onChange={e => setUser(user => ({ ...user, phoneNumber: e.target.value }))}
                    />
                    <div className="postcode-wrap">
                        <StyledInput
                            className="userPostcode"
                            type="text"
                            placeholder="우편번호"
                            value={user.postCode || ""}
                            onChange={e => setUser(user => ({ ...user, postCode: e.target.value }))}
                            readOnly
                        />
                        <button type="button" className="search-btn" aria-label="search postcode button" onClick={handleSearch}></button>
                    </div>
                    <StyledInput
                        className="userAddress"
                        type="text"
                        placeholder="기본 주소"
                        value={user.address || ""}
                        onChange={e => setUser(user => ({ ...user, address: e.target.value }))}
                        readOnly
                    />
                    <input
                        className="userDetailAddress"
                        type="text"
                        placeholder="상세 주소"
                        value={user.detailAddress || ""}
                        onChange={e => setUser(user => ({ ...user, detailAddress: e.target.value }))}
                    />
                </div>
                <div className="delivery-msg">
                    <select onChange={e => setDeliveryMsg(e.target.value)}>
                        <option value="">직접 입력</option>
                        <option>배송 전 연락 부탁드립니다.</option>
                        <option>부재 시 경비실에 맡겨주세요.</option>
                        <option>문 앞 배송 부탁드립니다.</option>
                    </select>
                    <textarea
                        rows={5}
                        cols={50}
                        maxLength={50}
                        placeholder="배송메시지 직접 입력 (50자 이내)"
                        value={deliveryMsg}
                        onChange={e => setDeliveryMsg(e.target.value)}
                        style={{ fontSize: "1rem" }}
                    ></textarea>
                </div>
            </section>
            <section className="check-out-section">
                <div className="section-inner">
                    <h2>Check Out</h2>
                    <hr />
                    <div className="check-out-price flex">
                        <span>주문금액</span>
                        <span className="price">
                            <strong>{checkOut.orderPrice}원</strong>
                        </span>
                    </div>
                    <div className="delivery-fee flex">
                        <span>배송비</span>
                        <span className="fee">
                            <strong>{checkOut.fee}원</strong>
                        </span>
                    </div>
                    <p className="small-txt">* 30,000원 이상 구매 시 무료 배송</p>
                    <hr />
                    <div className="total-price flex">
                        <span>
                            <strong>합계</strong>
                        </span>
                        <span className="price">
                            <strong>{checkOut.totPrice}원</strong>
                        </span>
                    </div>
                </div>
                <div className="btn-container flex">
                    <button type="button" className="cancel-btn border-style-btn" onClick={() => navigate(-1)}>
                        취소하기
                    </button>
                    <button type="button" className="pay-btn" onClick={handleOrder} disabled={disabled}>
                        결제하기
                    </button>
                </div>
            </section>
        </form>
    );
}

function Main(props: Prop) {
    return (
        <main>
            <div className="order-container big-container">
                <h1>ORDER</h1>
                <div className="section-container">
                    <OrderForm state={props.state} />
                </div>
            </div>
        </main>
    );
}

function Order() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;

    useEffect(() => {
        if (!state) {
            // url로 직접 접속하는 경우 메인페이지로 이동
            alert("정상적이지 않은 접근입니다.");
            navigate("/");
        }
    });

    return (
        <>
            {state && (
                <div>
                    <Header />
                    <Main state={state} />
                    <Footer />
                </div>
            )}
        </>
    );
}

export default Order;
