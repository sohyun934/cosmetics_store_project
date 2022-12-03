import "./ReviewPop.css";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, signedInUser } from "../../../../firebase";
import styled from "styled-components";
import { getDate } from "../../../../utils/getDate";

const StyledDiv = styled.div`
    width: 590px;

    @media (max-width: 900px) {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 0;
        -moz-border-radius: 0;
        -webkit-border-radius: 0;
    }
`;

const StyledButton = styled.button`
    background: black;
    color: white;
    font-weight: normal;
    border: none;
`;

type Prop = {
    close: Function;
    reviewId: string;
    productName: string;
};

function ReviewPop(props: Prop) {
    const lis = [];

    const close = props.close;
    const reviewId = props.reviewId;
    const productName = props.productName;

    const [newReviewId, setNewReviewId] = useState(0);
    const [reviewState, setReviewState] = useState({ rate: 0, content: "", letters: 0 });

    // 별점 제어
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
                className={5 - i === reviewState.rate ? "on" : ""}
                onClick={() => setReviewState(reviewState => ({ ...reviewState, rate: 5 - i }))}
            >
                <button type="button" onClick={handleRate}></button>
            </li>
        );
    }

    // 리뷰 데이터 가져오기
    const fetchReview = async () => {
        const reviewQuery = query(collection(db, "reviews"), where("email", "==", signedInUser), where("product_name", "==", productName));
        const reviewSnapshot = await getDocs(reviewQuery);

        if (reviewSnapshot.empty) {
            const reviewsSnapshot = await getDocs(collection(db, "reviews"));
            setNewReviewId(reviewsSnapshot.size + 1);
        } else {
            const review = reviewSnapshot.docs[0].data();
            setReviewState(reviewState => ({ ...reviewState, rate: review.rate, content: review.content, letters: review.content.length }));
        }
    };

    useEffect(() => {
        fetchReview();
    }, []);

    // 리뷰 작성
    const handleWrite = async () => {
        const date = getDate().join(".");

        if (!reviewId) {
            const usersQuery = query(collection(db, "users"), where("email", "==", signedInUser));
            const userSnapshot = await getDocs(usersQuery);

            userSnapshot.forEach(async doc => {
                const user = doc.data();

                await addDoc(collection(db, "reviews"), {
                    review_id: newReviewId,
                    product_name: productName,
                    rate: reviewState.rate,
                    user_name: user.name,
                    email: user.email,
                    content: reviewState.content,
                    date: date
                }).then(() => {
                    alert("리뷰 등록이 완료되었습니다.");
                    close(true);
                });
            });
        } else {
            const updatedReview = doc(db, "reviews", reviewId);

            await updateDoc(updatedReview, {
                rate: reviewState.rate,
                content: reviewState.content
            }).then(() => {
                alert("리뷰 수정이 완료되었습니다.");
                close();
            });
        }
    };

    // 글자수 세기
    const handleCount = (letters: number) => {
        setReviewState(reviewState => ({ ...reviewState, letters: letters }));
    };

    return (
        <div>
            <StyledDiv className="popup-container review-pop">
                <form method="post">
                    <h2>REVIEW</h2>
                    <hr />
                    <p className="small-txt">
                        <strong>{productName}</strong>
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
                        <button type="button" className="cancel-btn radius-style-btn" onClick={() => close()}>
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
                    <button type="button" className="pop-close-btn" aria-label="close button" onClick={() => close()}></button>
                </form>
            </StyledDiv>
            <div className="dim"></div>
        </div>
    );
}

export default ReviewPop;
