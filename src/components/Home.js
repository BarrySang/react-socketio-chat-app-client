import Header from "./Header"
import SendMessage from "./SendMessage"
import Login from "./Login"
import { getUsername } from "../lib-functions/lib-functions"

function Home ({ conversationHandler, onlineUsers, disconnectUser, socket, loginHandler, usernameInput, setUsernameInput, username, userInputHandler, messages, setUserInput, userInput}) {
    return (
        <div>
            <Header disconnectUser={disconnectUser} socket={socket} username={username} />
            <div className="d-flex justify-content-center mb-2">
                <div className="online-users-container pt-2">
                        <h3 className="m-2">Online Users</h3>
                        {
                            // display online users excluding the current user
                            onlineUsers.map(onlineUser => (
                                (Object.values(onlineUser)[0] !== username) &&
                                <div onClick={() => conversationHandler(Object.values(onlineUser)[0])} key={Object.values(onlineUser)} className="online-user-container p-2">
                                    {Object.values(onlineUser)[0]}
                                    
                                </div>
                            ))
                        }
                    </div>
                <div className="messages-container mt-2 ms-1 p-2 mb-2 pb-2">
                    <div className="messages-heading">
                        <h3>Messages</h3>
                    </div>
                    {
                        /**
                         * display messages
                         * messages where user === 'system' don't have the 'user' property being displayed
                         * TODO - current user texts (align right), selected user texts (align left)
                         * TODO - messages from the server all have the id of one, ensure each message has a unique id in the server
                         * TODO - when a user clicks on another online user, delete previous messages and display a new conversation,
                         *        don't display messages with another user above messages with the current user
                         */
                         
                        messages && messages.map(message => (
                            
                            message.sender === 'system' ?
                            message.sender && message.message && <p className="text-body-tertiary" key={message.id}>{message.message}</p> :
                            message.sender && message.message && <p key={message.id}>{
                                getUsername(onlineUsers, message.sender) ? getUsername(onlineUsers, message.sender) : 'logged out user'
                                }: {message.message}</p>
                        ))
                        

                    }
                </div>
            </div>
            {
                username ? <SendMessage userInput={userInput} setUserInput={setUserInput} userInputHandler={userInputHandler} /> : <Login usernameInput={usernameInput} setUsernameInput={setUsernameInput} loginHandler={loginHandler} />
            }
        </div>
    )
}

export default Home