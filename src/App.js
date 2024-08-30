import React, { useEffect, useState } from 'react';
import { ablyChannel } from './ably';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ablyChannel.subscribe((msg) => {
      setMessages((prevMessages) => [...prevMessages, msg.data]);
    });

    return () => {
      ablyChannel.unsubscribe();
    };
  }, []);

  const sendMessage = (message) => {
    ablyChannel.publish('message', message);
  };

  return (
    <div>
      <h1>Ably & MongoDB Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage('Hello from React!')}>
        Send Message
      </button>
    </div>
  );
}

export default App;
