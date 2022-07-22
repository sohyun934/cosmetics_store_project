import { Routes, Route, Navigate } from "react-router-dom";
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
import Body from "../pages/Product/Body/Body";
import Detail from "../pages/Product/Detail/Detail";
import Hair from "../pages/Product/Hair/Hair";
import Skin from "../pages/Product/Skin/Skin";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse/TermsOfUse";
import NotFound from "../pages/NotFound/NotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
        });
    }, [user]);

    return (
        <>
            {user !== undefined && (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/member/findPw" element={<FindPw />} />
                    <Route path="/member/join" element={<Join />} />
                    <Route path="/member/welcome" element={<Welcome />} />
                    <Route path="/mypage/cart" element={user !== null ? <Cart /> : <Navigate to="/login" state={{ moveTo: -1 }} />} />
                    <Route path="/mypage/modify" element={<Modify />} />
                    <Route
                        path="/mypage/myPageAuthentification"
                        element={user !== null ? <MyPageAuthentification /> : <Navigate to="/login" state={{ moveTo: -1 }} />}
                    />
                    <Route path="/mypage/orderDetail" element={user !== null ? <OrderDetail /> : <Navigate to="/login" state={{ moveTo: -1 }} />} />
                    <Route path="/mypage/orderList" element={user !== null ? <OrderList /> : <Navigate to="/login" state={{ moveTo: -1 }} />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/order/orderComplete" element={<OrderComplete />} />
                    <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                    <Route path="/termsOfUse" element={<TermsOfUse />} />
                    <Route path="/body" element={<Body />} />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/hair" element={<Hair />} />
                    <Route path="/skin" element={<Skin />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            )}
        </>
    );
}

export default App;
