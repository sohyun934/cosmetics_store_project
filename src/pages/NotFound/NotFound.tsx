import Header from "../../components/Header/Header";

function Main() {
    return (
        <main>
            <h2 style={{ marginTop: "10vh", textAlign: "center" }}>페이지를 찾을 수 없습니다.</h2>
        </main>
    );
}

function NotFound() {
    return (
        <div>
            <Header />
            <Main />
        </div>
    );
}

export default NotFound;
