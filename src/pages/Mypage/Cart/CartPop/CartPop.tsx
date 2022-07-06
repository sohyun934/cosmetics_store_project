import { Link } from "react-router-dom";
import "./CartPop.css";

type Prop = {
    close: Function;
    title: string;
};

function CartPop(props: Prop) {
    return (
        <div>
            <div className="popup-container cart-pop">
                <h2>CART</h2>
                <hr />
                <p className="small-txt">
                    <strong>{props.title}</strong>
                </p>
                <div className="pop-btn-container flex">
                    <button className="radius-style-btn" onClick={() => props.close()}>
                        쇼핑 계속하기
                    </button>
                    <Link to="/mypage/cart">
                        <button className="radius-style-btn">장바구니 이동</button>
                    </Link>
                </div>
                <button type="button" className="pop-close-btn" onClick={() => props.close()}></button>
            </div>
            <div className="dim"></div>
        </div>
    );
}

export default CartPop;
