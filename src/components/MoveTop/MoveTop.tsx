import "./MoveTop.css";

function MoveTop() {
    return (
        <div className="move-top">
            <button aria-label="scroll to top button" onClick={() => window.scrollTo(0, 0)}></button>
        </div>
    );
}

export default MoveTop;
