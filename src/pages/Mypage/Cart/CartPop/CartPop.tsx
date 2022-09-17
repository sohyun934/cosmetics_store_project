import { Link } from "react-router-dom";
import styled from "styled-components";

type Prop = {
    close: Function;
    title: string;
};

const StyledDiv = styled.div`
    width: 300px;

    @media (max-width: 500px) {
        width: 60%;
    }
`;

function CartPop(props: Prop) {
    return (
        <div>
            <StyledDiv className="popup-container">
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
                <button type="button" className="pop-close-btn" aria-label="close button" onClick={() => props.close()}></button>
            </StyledDiv>
            <div className="dim"></div>
        </div>
    );
}

export default CartPop;
