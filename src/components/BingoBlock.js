import React from "react";

function BingoBlock(props) {

    let grid = props.grid
    let handleNumberClick = props.handleNumberClick
    let circle = props.circle

    return (
        <>
            {
                grid.map( (sameXArr, i) => <div key={i} style={{zoom: 2}}>
                    {
                        sameXArr.map((e, i) => <button
                            className={circle[parseInt(e) - 1] === 1 ? 'circled bingoblock' : 'bingoblock'}
                            value={e}
                            onClick={handleNumberClick}
                            key={i}
                        >
                            {e}
                        </button>)
                    }
                </div>)
            }
        </>
    )
}

export default BingoBlock