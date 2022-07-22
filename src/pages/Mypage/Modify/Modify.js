"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Modify.css");
const react_1 = require("react");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const Lnb_1 = __importDefault(require("../../../components/Lnb/Lnb"));
const react_hook_form_1 = require("react-hook-form");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const react_daum_postcode_1 = require("react-daum-postcode");
const styled_components_1 = __importDefault(require("styled-components"));
const auth_1 = require("firebase/auth");
const react_router_dom_1 = require("react-router-dom");
const StyledInput = styled_components_1.default.input `
    &:read-only {
        border-bottom: 1px solid #e5e5e5 !important;
    }
`;
function Form() {
    var _a, _b, _c, _d;
    const [disabled, setDisabled] = (0, react_1.useState)(true);
    const [userState, setUserState] = (0, react_1.useState)({
        name: "",
        email: "",
        phoneNumber: "",
        postCode: "",
        address: "",
        detailAddress: ""
    });
    const { register, handleSubmit, formState: { errors, isValid }, getValues, setValue } = (0, react_hook_form_1.useForm)({ mode: "onChange" });
    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = (0, react_daum_postcode_1.useDaumPostcodePopup)(scriptUrl);
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    const userPw = state.password;
    const fetchUser = (user) => __awaiter(this, void 0, void 0, function* () {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", user.email));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        querySnapshot.forEach(doc => {
            const user = doc.data();
            setUserState({
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                postCode: user.post_code,
                address: user.address,
                detailAddress: user.detail_address
            });
        });
    });
    (0, react_1.useEffect)(() => {
        (0, auth_1.onAuthStateChanged)(firebase_1.auth, user => {
            if (user) {
                fetchUser(user);
            }
        });
    }, []);
    // 다음 우편번호 API
    const handleComplete = data => {
        let addr = "";
        // 사용자가 도로명 주소를 선택했을 경우
        if (data.userSelectedType === "R")
            addr = data.roadAddress;
        // 사용자가 지번 주소를 선택했을 경우(J)
        else
            addr = data.jibunAddress;
        setUserState(userState => (Object.assign(Object.assign({}, userState), { postCode: data.zonecode, address: addr })));
    };
    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    // 유효성 검증 완료 후 수정 버튼 활성화
    (0, react_1.useEffect)(() => {
        if (isValid) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [isValid, errors]);
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        const user = firebase_1.auth.currentUser;
        const credential = auth_1.EmailAuthProvider.credential(user.email, userPw);
        // 비밀번호 업데이트
        (0, auth_1.reauthenticateWithCredential)(user, credential).then(() => {
            (0, auth_1.updatePassword)(user, getValues("password"));
        });
        // 회원정보 업데이트
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", user.email));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        querySnapshot.forEach((document) => __awaiter(this, void 0, void 0, function* () {
            const userRef = (0, firestore_1.doc)(firebase_1.db, "users", document.id);
            yield (0, firestore_1.updateDoc)(userRef, {
                post_code: userState.postCode,
                address: userState.address,
                detail_address: userState.detailAddress
            }).then(() => {
                setValue("password", "");
                setValue("confirmPw", "");
                alert("회원정보 수정이 완료되었습니다.");
            });
        }));
    });
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "modify-form", method: "post", onSubmit: handleSubmit(onSubmit) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { type: "text", placeholder: "\uC774\uBA54\uC77C", value: userState.email, readOnly: true }), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638" }, register("password", {
                        required: true,
                        pattern: regExpPw,
                        minLength: 8,
                        maxLength: 16
                    }))), ((_a = errors.password) === null || _a === void 0 ? void 0 : _a.type) === "required" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694." })), (((_b = errors.password) === null || _b === void 0 ? void 0 : _b.type) === "pattern" || ((_c = errors.password) === null || _c === void 0 ? void 0 : _c.type) === "minLength" || ((_d = errors.password) === null || _d === void 0 ? void 0 : _d.type) === "maxLength") && ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "8~16\uC790 \uC774\uB0B4\uB85C \uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790\uB97C \uD3EC\uD568\uD558\uC5EC \uC785\uB825\uD574 \uC8FC\uC138\uC694." }))), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" }, register("confirmPw", {
                        validate: value => value === getValues("password")
                    }))), errors.confirmPw && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsx)(StyledInput, { type: "text", value: userState.name, readOnly: true }), (0, jsx_runtime_1.jsx)(StyledInput, { type: "text", value: userState.phoneNumber, readOnly: true }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "postcode-wrap" }, { children: [(0, jsx_runtime_1.jsx)(StyledInput, { className: "userPostcode", type: "text", placeholder: "\uC6B0\uD3B8\uBC88\uD638", value: userState.postCode || "", onChange: e => setUserState(userState => (Object.assign(Object.assign({}, userState), { postCode: e.target.value }))), readOnly: true }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "search-btn", onClick: handleClick })] })), (0, jsx_runtime_1.jsx)(StyledInput, { className: "userAddress", type: "text", placeholder: "\uAE30\uBCF8 \uC8FC\uC18C", value: userState.address || "", onChange: e => setUserState(userState => (Object.assign(Object.assign({}, userState), { address: e.target.value }))), readOnly: true }), (0, jsx_runtime_1.jsx)("input", { className: "userDetailAddress", type: "text", placeholder: "\uC0C1\uC138 \uC8FC\uC18C", value: userState.detailAddress || "", onChange: e => setUserState(userState => (Object.assign(Object.assign({}, userState), { detailAddress: e.target.value }))) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "modify-btn", disabled: disabled }, { children: "\uD68C\uC6D0\uC815\uBCF4\uC218\uC815" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "member-leave small-txt" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", onClick: event => event.preventDefault() }, { children: "\uD68C\uC6D0\uD0C8\uD1F4" })) }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "big-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "MYPAGE" }), (0, jsx_runtime_1.jsx)(Lnb_1.default, { title: "modify" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modify-wrap" }, { children: (0, jsx_runtime_1.jsx)(Form, {}) }))] })) }));
}
function Modify() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const state = location.state;
    (0, react_1.useEffect)(() => {
        if (!state) {
            // 비밀번호 인증을 거치지 않은 경우
            navigate("/mypage/myPageAuthentification");
        }
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] })) }));
}
exports.default = Modify;
