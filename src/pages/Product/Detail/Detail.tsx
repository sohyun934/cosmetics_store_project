import "./Detail.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MoveTop from "../../../components/MoveTop/MoveTop";
import ReviewPop from "../../../components/ReviewPop/ReviewPop";
import CartPop from "../../Mypage/Cart/CartPop/CartPop";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getImage } from "../../../utils/getImage";
import { db, signedInUser } from "../../../firebase";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";

type ProductionProp = {
    name: string;
    price: string;
    urls: string[];
    open: Function;
};

function ProductSection(props: ProductionProp) {
    const productName = props.name;
    const price = Number(props.price);
    const strPrice = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const [totPrice, setTotPrice] = useState(strPrice);
    const [amount, setAmount] = useState(1);

    const navigate = useNavigate();

    // 수량 변경
    const handleMinus = () => {
        setAmount(amount === 1 ? 1 : amount - 1);
    };

    const handleAmt = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = Number(e.target.value);

        if (amount > 3) {
            alert("최대 주문수량은 3개 입니다.");
            setAmount(3);
        } else if (amount < 1) {
            alert("최소 주문수량은 1개 입니다.");
            setAmount(1);
        } else if (isNaN(amount)) {
            alert("숫자만 입력 가능합니다.");
            setAmount(1);
        } else {
            setAmount(Number(e.target.value));
        }
    };

    const handlePlus = () => {
        setAmount(amount === 3 ? 3 : amount + 1);

        if (amount === 3) alert("최대 주문수량은 3개 입니다.");
    };

    // 수량 변경에 따른 총액 변경
    useEffect(() => {
        setTotPrice(String(price * amount).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    }, [price, amount]);

    // 장바구니 담기
    const handleAddCart = async () => {
        if (!signedInUser) {
            navigate("/login");
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
        const orderPrice = price * amount;
        let fee = 0;

        if (orderPrice > 0 && orderPrice < 30000) {
            fee = 3000;
        }

        navigate("/order", {
            state: {
                fromCart: false,
                orderList: [productName],
                amount: amount,
                orderPrice: String(orderPrice).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                fee: String(fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                totPrice: String(orderPrice + fee).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }
        });
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
                            <button type="button" className="minus" onClick={handleMinus}></button>
                            <input type="text" className="cnt" value={amount} onChange={handleAmt} />
                            <button type="button" className="plus" onClick={handlePlus}></button>
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

    function onDetail() {
        props.onChangeTap("detail");
        setDetailClass(" on");
        setReviewClass("");
    }

    function onReview() {
        props.onChangeTap("review");
        setDetailClass("");
        setReviewClass(" on");
    }

    async function fetchReviews() {
        const reviewQuery = query(collection(db, "reviews"), where("product_name", "==", productName), orderBy("review_id", "desc"));
        const reviewSnapshot = await getDocs(reviewQuery);

        setReviewCnt(reviewSnapshot.size);
    }

    useEffect(() => {
        fetchReviews();
    });

    return (
        <nav className="menu-lnb">
            <ul className="flex">
                <li>
                    <button className={"border-style-btn" + detailClass} onClick={onDetail}>
                        상세정보
                    </button>
                </li>
                <li>
                    <button className={"border-style-btn" + reviewClass} onClick={onReview}>
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

    const [reviews, setReviews] = useState([]);
    const [totRating, setTotRating] = useState("0.0");
    const [totWidth, setTotWidth] = useState("");

    async function fetchReviews() {
        const reviewQuery = query(collection(db, "reviews"), where("product_name", "==", productName), orderBy("review_id", "desc"));
        const reviewSnapshot = await getDocs(reviewQuery);

        let totRating = 0;
        const reviews = [];

        if (!reviewSnapshot.empty) {
            reviewSnapshot.forEach(doc => {
                const review = doc.data();

                const rating = review.rate;
                totRating += rating;
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
                            {/* <div className="thumb">
                                <a
                                    href="/"
                                    onClick={event => {
                                        event.preventDefault();
                                        resize(event);
                                    }}
                                >
                                    <img src={require("../../../assets/product/detail/review.jpg")} alt="리뷰 이미지" />
                                    <button className="image-more"></button>
                                </a>
                            </div> */}
                        </div>
                    </div>
                );
            });

            const fixedRating = (totRating / reviewSnapshot.size).toFixed(1);
            const totWidth = String(Number(fixedRating) * 20) + "%";

            setTotRating(fixedRating);
            setTotWidth(totWidth);
            setReviews(reviews);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    // function resize(e: React.MouseEvent<HTMLElement>) {
    //     let a = (e.target as HTMLElement).parentNode;
    //     (a as HTMLAnchorElement).removeAttribute("href");

    //     let thumb: ParentNode | null = null;
    //     if (a !== null) {
    //         thumb = a.parentNode;
    //         if (thumb !== null) (thumb as HTMLElement).classList.add("resize");
    //     }
    // }

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
    let content;
    const [tap, setTap] = useState("detail");
    const [pop, setPop] = useState<string>("");
    const [popContent, setPopContent] = useState<JSX.Element | null>(null);

    const location = useLocation();
    const state = location.state as CustomizedState;
    const name = state.name;
    const price = state.price;
    const [urls, setUrls] = useState<string[]>([]);

    if (tap === "detail") {
        content = (
            <div className="detail-wrap">
                <img src={urls[3]} alt="상세정보" />
            </div>
        );
    } else if (tap === "review") {
        content = <ReviewSection productName={name} />;
    }

    function closePop() {
        setPop("");
        setPopContent(null);
    }

    useEffect(() => {
        if (pop === "cart") {
            setPopContent(<CartPop close={closePop} title="상품이 장바구니에 담겼습니다." />);
        } else if (pop === "overlap") {
            setPopContent(<CartPop close={closePop} title="이미 장바구니에 담겨있는 상품입니다." />);
        } else if (pop === "review") {
            setPopContent(<ReviewPop close={closePop} productName={name} />);
        }
    }, [pop]);

    useEffect(() => {
        async function getImageUrls() {
            const imgs = [state.thumb01, state.thumb02, state.thumb03, state.detail];
            const promises = imgs.map(thumb => getImage(thumb));
            const urls = await Promise.all(promises);
            setUrls(urls);
        }

        getImageUrls();
    }, []);

    return (
        <main>
            <div className="detail-container big-container">
                <ProductSection name={name} price={price} urls={urls} open={(_pop: string) => setPop(_pop)} />
                <Nav onChangeTap={(_tap: string) => setTap(_tap)} productName={name}></Nav>
                {content}
            </div>
            {popContent}
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
