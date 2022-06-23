import { Link } from "react-router-dom";
import "./WishPop.css";

type Prop = {
    close: Function;
};

function WishPop(props: Prop) {
    return (
        <div>
            <div className="popup-container cart-pop">
                <h2>WISHLIST</h2>
                <hr />
                <p className="small-txt">
                    <strong>상품이 위시리스트에 담겼습니다.</strong>
                </p>
                <div className="pop-btn-container flex">
                    <button className="radius-style-btn" onClick={() => props.close()}>
                        쇼핑 계속하기
                    </button>
                    <Link to="/mypage/wishList">
                        <button className="radius-style-btn">위시리스트 이동</button>
                    </Link>
                </div>
                <button type="button" className="pop-close-btn" onClick={() => props.close()}></button>
            </div>
            <div className="dim"></div>
        </div>
    );
}

export default WishPop;
