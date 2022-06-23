import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer>
            <div className="footer-container small-txt">
                <div className="logo">
                    <img src={require("../../assets/common/logo.png")} alt="로고" />
                </div>
                <div className="policy-nav">
                    <Link to="/TermsOfUse">이용약관 | </Link>
                    <Link to="/PrivacyPolicy">개인정보 처리방침</Link>
                </div>
                <p className="company-info">Copyright © THE NATURAL All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
