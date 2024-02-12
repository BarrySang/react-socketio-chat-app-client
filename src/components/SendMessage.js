function SendMessage({userInput, setUserInput, userInputHandler}) {
    return (
        <div>
            <input type="text" className="me-3" onChange={e => setUserInput(e.target.value)} value={userInput}/>
            <button className="btn btn-primary" onClick={userInputHandler}>Send Message</button>
        </div>
    )
}

export default SendMessage