import "./ReviewPop.css";
import React, { useState } from "react";

type Prop = {
    close: Function;
};

function ReviewPop(props: Prop) {
    let prevTarget: HTMLElement | null = null;
    const lis = [];
    const [txtCnt, setTxtCnt] = useState(0);

    function rateStar(e: React.MouseEvent<HTMLButtonElement>) {
        if (prevTarget !== null) prevTarget.classList.remove("on");

        const nextTarget = (e.target as HTMLElement).parentNode as HTMLElement;
        nextTarget.classList.add("on");
        prevTarget = nextTarget;
    }

    for (let i = 0; i < 5; i++) {
        lis.push(
            <li key={i} value={5 - i}>
                <button type="button" onClick={rateStar}></button>
            </li>
        );
    }

    function countTxt(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const txtCnt = e.target.value.length;
        setTxtCnt(txtCnt);
    }

    return (
        <div>
            <div className="popup-container review-pop">
                <form method="post">
                    <h2>REVIEW</h2>
                    <hr />
                    <p className="small-txt">
                        <strong>티트리 스칼프 스케일링 샴푸 바 135G</strong>
                    </p>
                    <div className="total-point">
                        <ul className="flex">{lis}</ul>
                    </div>
                    <div className="text-container small-txt">
                        <textarea cols={3} rows={1} maxLength={200} onChange={countTxt} placeholder="최소 20자 이상 입력"></textarea>
                        <p>
                            <span>{txtCnt}</span>자 / 200자
                        </p>
                    </div>
                    <input type="file" />
                    <div className="pop-btn-container flex">
                        <button type="button" className="cancel-btn radius-style-btn" onClick={() => props.close()}>
                            취소
                        </button>
                        <button className="write-btn radius-style-btn">등록</button>
                    </div>
                    <button type="button" className="pop-close-btn" onClick={() => props.close()}></button>
                </form>
            </div>
            <div className="dim"></div>
        </div>
    );
}

export default ReviewPop;
