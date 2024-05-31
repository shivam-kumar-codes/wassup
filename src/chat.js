import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:5000');

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
`;

const MessagesContainer = styled.ul`
  flex-grow: 1;
  overflow-y: scroll;
  list-style: none;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.li`
  background: ${(props) => (props.isOwn ? '#DCF8C6' : '#FFFFFF')};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 60%;
  align-self: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  padding: 10px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: #f0f0f0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId] = useState(uuidv4()); // Generate a unique user ID

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { text: msg.text, own: msg.userId === userId }]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      const message = { text: input, userId };
      socket.emit('chat message', message);
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isOwn={msg.own}>{msg.text}</Message>
        ))}
      </MessagesContainer>
      <Form onSubmit={sendMessage}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </Form>
    </ChatContainer>
  );
};

export default Chat;
