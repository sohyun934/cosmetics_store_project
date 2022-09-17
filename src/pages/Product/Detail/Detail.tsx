import "./Detail.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MoveTop from "../../../components/MoveTop/MoveTop";
import CartPop from "../../Mypage/Cart/CartPop/CartPop";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getImage } from "../../../utils/getImage";
import { db, signedInUser } from "../../../firebase";
import { addDoc, collection, DocumentData, getDocs, limit, orderBy, query, QuerySnapshot, startAfter, where } from "firebase/firestore";
import { getFormatPrice } from "../../../utils/getFormatPrice";
import ReactPagination from "react-js-pagination";

type ProductionProp = {
    name: string;
    price: string;
    urls: string[];
    open: Function;
};

function ProductSection(props: ProductionProp) {
    const productName = props.name;
    const price = Number(props.price);
    const strPrice = getFormatPrice(props.price);
    const [totPrice, setTotPrice] = useState(strPrice);
    const [amount, setAmount] = useState(1);

    const navigate = useNavigate();

    // 수량 변경
    const handleMinus = () => {
        setAmount(amount === 1 ? 1 : amount - 1);
    };

    const handlePlus = () => {
        setAmount(amount === 3 ? 3 : amount + 1);

        if (amount === 3) {
            alert("최대 주문수량은 3개 입니다.");
        }
    };

    // 수량 변경에 따른 총액 변경
    useEffect(() => {
        setTotPrice(getFormatPrice(String(price * amount)));
    }, [price, amount]);

    // 장바구니 담기
    const handleAddCart = async () => {
        if (!signedInUser) {
            navigate("/login", { state: { moveTo: -1 } });
        } else {
            const cartList = await getDocs(query(collection(db, "cart"), where("user_email", "==", signedInUser)));
            const q = query(collection(db, "cart"), where("user_email", "==", signedInUser), where("product_name", "==", productName));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(collection(db, "cart"), {
                    cart_id: cartList.size + 1,
                    product_name: productName,
                    user_email: signedInUser,
                    amount: amount
                });

                props.open("cart");
            } else {
                props.open("overlap");
            }
        }
    };

    // 주문하기
    const handleOrder = async () => {
        if (!signedInUser) {
            navigate("/login", { state: { moveTo: -1 } });
        } else {
            let fee = 0;
            const orderPrice = price * amount;

            if (orderPrice > 0 && orderPrice < 30000) {
                fee = 3000;
            }

            navigate("/order", {
                state: {
                    fromCart: false,
                    orderList: [productName],
                    amount: amount,
                    orderPrice: getFormatPrice(String(orderPrice)),
                    fee: getFormatPrice(String(fee)),
                    totPrice: getFormatPrice(String(orderPrice + fee))
                }
            });
        }
    };

    return (
        <section className="product-section flex">
            <Swiper
                className="thumb"
                modules={[Pagination, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000 }}
            >
                <SwiperSlide>
                    <img src={props.urls[0]} alt={`${productName}01`} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={props.urls[1]} alt={`${productName}02`} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={props.urls[2]} alt={`${productName}03`} />
                </SwiperSlide>
            </Swiper>
            <div className="info">
                <form method="post">
                    <h2>
                        <strong>{productName}</strong>
                    </h2>
                    <div className="price-container flex">
                        <span className="price big-txt">
                            <strong>{strPrice}원</strong>
                        </span>
                    </div>
                    <hr />
                    <div className="cnt-container flex">
                        <span className="cnt-box">
                            <button type="button" className="minus" aria-label="minus button for quantity" onClick={handleMinus}></button>
                            <input type="text" className="cnt" value={amount} disabled />
                            <button type="button" className="plus" aria-label="plus button for quantity" onClick={handlePlus}></button>
                        </span>
                        <span className="price big-txt">
                            <strong>{totPrice}원</strong>
                        </span>
                    </div>
                    <p>30,000원 이상 구매 시 무료 배송</p>
                    <div className="util-btn-container flex">
                        <div className="cart-btn-wrap">
                            <button type="button" className="cart-btn gray-style-btn" onClick={handleAddCart}>
                                장바구니
                            </button>
                        </div>
                        <div className="order-btn-wrap">
                            <button type="button" className="order-btn" onClick={handleOrder}>
                                구매하기
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

type NavProp = {
    onChangeTap: Function;
    productName: string;
};

function Nav(props: NavProp) {
    const productName = props.productName;
    const [detailClass, setDetailClass] = useState(" on");
    const [reviewClass, setReviewClass] = useState("");
    const [reviewCnt, setReviewCnt] = useState(0);

    const handleContent = (tap: string) => {
        if (tap === "detail") {
            props.onChangeTap("detail");
            setDetailClass(" on");
            setReviewClass("");
        } else {
            props.onChangeTap("review");
            setDetailClass("");
            setReviewClass(" on");
        }
    };

    const fetchReviews = async () => {
        const reviewQuery = query(collection(db, "reviews"), where("product_name", "==", productName), orderBy("review_id", "desc"));
        const reviewSnapshot = await getDocs(reviewQuery);

        setReviewCnt(reviewSnapshot.size);
    };

    useEffect(() => {
        fetchReviews();
    });

    return (
        <nav className="menu-lnb">
            <ul className="flex">
                <li>
                    <button className={"border-style-btn" + detailClass} onClick={() => handleContent("detail")}>
                        상세정보
                    </button>
                </li>
                <li>
                    <button className={"border-style-btn" + reviewClass} onClick={() => handleContent("review")}>
                        구매후기 ({reviewCnt})
                    </button>
                </li>
            </ul>
        </nav>
    );
}

type ReviewProp = {
    productName: string;
};

function ReviewSection(props: ReviewProp) {
    const productName = props.productName;
    const [page, setPage] = useState(1);
    const [totItemsCnt, setTotItemsCnt] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [totRating, setTotRating] = useState("0.0");
    const [totWidth, setTotWidth] = useState("");

    // 페이지네이션
    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    const fetchReviews = async () => {
        let reviewSnapshot: QuerySnapshot<DocumentData>;
        let totRating = 0;
        const reviews = [];

        const q = query(collection(db, "reviews"), where("product_name", "==", productName), orderBy("review_id", "desc"));
        const querySnapshot = await getDocs(q);
        setTotItemsCnt(querySnapshot.size);

        // 구매자 평점
        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                const review = doc.data();
                const rating = review.rate;
                totRating += rating;
            });

            const fixedRating = (totRating / querySnapshot.size).toFixed(1);
            const totWidth = String(Number(fixedRating) * 20) + "%";

            setTotRating(fixedRating);
            setTotWidth(totWidth);
        }

        // 페이지네이션
        if (page === 1) {
            const first = query(collection(db, "reviews"), where("product_name", "==", productName), orderBy("review_id", "desc"), limit(5));
            reviewSnapshot = await getDocs(first);
        } else {
            let lastVisible = querySnapshot.docs[(page - 1) * 5 - 1];
            const next = query(
                collection(db, "reviews"),
                where("product_name", "==", productName),
                orderBy("review_id", "desc"),
                startAfter(lastVisible),
                limit(5)
            );
            reviewSnapshot = await getDocs(next);
        }

        if (!reviewSnapshot.empty) {
            reviewSnapshot.forEach(doc => {
                const review = doc.data();

                const rating = review.rate;
                const width = String(rating * 20) + "%";

                const userName = review.user_name;
                const maskingName = userName.slice(0, -1) + "*";

                reviews.push(
                    <div key={doc.id} className="review-container">
                        <div className="flex">
                            <span className="review-point">
                                <span className="point" style={{ width: width }}></span>
                            </span>
                            <span className="info">
                                <span className="user-name">{`${maskingName}님`}</span>
                                <span>{review.date}</span>
                            </span>
                        </div>
                        <div className="content">
                            <p>{review.content}</p>
                        </div>
                    </div>
                );
            });

            setReviews(reviews);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [page]);

    return (
        <section className="review-section">
            <div className="section-inner">
                <div className="section-top">
                    <h1>REVIEW</h1>
                </div>
                <div className="total-point">
                    <p style={{ margin: "0" }}>구매자 평점</p>
                    <p className="rating">
                        <strong>{totRating}</strong>
                    </p>
                    <div className="review-point">
                        <span className="point" style={{ width: totWidth }}></span>
                    </div>
                </div>
                {reviews.length > 0 ? (
                    reviews
                ) : (
                    <div className="review-container">
                        <p style={{ textAlign: "center" }}>작성된 리뷰가 없습니다.</p>
                    </div>
                )}
                {reviews.length > 0 && (
                    <ReactPagination
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={totItemsCnt}
                        pageRangeDisplayed={5}
                        prevPageText="‹"
                        nextPageText="›"
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
}

interface CustomizedState {
    name: string;
    price: string;
    thumb01: string;
    thumb02: string;
    thumb03: string;
    detail: string;
}

function Main() {
    const [tap, setTap] = useState("detail");
    const [pop, setPop] = useState({ state: "", content: null });
    const [urls, setUrls] = useState<string[]>([]);

    const location = useLocation();
    const state = location.state as CustomizedState;
    const name = state.name;
    const price = state.price;

    function closePop() {
        setPop({ state: "", content: null });
    }

    useEffect(() => {
        if (pop.state === "cart") {
            setPop(pop => ({ ...pop, content: <CartPop close={closePop} title="상품이 장바구니에 담겼습니다." /> }));
        } else if (pop.state === "overlap") {
            setPop(pop => ({ ...pop, content: <CartPop close={closePop} title="이미 장바구니에 담겨있는 상품입니다." /> }));
        }
    }, [pop.state]);

    useEffect(() => {
        const getImageUrls = async () => {
            const imgs = [state.thumb01, state.thumb02, state.thumb03, state.detail];
            const promises = imgs.map(thumb => getImage(thumb));
            const urls = await Promise.all(promises);
            setUrls(urls);
        };

        getImageUrls();
    }, []);

    return (
        <main>
            <div className="detail-container big-container">
                <ProductSection name={name} price={price} urls={urls} open={(_pop: string) => setPop(pop => ({ ...pop, state: _pop }))} />
                <Nav onChangeTap={(_tap: string) => setTap(_tap)} productName={name}></Nav>
                {tap === "detail" ? (
                    <div className="detail-wrap">
                        <img src={urls[3]} alt="상세정보" />
                    </div>
                ) : (
                    <ReviewSection productName={name} />
                )}
            </div>
            {pop.content}
            <MoveTop />
        </main>
    );
}

function Detail() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Detail;
