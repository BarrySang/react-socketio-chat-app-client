function Home ({userInputHandler, messages, setUserInput, userInput}) {
    return (
        <div>
            <h1>Chat App</h1>
            <div className="messages-container">
                <h3>Messages</h3>
                {
                    messages && messages.map(message => (
                        <p key={message.id}>{message.text}</p>
                    ))
                }
            </div>
            <input type="text" className="me-3" onChange={e => setUserInput(e.target.value)} value={userInput}/>
            <button className="btn btn-primary" onClick={userInputHandler}>Send Message</button>
        </div>
    )
}

export default Home