import "./Home.css";
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
import { getFormatPrice } from "../../utils/getFormatPrice";

function Slider() {
    const slideList = [];
    for (let i = 1; i <= 3; i++) {
        slideList.push(
            <SwiperSlide key={i}>
                <img src={require(`../../assets/main/main0${i}.jpg`)} alt={`메인0${i}`} />
            </SwiperSlide>
        );
    }

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
                {slideList}
            </Swiper>
        </div>
    );
}

type SectionProp = {
    sections: {};
};

function Section(props: SectionProp) {
    const sections = props.sections;
    const sectionsList = [];

    for (let key in sections) {
        const section = sections[key];

        sectionsList.push(
            <section key={section.title} className="flex">
                <div className="section-inner-left">
                    <h1 className="section-title">{section.title}</h1>
                    <p className="section-desc small-txt">{section.desc}</p>
                    <Link to={section.link_to} className="border-style-btn small-txt">
                        {section.link_content}
                    </Link>
                </div>
                <div className="section-inner-right">
                    <ul className="product-list flex">{section.products}</ul>
                </div>
            </section>
        );
    }

    return <>{sectionsList}</>;
}

function Home() {
    const [sections, setSections] = useState({
        hair: { title: "HAIR CARE", desc: "다양한 헤어케어를 경험해보세요", link_to: "/hair", link_content: "헤어케어 제품 더보기", products: [] },
        skin: { title: "SKIN CARE", desc: "건강한 피부를 만드는 스킨케어를 만나보세요", link_to: "/skin", link_content: "스킨케어 제품 더보기", products: [] },
        body: {
            title: "BODY CARE",
            desc: "일상의 무게를 줄여주는 아로마테라피 바디케어를 경험해보세요",
            link_to: "/body",
            link_content: "바디케어 제품 더보기",
            products: []
        }
    });

    const copiedSections = { ...sections };

    const fetchProducts = async (section: string) => {
        const q = query(collection(db, "product"), where("product_type", "==", section), orderBy("product_id", "desc"), limit(3));
        const productSnapshot = await getDocs(q);

        // storage 이미지 가져오기
        const promises = productSnapshot.docs.map(doc => getImage(doc.data().product_thumb_01));
        const urls = await Promise.all(promises);

        // firestore 데이터 가져와서 리스트 만들기
        const products = productSnapshot.docs.map((doc, i) => {
            const data = doc.data();

            return (
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
                            <span className="price">
                                <strong>{getFormatPrice(data.product_price)}</strong>
                            </span>
                            <span>원</span>
                        </div>
                    </Link>
                </li>
            );
        });

        copiedSections[section].products = products;
    };

    useEffect(() => {
        Promise.all([fetchProducts("hair"), fetchProducts("skin"), fetchProducts("body")]).then(() => {
            setSections(copiedSections);
        });
    }, []);

    return (
        <main className="main-container">
            <Slider />
            <Section sections={sections} />
            <MoveTop />
        </main>
    );
}

export default Home;
