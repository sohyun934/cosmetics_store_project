import "./ReviewPop.css";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, signedInUser } from "../../../../firebase";
import styled from "styled-components";
import { getDate } from "../../../../utils/getDate";

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
    const lis = [];
    const [mode, setMode] = useState("write");
    const [docId, setDocId] = useState("");
    const [reviewId, setReviewId] = useState(0);
    const [reviewState, setReviewState] = useState({ rate: 0, content: "", letters: 0 });

    const handleRate = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = (e.target as HTMLElement).parentNode as HTMLElement;
        target.classList.add("on");

        const nextTarget = target.previousSibling as HTMLElement;
        if (nextTarget) nextTarget.classList.remove("on");
    };

    for (let i = 0; i < 5; i++) {
        lis.push(
            <li
                key={i}
                value={5 - i}
                className={mode === "update" && 5 - i === reviewState.rate ? "on" : ""}
                onClick={() => setReviewState(reviewState => ({ ...reviewState, rate: 5 - i }))}
            >
                <button type="button" onClick={handleRate}></button>
            </li>
        );
    }

    const handleCount = (letters: number) => {
        setReviewState(reviewState => ({ ...reviewState, letters: letters }));
    };

    const fetchReview = async () => {
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
                setReviewState(reviewState => ({ ...reviewState, rate: review.rate, content: review.content, letters: review.content.length }));
            });
        }
    };

    useEffect(() => {
        fetchReview();
    }, []);

    const handleWrite = async () => {
        const date = getDate().join(".");

        if (mode === "write") {
            const usersQuery = query(collection(db, "users"), where("email", "==", signedInUser));
            const userSnapshot = await getDocs(usersQuery);

            userSnapshot.forEach(async doc => {
                const user = doc.data();

                await addDoc(collection(db, "reviews"), {
                    review_id: reviewId,
                    product_name: props.productName,
                    rate: reviewState.rate,
                    user_name: user.name,
                    email: user.email,
                    content: reviewState.content,
                    date: date
                }).then(() => {
                    alert("리뷰 등록이 완료되었습니다.");
                    props.close(reviewId);
                });
            });
        } else if (mode === "update") {
            const reviewRef = doc(db, "reviews", docId);

            await updateDoc(reviewRef, {
                rate: reviewState.rate,
                content: reviewState.content
            }).then(() => {
                alert("리뷰 수정이 완료되었습니다.");
                props.close();
            });
        }
    };

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
                            value={reviewState.content}
                            onChange={e => {
                                handleCount(e.target.value.length);
                                setReviewState(reviewState => ({ ...reviewState, content: e.target.value }));
                            }}
                            placeholder="최소 20자 이상 입력"
                        ></textarea>
                        <p>
                            <span>{reviewState.letters}</span>자 / 50자
                        </p>
                    </div>
                    <div className="pop-btn-container flex">
                        <button type="button" className="cancel-btn radius-style-btn" onClick={() => props.close()}>
                            취소
                        </button>
                        <StyledButton
                            type="button"
                            className="write-btn radius-style-btn"
                            onClick={handleWrite}
                            disabled={reviewState.letters < 20 || reviewState.rate === 0}
                        >
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
