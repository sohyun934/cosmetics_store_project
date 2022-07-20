import "./Lnb.css";
import { Link } from "react-router-dom";

type Prop = {
    title: String;
};

function Lnb(props: Prop) {
    const lnb = [
        { path: "modify", title: "회원정보" },
        { path: "orderList", title: "주문내역" },
        { path: "cart", title: "장바구니" }
    ];

    const lis = [];

    for (let i = 0; i < lnb.length; i++) {
        const nav = lnb[i];
        let className = nav.path;
        if (className === props.title) className += " on";

        lis.push(
            <li key={i}>
                <Link to={"/mypage/" + nav.path} className={className}>
                    {nav.title}
                </Link>
            </li>
        );
    }

    return (
        <nav className="mypage-lnb">
            <ul className="flex">{lis}</ul>
        </nav>
    );
}

export default Lnb;
