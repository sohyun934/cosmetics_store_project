import "./privacyPolicy.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export function PrivacyPolicyDetail() {
    return (
        <div>
            <p>
                주식회사 더 내추럴(이하 '회사' 라고 함)은 회사에서 제공하는 서비스(이하 '서비스'라고 함)를 이용하는 회원님 (이하 '이용자'라고 함)의 개인정보를
                매우 소중하게 생각하고 있으며, 이용자의 개인정보를 보호하기 위하여 최선의 노력을 다하고 있습니다.
            </p>
            <br />
            <p>
                회사는 『개인정보보호법』, 『정보통신망이용촉진및정보보호등에관한법률』을 비롯한 모든 개인정보보호 관련 법률규정을 준수하고 있으며 회사의
                개인정보처리방침을 별도로 제정하고 이를 준수함으로써 이용자의 개인정보를 더욱 보호하고 있습니다. 또한 회사는 개인정보처리방침을 항상 회사
                홈페이지 첫 화면에 공개함으로써 이용자들이 언제나 쉽게 열람할 수 있도록 조치하고 있습니다. 회사의 개인정보처리방침은 관련 법률 및 고시의 변경
                또는 내부 운영방침의 변경에 따라 변경될 수 있습니다. 회사의 개인정보처리방침이 수정될 경우 변경된 사항은 홈페이지를 통하여 공지합니다. 회사의
                개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
            </p>
            <br />
            <p>
                01 개인정보 수집에 대한 동의 및 수집방법
                <br />
                02 개인정보의 수집항목 및 수집 · 이용 목적
                <br />
                03 개인정보의 제공
                <br />
                04 개인정보의 처리위탁
                <br />
                05 개인정보의 보유·이용 기간, 파기 절차 및 파기방법
                <br />
                06 개인정보 보호업무 및 관련 고충사항 처리 부서
                <br />
                07 개인정보 자동수집 장치에 의한 개인정보 수집
                <br />
                08 개인정보의 열람 및 정정 등<br />
                09 개인정보 수집·이용·제공에 대한 동의 철회
                <br />
                10 개인정보보호를 위한 관리적·기술적·물리적 대책
                <br />
                11 이용자 및 법정대리인의 권리와 그 행사방법
                <br />
                12 보호정책 변경시 공지의무
                <br />
            </p>
            <br />
            <p>제 1 조 (개인정보 수집에 대한 동의 및 수집방법)</p>
            <br />
            <p>
                ① "회원"이라 함은 회사에게 개인정보를 제공하여 회원등록을 하는 방법으로 회원 가입된 이용자를 의미합니다.
                <br />
                ② "비회원"이라 함은 회사의 사이트 등에 회원 가입을 하지 않고, 회사가 제공하는 서비스를 이용하는 자를 말합니다.
                <br />
                ③ 이용자는 온라인 또는 오프라인으로, 회사가 회사의 개인정보처리방침에 따라 이용자의 개인정보를 수집함에 대하여 동의여부를 표시하는 방법으로
                동의할 수 있습니다.
                <br />
                이용자가 동의 부분에 표시하면 해당 개인정보 수집에 대해 동의한 것으로 봅니다.
                <br />
            </p>
            <br />
            <p>제 2 조 (개인정보의 수집항목 및 수집 • 이용 목적)</p>
            <br />
            <p>
                ① 회사는 이용자들이 회원 서비스를 이용하기 위해 회원으로 가입하실 때 서비스 제공을 위한 필요최소한의 개인정보를 수집하고 있습니다.
                <br />
                다만 이용자들에게 보다 양질의 맞춤서비스를 제공하기 위하여 이용자의 추가적인 개인정보를 선택적으로 입력 받고 있습니다.
                <br />
                ② 회사는 이용자의 명시적인 별도 동의 없이 기본적 인권 침해의 우려가 있는 사상 • 신념, 노동조합 • 정당의 가입탈퇴, 정치적 견해, 건강, 성생활,
                과거의 병력, 종교, 출신지, 범죄기록 등 민감한 개인정보는 수집하지 않습니다.
                <br />
                ③ 회사가 회원가입 시 수집하는 개인정보 항목과 그 수집 • 이용의 주된 목적은 아래와 같습니다.
                <br />
            </p>
        </div>
    );
}

function Main() {
    return (
        <main>
            <div className="policy-wrap">
                <div className="policy small-txt">
                    <h1>개인정보 처리방침</h1>
                    <PrivacyPolicyDetail />
                </div>
            </div>
        </main>
    );
}

function PrivacyPolicy() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;