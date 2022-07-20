import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import FindPw from "../pages/Member/FindPw/FindPw";
import Join from "../pages/Member/Join/Join";
import Welcome from "../pages/Member/Welcome/Welcome";
import Cart from "../pages/Mypage/Cart/Cart";
import Modify from "../pages/Mypage/Modify/Modify";
import MyPageAuthentification from "../pages/Mypage/MyPageAuthentification/MyPageAuthentification";
import OrderDetail from "../pages/Mypage/OrderDetail/OrderDetail";
import OrderList from "../pages/Mypage/OrderList/OrderList";
import Order from "../pages/Order/Order";
import OrderComplete from "../pages/Order/OrderComplete/OrderComplete";
import Best from "../pages/Product/Best/Best";
import Body from "../pages/Product/Body/Body";
import Detail from "../pages/Product/Detail/Detail";
import Hair from "../pages/Product/Hair/Hair";
import New from "../pages/Product/New/New";
import Skin from "../pages/Product/Skin/Skin";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse/TermsOfUse";
import NotFound from "../pages/NotFound/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/member/findPw" element={<FindPw />} />
            <Route path="/member/join" element={<Join />} />
            <Route path="/member/welcome" element={<Welcome />} />
            <Route path="/mypage/cart" element={<Cart />} />
            <Route path="/mypage/modify" element={<Modify />} />
            <Route path="/mypage/myPageAuthentification" element={<MyPageAuthentification />} />
            <Route path="/mypage/orderDetail" element={<OrderDetail />} />
            <Route path="/mypage/OrderList" element={<OrderList />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/orderComplete" element={<OrderComplete />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/termsOfUse" element={<TermsOfUse />} />
            <Route path="/best" element={<Best />} />
            <Route path="/body" element={<Body />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/hair" element={<Hair />} />
            <Route path="/new" element={<New />} />
            <Route path="/skin" element={<Skin />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
