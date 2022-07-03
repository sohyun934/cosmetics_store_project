import MoveTop from "../MoveTop/MoveTop";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

function ProductMain() {
    const [empty, setEmpty] = useState(false);
    const [products, setProducts] = useState([]);
    const [wishToggle, setWishToggle] = useState(false);
    const pathname = useLocation().pathname.substring(1);

    const category = {
        new: {
            title: "NEW",
            desc: "가장 먼저 만나보는 더 내추럴의 신제품"
        },
        best: {
            title: "BEST",
            desc: "가장 사랑 받는 더 내추럴의 베스트 제품"
        },
        hair: {
            title: "HAIR CARE",
            desc: "다양한 헤어케어를 경험해보세요"
        },
        skin: {
            title: "SKIN CARE",
            desc: "건강한 피부를 만드는 스킨케어를 만나보세요"
        },
        body: {
            title: "BODY CARE",
            desc: "일상의 무게를 줄여주는 바디케어를 경험해보세요"
        }
    };

    async function getImage(url: string) {
        const productRef = ref(storage, url);
        const imageUrl = await getDownloadURL(productRef);
        return imageUrl;
    }

    async function fetchProducts() {
        const q = query(collection(db, "product"), where("product_type", "==", pathname));
        const productSnapshot = await getDocs(q);

        if (productSnapshot.empty) {
            setEmpty(true);
        } else {
            // storage 이미지 가져오기
            const promises = productSnapshot.docs.map(doc => getImage(doc.data().product_url));
            const urls = await Promise.all(promises);

            // firestore 데이터 가져와서 리스트 만들기
            const productList = [];
            productSnapshot.docs.map(async (doc, i) => {
                const data = doc.data();

                productList.push(
                    <li key={doc.id} className="product">
                        <Link to="/detail">
                            <div className="thumb">
                                <img src={urls[i]} alt={data.product_name} />
                                <button className={wishToggle ? "wish-btn on " : "wish-btn"} onClick={() => setWishToggle(!wishToggle)}></button>
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
                        <div className="util-btn-container">
                            <button className="cart-btn gray-style-btn">
                                <span>CART</span>
                            </button>
                        </div>
                    </li>
                );
            });

            setProducts(productList);
        }
    }

    useEffect(() => {
        fetchProducts();
    });

    return (
        <main>
            <section className="product-section">
                <div className="section-title">
                    <h1>{category[pathname].title}</h1>
                    <p>{category[pathname].desc}</p>
                </div>
                <div className="list-filter">
                    <select>
                        <option value="new">등록순</option>
                        <option value="rank">판매순</option>
                        <option value="low-price">낮은가격순</option>
                        <option value="high-price">높은가격순</option>
                    </select>
                </div>
                <ul className="product-list flex">{empty ? "등록된 상품이 없습니다." : products}</ul>
            </section>
            <MoveTop />
        </main>
    );
}

export default ProductMain;