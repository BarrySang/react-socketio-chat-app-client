function Header({disconnectUser, socket, username}) {
    return (
        <div>
            <h1>Chat App</h1>
            {
                username && <p>Logged in as {username}</p>
            }
            {
                username && socket.connected && <button className="btn btn-warning" onClick={disconnectUser}>Log-out</button>
            }
            
        </div>
    )
}

export default Header