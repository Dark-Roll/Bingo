import React from "react";

function WinPopUp(props) {

    return (
        <div className="victory__container">
            <div className="victory__main">
                <p> You win </p>
                <button onClick={props.handleRestartClick}>Restart</button>
            </div>
        </div>
    )
}

export default WinPopUp