import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MoveTop from "../../components/MoveTop/MoveTop";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getImage } from "../../utils/getImage";

function Slider() {
    return (
        <div>
            <Swiper
                modules={[Pagination, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000 }}
            >
                <SwiperSlide>
                    <img src={require("../../assets/main/main01.jpg")} alt="메인01" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../../assets/main/main02.jpg")} alt="메인02" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={require("../../assets/main/main03.jpg")} alt="메인03" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

type SectionProp = {
    products: any[];
};

function HairSection(props: SectionProp) {
    return (
        <section className="hair-section flex">
            <div className="section-inner-left">
                <h1 className="section-title">HAIR CARE</h1>
                <p className="section-desc small-txt">다양한 헤어케어를 경험해보세요</p>
                <Link to="/hair" className="border-style-btn small-txt">
                    헤어케어 제품 더보기
                </Link>
            </div>
            <div className="section-inner-right">
                <ul className="product-list flex">{props.products}</ul>
            </div>
        </section>
    );
}

function SkinSection(props: SectionProp) {
    return (
        <section className="skin-section flex">
            <div className="section-inner-left">
                <h1 className="section-title">SKIN CARE</h1>
                <p className="section-desc small-txt">건강한 피부를 만드는 스킨케어를 만나보세요</p>
                <Link to="/skin" className="border-style-btn small-txt">
                    스킨케어 제품 더보기
                </Link>
            </div>
            <div className="section-inner-right">
                <ul className="product-list flex">{props.products}</ul>
            </div>
        </section>
    );
}

function BodySection(props: SectionProp) {
    return (
        <section className="body-section flex">
            <div className="section-inner-left">
                <h1 className="section-title">BODY CARE</h1>
                <p className="section-desc small-txt">일상의 무게를 줄여주는 아로마테라피 바디케어를 경험해보세요</p>
                <Link to="/body" className="border-style-btn small-txt">
                    바디케어 제품 더보기
                </Link>
            </div>
            <div className="section-inner-right">
                <ul className="product-list flex">{props.products}</ul>
            </div>
        </section>
    );
}

function Main() {
    const [hairProducts, setHairProducts] = useState<any[]>([]);
    const [skinProducts, setSkinProducts] = useState<any[]>([]);
    const [bodyProducts, setBodyProducts] = useState<any[]>([]);

    const fetchProducts = async (section: string) => {
        const q = query(collection(db, "product"), where("product_type", "==", section), orderBy("product_id", "desc"), limit(3));
        const productSnapshot = await getDocs(q);

        // storage 이미지 가져오기
        const promises = productSnapshot.docs.map(doc => getImage(doc.data().product_thumb_01));
        const urls = await Promise.all(promises);

        // firestore 데이터 가져와서 리스트 만들기
        const productList = [];
        productSnapshot.docs.forEach((doc, i) => {
            const data = doc.data();

            productList.push(
                <li key={doc.id} className="product">
                    <Link
                        to="/detail"
                        state={{
                            name: data.product_name,
                            price: data.product_price,
                            thumb01: data.product_thumb_01,
                            thumb02: data.product_thumb_02,
                            thumb03: data.product_thumb_03,
                            detail: data.product_detail
                        }}
                    >
                        <div className="thumb">
                            <img src={urls[i]} alt={data.product_name} />
                        </div>
                        <div className="info">
                            <div className="name">
                                <strong>{data.product_name}</strong>
                            </div>
                            <div className="price">
                                <strong>{data.product_price}원</strong>
                            </div>
                        </div>
                    </Link>
                </li>
            );
        });

        if (section === "hair") {
            setHairProducts(productList);
        } else if (section === "skin") {
            setSkinProducts(productList);
        } else if (section === "body") {
            setBodyProducts(productList);
        }
    };

    useEffect(() => {
        fetchProducts("hair");
        fetchProducts("skin");
        fetchProducts("body");
    }, []);

    return (
        <main className="main-container">
            <Slider />
            <HairSection products={hairProducts} />
            <SkinSection products={skinProducts} />
            <BodySection products={bodyProducts} />
            <MoveTop />
        </main>
    );
}

function Home() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Home;
