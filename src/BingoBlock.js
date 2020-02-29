import React from "react";

function BingoBlock(props) {

    let grid = props.grid
    let handleNumberClick = props.handleNumberClick
    let circle = props.circle

    return (
        <>
            {
                grid.map(sameXArr => <>
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
                    <br />
                </>)
            }
        </>
    )
}

export default BingoBlock