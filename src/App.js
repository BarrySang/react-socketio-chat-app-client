import './App.css';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { addToStateArray } from '../src/lib-functions/lib-functions'
import { noMessages, testConversations, testMessages } from './test-data/messagesData';

function App() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [socket, setSocket] = useState({})
  const [username, setUsername] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const [conversations, setConversations] = useState([])
  const [recipient, setRecipient] = useState('')

  // get conversations
  // useEffect(() => {
  //   setConversations(testConversations || [])
  // }, [])

  // login when username is set
  useEffect(() => {
    // check if socket has been initialized
    if (socket instanceof io.Socket) {
      // handle 'connect' event
      socket.on('connect', message => {    
        socket.emit('user-info', {id: socket.id, username: username})
      })

      // get online users
      socket.on('online-users', onlineUsers => {
        // console.log(onlineUsers)
        setOnlineUsers(onlineUsers)
      })

      // get conversations
      socket.on('conversations', conversations => {
        // console.log(conversations[0].messages)
        console.log(conversations)
        setConversations(conversations)
      })

      // handle 'receive-message' event
      socket.on('receive-message', message => {
        console.log(message.username)
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { id: prevMessages.length ? prevMessages[prevMessages.length - 1].id + 1 : 1, sender: message.username, message: message.message },
        // ]);
      })
    }
  }, [username])

  // disconnect user
  function disconnectUser() {
    if (socket instanceof io.Socket) {
      // reset username
      setUsername('')

      // disconnect from socket
      socket.disconnect()

      // empty list of online users
      setOnlineUsers([])

      // empty messages
      setMessages([])
    }
  }

  // handle message input
  function userInputHandler() {
    let socketId
    let userInfo

    // check if a user has been selected
    if (recipient) {
      userInfo = onlineUsers.find(onlineUser => Object.values(onlineUser)[0] === recipient)
    } else {
      console.log('no user selected')
    }
    
    // get socket id if user has been found
    if (userInfo) {
      socketId = Object.keys(userInfo)[0]
    } else {
      console.log('user has not been found')
    }

    let messageToSend = {sender: username, message: userInput}

    if (socketId) {
      // add current user's message to the list of messages
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length ? prevMessages[prevMessages.length - 1].id + 1 : 1,
          sender: messageToSend.username,
          message: messageToSend.message
        }
      ])
      // send message to the server
      socket.emit('send-message', messageToSend, socketId)
    } else {
      console.log('an error occured')
    }
    // socket.emit('send-message', messageToSend)
  }

  // connect to socket and set username
  function loginHandler() {
    // initialize socket
    const socket = io('http://localhost:4000')
    setSocket(socket)

    setUsername(usernameInput)
  }

  // view conversation when a user is clicked
  function conversationHandler(selectedUser) {
    // console.log(conversations[2].messages)

    // get socket id of recipient
    let recipientSocketId = Object.keys(onlineUsers.find(onlineUser => Object.values(onlineUser)[0] === selectedUser))[0]

    // check if a conversation between the current user and the selected user exists
    let conversationExists = conversations.find(
      conversation => (conversation.sender === socket.id && conversation.recipient === recipientSocketId) || (conversation.sender === recipientSocketId && conversation.recipient === socket.id)
    )
    
    /**
     * if conversation exists, set messages array in state to the messages in that conversation
     * if conversation does not exist, indicate absence of a conversation between the users
     */
    if (conversationExists) {
      setMessages(conversationExists.messages)
    } else {
      setMessages([{
        id: 2,
        sender: 'system',
        message: `you have no messages with ${selectedUser}`
      }])
    }
    
    // store the username of the selected user in state
    setRecipient(selectedUser)
  }

  return (
    <div className="App container">
      <Home
      conversationHandler={conversationHandler}
      onlineUsers={onlineUsers}
      disconnectUser={disconnectUser}
      socket={socket}
      loginHandler={loginHandler}
      usernameInput={usernameInput}
      setUsernameInput={setUsernameInput}
      username={username}
      userInputHandler={userInputHandler}setUserInput={setUserInput}
      userInput={userInput}
      messages={messages} />
    </div>
  );
}

export default App;
