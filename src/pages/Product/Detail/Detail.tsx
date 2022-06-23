import "./Detail.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import MoveTop from "../../../components/MoveTop/MoveTop";
import ReviewPop from "../../../components/ReviewPop/ReviewPop";
import CartPop from "../../Mypage/Cart/CartPop/CartPop";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import WishPop from "../../../components/WishPop/WishPop";

type ProductionProp = {
    price: string;
    open: Function;
};

function ProductSection(props: ProductionProp) {
    const price = props.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const [wishToggle, setWishToggle] = useState(false);
    const [totPrice, setTotPrice] = useState(props.price);
    const [count, setCount] = useState(1);

    function openWishPop() {
        if (wishToggle === false) {
            props.open("wish");
        }

        setWishToggle(!wishToggle);
    }

    function minus() {
        setCount(count === 1 ? 1 : count - 1);
    }

    function changeCnt(e: React.ChangeEvent<HTMLInputElement>) {
        setCount(Number(e.target.value));
    }

    function plus() {
        setCount(count === 3 ? 3 : count + 1);
        if (count === 3) alert("최대 주문수량은 3개 입니다.");
    }

    useEffect(() => {
        setTotPrice(String(Number(props.price) * count).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    }, [props.price, count]);

    return (
        <section className="product-section flex">
            <Swiper className="thumb" modules={[Pagination, A11y]} spaceBetween={0} slidesPerView={1} pagination={{ clickable: true }} loop={true}>
                <SwiperSlide>
                    <img src={require("../../../assets/product/new/new01.jpg")} alt="신제품01" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../../../assets/product/new/new02.jpg")} alt="신제품02" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../../../assets/product/new/new03.jpg")} alt="신제품03" />
                </SwiperSlide>
            </Swiper>
            <div className="info">
                <form method="post">
                    <h2>
                        <strong>로즈마리 헤어 씨크닝 컨디셔너 바 115G</strong>
                    </h2>
                    <div className="price-wish-container flex">
                        <span className="price big-txt">
                            <strong>{price}원</strong>
                        </span>
                        <span className="wish-btn-wrap">
                            <button type="button" className={wishToggle ? "wish-btn on" : "wish-btn"} onClick={openWishPop}></button>
                        </span>
                    </div>
                    <hr />
                    <div className="cnt-container flex">
                        <span className="cnt-box">
                            <button type="button" className="minus" onClick={minus}></button>
                            <input type="text" className="cnt" value={count} onChange={changeCnt} />
                            <button type="button" className="plus" onClick={plus}></button>
                        </span>
                        <span className="price big-txt">
                            <strong>{totPrice}원</strong>
                        </span>
                    </div>
                    <p>30,000원 이상 구매 시 무료 배송</p>
                    <div className="util-btn-container flex">
                        <div className="cart-btn-wrap">
                            <button className="cart-btn gray-style-btn" type="button" onClick={() => props.open("cart")}>
                                장바구니
                            </button>
                        </div>
                        <div className="order-btn-wrap">
                            <button className="order-btn">구매하기</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

type NavProp = {
    onChangeTap: Function;
};

function Nav(props: NavProp) {
    const [detailClass, setDetailClass] = useState(" on");
    const [reviewClass, setReviewClass] = useState("");

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
                        구매후기 (3)
                    </button>
                </li>
            </ul>
        </nav>
    );
}

type ReviewProp = {
    open: Function;
};

function ReviewSection(props: ReviewProp) {
    const reviews = [];

    for (let i = 0; i < 3; i++) {
        reviews.push(
            <div key={i} className="review-container">
                <div className="flex">
                    <span className="review-point">
                        <span className="point" style={{ width: "60%" }}></span>
                    </span>
                    <span className="info">
                        <span className="user-id">sohy****</span>
                        <span>2022.05.16</span>
                    </span>
                </div>
                <div className="content">
                    <p>세안 후 촉촉해서 자주 쓰는 아이템입니다.</p>
                    <div className="thumb">
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
                    </div>
                </div>
            </div>
        );
    }

    function resize(e: React.MouseEvent<HTMLElement>) {
        let a = (e.target as HTMLElement).parentNode;
        (a as HTMLAnchorElement).removeAttribute("href");

        let thumb: ParentNode | null = null;
        if (a !== null) {
            thumb = a.parentNode;
            if (thumb !== null) (thumb as HTMLElement).classList.add("resize");
        }
    }

    return (
        <section className="review-section">
            <div className="section-inner">
                <div className="section-top flex">
                    <h1>REVIEW</h1>
                    <div className="review-btn-wrap">
                        <button className="review-pop-btn border-style-btn" onClick={() => props.open("review")}>
                            후기 작성하기
                        </button>
                    </div>
                </div>
                <div className="total-point">
                    <p style={{ margin: "0" }}>구매자 평점</p>
                    <p className="rating">
                        <strong>4.9</strong>
                    </p>
                    <div className="review-point">
                        <span className="point" style={{ width: "60%" }}></span>
                    </div>
                </div>
                {reviews}
            </div>
        </section>
    );
}

function Main() {
    let content;
    const [tap, setTap] = useState("detail");
    const [pop, setPop] = useState<string>("");
    const [popContent, setPopContent] = useState<JSX.Element | null>(null);

    if (tap === "detail") {
        content = (
            <div className="detail-wrap">
                <img src={require("../../../assets/product/detail/product_content.jpg")} alt="상세정보" />
            </div>
        );
    } else if (tap === "review") {
        content = <ReviewSection open={(_pop: string) => setPop(_pop)} />;
    }

    function closePop() {
        setPop("");
        setPopContent(null);
    }

    useEffect(() => {
        if (pop === "wish") {
            setPopContent(<WishPop close={closePop} />);
        } else if (pop === "cart") {
            setPopContent(<CartPop close={closePop} />);
        } else if (pop === "review") {
            setPopContent(<ReviewPop close={closePop} />);
        }
    }, [pop]);

    return (
        <main>
            <div className="detail-container big-container">
                <ProductSection price="42000" open={(_pop: string) => setPop(_pop)} />
                <Nav onChangeTap={(_tap: string) => setTap(_tap)}></Nav>
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
