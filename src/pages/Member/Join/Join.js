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
require("./Join.css");
const Header_1 = __importDefault(require("../../../components/Header/Header"));
const Footer_1 = __importDefault(require("../../../components/Footer/Footer"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const PrivacyPolicy_1 = require("../../PrivacyPolicy/PrivacyPolicy");
const TermsOfUse_1 = require("../../TermsOfUse/TermsOfUse");
const react_hook_form_1 = require("react-hook-form");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../../firebase");
const auth_1 = require("firebase/auth");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledDiv = styled_components_1.default.div `
    width: 590px;
    height: 650px;

    @media (max-width: 900px) {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 0;
        -moz-border-radius: 0;
        -webkit-border-radius: 0;
    }
`;
function TermsPop(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(StyledDiv, Object.assign({ className: "popup-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uC774\uC6A9\uC57D\uAD00" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)(TermsOfUse_1.TermsOfUseDetail, {}), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.closePop() })] })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
function PrivacyPop(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(StyledDiv, Object.assign({ className: "popup-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)(PrivacyPolicy_1.PrivacyPolicyDetail, {}), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "pop-close-btn", onClick: () => props.closePop() })] })), (0, jsx_runtime_1.jsx)("div", { className: "dim" })] }));
}
function Agree(props) {
    const [checkList, setCheckList] = (0, react_1.useState)([]);
    const [termsPop, setTermsPop] = (0, react_1.useState)(null);
    const [privacyPop, setPrivacyPop] = (0, react_1.useState)(null);
    const termsPopContent = (0, jsx_runtime_1.jsx)(TermsPop, { closePop: () => setTermsPop(null) });
    const privacyPopContent = (0, jsx_runtime_1.jsx)(PrivacyPop, { closePop: () => setPrivacyPop(null) });
    // 체크박스 단일 선택
    const handleSingleCheck = (isChecked, checkItem) => {
        if (isChecked) {
            setCheckList(checkList => [...checkList, checkItem]);
        }
        else {
            setCheckList(checkList => checkList.filter(el => el !== checkItem));
        }
    };
    // 체크박스 전체 선택
    const handleAllCheck = (isChecked) => {
        if (isChecked) {
            setCheckList(["termsOfService", "privacy"]);
        }
        else {
            setCheckList([]);
        }
    };
    (0, react_1.useEffect)(() => {
        props.allChk(checkList.length === 2);
    }, [checkList, props]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "agree-container small-txt" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { id: "agreeAllChk", type: "checkbox", checked: checkList.length === 2 ? true : false, onChange: e => handleAllCheck(e.target.checked) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "agreeAllChk" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC804\uCCB4\uC57D\uAD00 \uD56D\uBAA9\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4." }) }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { id: "agreeServiceChk", type: "checkbox", checked: checkList.includes("termsOfService") ? true : false, onChange: e => handleSingleCheck(e.target.checked, "termsOfService") }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "agreeServiceChk" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uC774\uC6A9\uC57D\uAD00 \uB3D9\uC758 (\uD544\uC218)" }) })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", className: "terms-pop-link", onClick: event => {
                            event.preventDefault();
                            setTermsPop(termsPopContent);
                        } }, { children: "\uBCF4\uAE30" }))] }), termsPop, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { id: "agreePrivacyChk", type: "checkbox", checked: checkList.includes("privacy") ? true : false, onChange: e => handleSingleCheck(e.target.checked, "privacy") }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "agreePrivacyChk" }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1 \uBC0F \uC774\uC6A9 \uB3D9\uC758 (\uD544\uC218)" }) })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/", className: "privacy-pop-link", onClick: event => {
                            event.preventDefault();
                            setPrivacyPop(privacyPopContent);
                        } }, { children: "\uBCF4\uAE30" }))] }), privacyPop] })));
}
function Form() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const { register, handleSubmit, trigger, formState: { errors, isValid }, getValues, setError, setValue, watch } = (0, react_hook_form_1.useForm)({ mode: "onChange" });
    const email = watch("email");
    const password = getValues("password");
    const authCode = watch("authCode");
    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    const regExpPhoneNumber = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const [emailSuccessMsg, setEmailSuccessMsg] = (0, react_1.useState)("none");
    const [codeInputDisplay, setCodeInputDisplay] = (0, react_1.useState)("none");
    const [authSuccessMsg, setAuthSucessMsg] = (0, react_1.useState)("none");
    const [allChk, setAllChk] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    // 이메일 중복 확인
    const fetchUser = () => __awaiter(this, void 0, void 0, function* () {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", getValues("email")));
        const userSnapshot = yield (0, firestore_1.getDocs)(q);
        return userSnapshot.size > 0;
    });
    (0, react_1.useEffect)(() => {
        var _a;
        if (email) {
            if (!((_a = errors.email) === null || _a === void 0 ? void 0 : _a.type)) {
                setEmailSuccessMsg("block");
            }
            else {
                setEmailSuccessMsg("none");
            }
        }
    }, [email, (_a = errors.email) === null || _a === void 0 ? void 0 : _a.type]);
    // 휴대폰 인증 번호 전송
    const handlePhoneAuth = () => {
        var _a;
        const phoneNumber = getValues("phoneNumber");
        if (!phoneNumber) {
            trigger("phoneNumber");
        }
        else if (!((_a = errors.phoneNumber) === null || _a === void 0 ? void 0 : _a.type)) {
            if (!window.recaptchaVerifier) {
                // 인증 번호 최초 요청 시
                window.recaptchaVerifier = new auth_1.RecaptchaVerifier("authCodeBtn", {
                    size: "invisible",
                    callback: (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                    }
                }, firebase_1.auth);
            }
            else {
                // 인증 번호 재요청 시
                setValue("authCode", "");
                window.recaptchaVerifier.recaptcha.reset();
            }
            const appVerifier = window.recaptchaVerifier;
            (0, auth_1.signInWithPhoneNumber)(firebase_1.auth, "+82" + phoneNumber, appVerifier)
                .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                setCodeInputDisplay("block");
            })
                .catch(error => {
                setError("phoneNumber", {
                    type: "server",
                    message: "SMS 발송에 실패하였습니다."
                });
            });
        }
    };
    // 휴대폰 인증 번호 검증
    (0, react_1.useEffect)(() => {
        // 인증 번호 요청 후 검증 시작
        if (window.confirmationResult) {
            if (authCode.length !== 6) {
                setAuthSucessMsg("none");
            }
            else {
                window.confirmationResult
                    .confirm(authCode)
                    .then((result) => {
                    setAuthSucessMsg("block");
                    // 인증 후 자동 로그인 해제
                    (0, auth_1.signOut)(firebase_1.auth).then(() => { });
                })
                    .catch((error) => {
                    setAuthSucessMsg("none");
                    if (error.code === "auth/invalid-verification-code") {
                        setError("authCode", {
                            type: "confirm",
                            message: "인증번호가 일치하지 않습니다."
                        });
                    }
                    else if (error.code === "auth/code-expired") {
                        setError("authCode", {
                            type: "expired",
                            message: "인증이 만료되었습니다. 인증번호를 다시 요청해주세요."
                        });
                    }
                });
            }
        }
    }, [authCode, setError]);
    // 신규 회원 데이터 create
    const onSubmit = data => {
        (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password)
            .then(() => __awaiter(this, void 0, void 0, function* () {
            yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, "users"), {
                name: data.name,
                email: data.email,
                phone_number: data.phoneNumber
            });
            window.recaptchaVerifier = null;
            window.confirmationResult = null;
            navigate("/member/welcome", {
                replace: true,
                state: { join: "complete" }
            });
        }))
            .catch(error => {
            alert("가입 과정 중 오류가 발생했습니다.\n" + error.message);
        });
    };
    return ((0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "join-form", method: "post", onSubmit: handleSubmit(onSubmit) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "text", placeholder: "\uC774\uBA54\uC77C" }, register("email", {
                        required: true,
                        pattern: regExpEmail,
                        validate: () => __awaiter(this, void 0, void 0, function* () { return (yield fetchUser()) === false; })
                    }))), ((_b = errors.email) === null || _b === void 0 ? void 0 : _b.type) === "required" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694." })), ((_c = errors.email) === null || _c === void 0 ? void 0 : _c.type) === "pattern" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uC774\uBA54\uC77C \uD615\uC2DD\uC785\uB2C8\uB2E4." })), ((_d = errors.email) === null || _d === void 0 ? void 0 : _d.type) === "validate" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uC774\uBBF8 \uC874\uC7AC\uD558\uB294 \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "success-msg", style: { display: emailSuccessMsg } }, { children: "\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638" }, register("password", {
                        required: true,
                        pattern: regExpPw,
                        minLength: 8,
                        maxLength: 16,
                        validate: () => trigger("confirmPw")
                    }))), ((_e = errors.password) === null || _e === void 0 ? void 0 : _e.type) === "required" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694." })), (((_f = errors.password) === null || _f === void 0 ? void 0 : _f.type) === "pattern" || ((_g = errors.password) === null || _g === void 0 ? void 0 : _g.type) === "minLength" || ((_h = errors.password) === null || _h === void 0 ? void 0 : _h.type) === "maxLength") && ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "8~16\uC790 \uC774\uB0B4\uB85C \uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790\uB97C \uD3EC\uD568\uD558\uC5EC \uC785\uB825\uD574 \uC8FC\uC138\uC694." }))), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" }, register("confirmPw", {
                        validate: value => value === getValues("password")
                    }))), errors.confirmPw && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "text", placeholder: "\uC774\uB984" }, register("name", {
                        required: true
                    }))), errors.name && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uC774\uB984\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694." })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex" }, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "text", placeholder: "\uD734\uB300\uD3F0 \uBC88\uD638" }, register("phoneNumber", {
                                required: true,
                                pattern: regExpPhoneNumber
                            }))), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "authCodeBtn", type: "button", className: "radius-style-btn", onClick: handlePhoneAuth }, { children: "\uC778\uC99D\uBC88\uD638 \uC694\uCCAD" }))] })), ((_j = errors.phoneNumber) === null || _j === void 0 ? void 0 : _j.type) === "required" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." })), ((_k = errors.phoneNumber) === null || _k === void 0 ? void 0 : _k.type) === "pattern" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uD734\uB300\uD3F0 \uBC88\uD638\uAC00 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." })), errors.phoneNumber && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: errors.phoneNumber.message })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "success-msg", style: { display: codeInputDisplay === "none" ? "none" : "block" } }, { children: "\uC778\uC99D\uBC88\uD638\uAC00 \uBC1C\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4." })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: codeInputDisplay } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex" }, { children: (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "text", placeholder: "\uC778\uC99D\uBC88\uD638 6\uC790\uB9AC \uC785\uB825" }, register("authCode", { validate: value => value.length === 6 }))) })), ((_l = errors.authCode) === null || _l === void 0 ? void 0 : _l.type) === "validate" && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: "\uC778\uC99D\uBC88\uD638 6\uC790\uB9AC\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." })), errors.authCode && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error-msg" }, { children: errors.authCode.message })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "success-msg", style: { display: authSuccessMsg } }, { children: "\uC778\uC99D\uBC88\uD638\uAC00 \uC77C\uCE58\uD569\uB2C8\uB2E4." }))] }))] })), (0, jsx_runtime_1.jsx)(Agree, { allChk: (allChk) => setAllChk(allChk) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "join-btn-wrap" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "join-btn", disabled: !isValid || !allChk }, { children: "\uAC00\uC785\uD558\uAE30" })) }))] })));
}
function Main() {
    return ((0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "join-container middle-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "join-title" }, { children: "SIGN UP" })), (0, jsx_runtime_1.jsx)(Form, {})] })) }));
}
function Join() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (firebase_1.signedInUser) {
            navigate("/");
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !firebase_1.signedInUser && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(Main, {}), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] })) }));
}
exports.default = Join;
