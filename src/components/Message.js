import React, { useState, useMemo } from 'react';



// function MsgItem(props){
//     console.log(props);
//     return <li style={{ margin: "10px" }}> {props.msg} </li>;  
// }

const MsgItem = React.memo(({ msg }) => {
    console.log('clicked! ', msg)
    return <li >{msg}</li>
})

function Message() {
    const [messages, setMessages] = useState([])
    const [render, setRender] = useState(false)
    //   state = { messages: [] }

    console.log("in message");
    const addMessage = () => {
        setMessages([...messages, Math.random()])

    }

    const someObj = React.useCallback(()=>{}, [])
    // {}

    return (
        <div className="Message">
            <button onClick={addMessage}>add message</button>
            <button onClick={() => setRender(!render)}>set render</button>
            <ul>
                {
                    messages.map((m, i) => <MsgItem key={i} someObj={someObj} msg={m} />)
                }
            </ul>
        </div>
    );
}

export default Message