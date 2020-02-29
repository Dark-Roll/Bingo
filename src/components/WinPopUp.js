import React from "react";

function WinPopUp(props) {

    return (
        <div className="victory__container">
            <div className="victory__main">
                <p className="victory__title"> You win </p>
                <p> Win: {props.result && props.result.win} </p>
                <p> Lose: {props.result && props.result.lose} </p> 
                
                <button onClick={props.handleRestartClick}>Restart</button>
                
            </div>
        </div>
    )
}

export default WinPopUp