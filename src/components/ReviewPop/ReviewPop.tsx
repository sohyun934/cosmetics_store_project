import "./ReviewPop.css";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, signedInUser } from "../../firebase";
import styled from "styled-components";
import { getDate } from "../../utils/getDate";

type Prop = {
    close: Function;
    productName: string;
};

const StyledButton = styled.button`
    background: black;
    color: white;
    font-weight: normal;
    border: none;
`;

function ReviewPop(props: Prop) {
    const [mode, setMode] = useState("write");
    const [docId, setDocId] = useState("");
    const [reviewId, setReviewId] = useState(0);
    const [rate, setRate] = useState(0);
    const [content, setContent] = useState("");
    const [letters, setLetters] = useState(0);
    const [disabled, setDisabled] = useState(true);

    const lis = [];

    function rateStar(e: React.MouseEvent<HTMLButtonElement>) {
        const target = (e.target as HTMLElement).parentNode as HTMLElement;
        target.classList.add("on");

        const nextTarget = target.previousSibling as HTMLElement;
        if (nextTarget) nextTarget.classList.remove("on");
    }

    for (let i = 0; i < 5; i++) {
        lis.push(
            <li key={i} value={5 - i} className={mode === "update" && 5 - i === rate ? "on" : ""} onClick={() => setRate(5 - i)}>
                <button type="button" onClick={rateStar}></button>
            </li>
        );
    }

    function countLetters(letters: number) {
        setLetters(letters);

        if (letters >= 20) setDisabled(false);
        else setDisabled(true);
    }

    async function fetchReview() {
        const reviewsSnapshot = await getDocs(collection(db, "reviews"));

        const reviewQuery = query(collection(db, "reviews"), where("email", "==", signedInUser), where("product_name", "==", props.productName));
        const reviewSnapshot = await getDocs(reviewQuery);

        if (reviewSnapshot.empty) {
            setReviewId(reviewsSnapshot.size + 1);
        } else {
            setMode("update");
            reviewSnapshot.forEach(doc => {
                const review = doc.data();

                setDocId(doc.id);
                setRate(review.rate);
                setContent(review.content);
                setLetters(review.content.length);
                setDisabled(false);
            });
        }
    }

    useEffect(() => {
        fetchReview();
    }, []);

    async function writeReview() {
        // const today = new Date();
        // const year = today.getFullYear();
        // const month = ("0" + (today.getMonth() + 1)).slice(-2);
        // const day = ("0" + today.getDate()).slice(-2);
        // const date = year + "." + month + "." + day;

        const date = getDate().join(".");

        if (mode === "write") {
            const usersQuery = query(collection(db, "users"), where("email", "==", signedInUser));
            const userSnapshot = await getDocs(usersQuery);

            userSnapshot.forEach(async doc => {
                const user = doc.data();

                await addDoc(collection(db, "reviews"), {
                    review_id: reviewId,
                    product_name: props.productName,
                    rate: rate,
                    user_name: user.name,
                    email: user.email,
                    content: content,
                    date: date
                }).then(() => {
                    alert("리뷰 등록이 완료되었습니다.");
                    props.close(reviewId);
                });
            });
        } else if (mode === "update") {
            const reviewRef = doc(db, "reviews", docId);

            await updateDoc(reviewRef, {
                rate: rate,
                content: content
            }).then(() => {
                alert("리뷰 수정이 완료되었습니다.");
                props.close();
            });
        }
    }

    return (
        <div>
            <div className="popup-container review-pop">
                <form method="post">
                    <h2>REVIEW</h2>
                    <hr />
                    <p className="small-txt">
                        <strong>{props.productName}</strong>
                    </p>
                    <div className="total-point">
                        <ul className="flex">{lis}</ul>
                    </div>
                    <div className="text-container small-txt">
                        <textarea
                            cols={3}
                            rows={1}
                            maxLength={50}
                            value={content}
                            onChange={e => {
                                countLetters(e.target.value.length);
                                setContent(e.target.value);
                            }}
                            placeholder="최소 20자 이상 입력"
                        ></textarea>
                        <p>
                            <span>{letters}</span>자 / 50자
                        </p>
                    </div>
                    <input type="file" />
                    <div className="pop-btn-container flex">
                        <button type="button" className="cancel-btn radius-style-btn" onClick={() => props.close()}>
                            취소
                        </button>
                        <StyledButton type="button" className="write-btn radius-style-btn" onClick={writeReview} disabled={disabled}>
                            등록
                        </StyledButton>
                    </div>
                    <button type="button" className="pop-close-btn" onClick={() => props.close()}></button>
                </form>
            </div>
            <div className="dim"></div>
        </div>
    );
}

export default ReviewPop;
