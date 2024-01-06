import './App.css';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [socket, setSocket] = useState({})

  // get messages
  useEffect(() => {
    
    setMessages([
      {
        id: 1,
        text: 'this is the first message'
      },
      {
        id: 2,
        text: 'this is the second message'
      }
    ])
  }, [])

  // set socket
  useEffect(() => {
    const socket = io('http://localhost:4000')
    setSocket(socket)
  }, [])

  useEffect(() => {
    if (socket.constructor === io.Socket) {

      socket.on('connect', message => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {id: prevMessages.length ? prevMessages[prevMessages.length - 1].id + 1 : 1, text: message}
        ])
      })
      
      socket.on('connect', () => {
        let newMessages = [
          ...messages,
          {id: messages.length ? messages[messages.length - 1].id + 1 : 1, text: `you connected with id: ${socket.id}`}
        ]
        
        setMessages(newMessages)
        
      })

      socket.on('receive-message', message => {
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length ? prevMessages[prevMessages.length - 1].id + 1 : 1, text: message },
        ]);
      })
      return () => {socket.off('message')}
    }
    
    
  }, [socket])

  // handle message input
  function userInputHandler() {
    
    let message = userInput
    socket.emit('send-message', message)
  }

  return (
    <div className="App container">
      <Home userInputHandler={userInputHandler} setUserInput={setUserInput} userInput={userInput} messages={messages} />
    </div>
  );
}

export default App;
