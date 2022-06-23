import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MoveTop from "../../components/MoveTop/MoveTop";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

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

function NewSection() {
    return (
        <section className="new-section flex">
            <div className="section-inner-left">
                <h1 className="section-title">NEW</h1>
                <p className="section-desc small-txt">가장 먼저 만나보는 더 내추럴의 신제품</p>
                <Link to="/new" className="border-style-btn small-txt">
                    새로운 제품 더보기
                </Link>
            </div>
            <div className="section-inner-right">
                <ul className="product-list flex">
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/new/new01.jpg")} alt="신제품01" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>티트리 밸런싱 클렌징 바 110G</strong>
                                </div>
                                <div className="price">
                                    <strong>22,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/new/new02.jpg")} alt="신제품02" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>로즈마리 헤어 씨크닝 컨디셔너 바 115G</strong>
                                </div>
                                <div className="price">
                                    <strong>22,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/new/new03.jpg")} alt="신제품03" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>로즈마리 스칼프 스케일링 샴푸 바 135G</strong>
                                </div>
                                <div className="price">
                                    <strong>22,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

function HairSection() {
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
                <ul className="product-list flex">
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/hair/hair01.jpg")} alt="헤어케어01" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>로즈마리 스칼프 스케일링 샴푸 1L</strong>
                                </div>
                                <div className="price">
                                    <strong>42,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/hair/hair02.jpg")} alt="헤어케어02" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>티트리 퓨리파잉 샴푸 400ML</strong>
                                </div>
                                <div className="price">
                                    <strong>20,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/hair/hair03.jpg")} alt="헤어케어03" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>퀴노아 프로틴 샴푸 400ML</strong>
                                </div>
                                <div className="price">
                                    <strong>18,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

function SkinSection() {
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
                <ul className="product-list flex">
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/skin/skin01.jpg")} alt="스킨케어01" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>알로에 하이펙티브 세럼 50ML</strong>
                                </div>
                                <div className="price">
                                    <strong>33,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/skin/skin02.jpg")} alt="스킨케어02" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>바이탈라이징 로즈마리 컨센트레이티드 에센스 100ML</strong>
                                </div>
                                <div className="price">
                                    <strong>28,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/skin/skin03.jpg")} alt="스킨케어03" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>수딩 알로에 베라 젤 300ML</strong>
                                </div>
                                <div className="price">
                                    <strong>11,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

function BodySection() {
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
                <ul className="product-list flex">
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/body/body01.jpg")} alt="바디케어01" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>임브레이스 바디워시 네롤리 & 패츌리 300ML</strong>
                                </div>
                                <div className="price">
                                    <strong>28,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/body/body02.jpg")} alt="바디케어02" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>서렌 바디워시 라벤더 & 마조람 300ML</strong>
                                </div>
                                <div className="price">
                                    <strong>28,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={require("../../assets/product/body/body03.jpg")} alt="바디케어03" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    <strong>티트리 밸런싱 클렌징 바 110G</strong>
                                </div>
                                <div className="price">
                                    <strong>22,000원</strong>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

function Main() {
    return (
        <main className="main-container">
            <Slider />
            <NewSection />
            <HairSection />
            <SkinSection />
            <BodySection />
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
