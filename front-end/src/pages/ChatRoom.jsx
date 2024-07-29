import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const ChatRoom = () => {
    const [connection, setConnection] = useState(null);
    const [userName, setUserName] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    const joinChat = async () => {
        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5003/chat")
                .configureLogging(LogLevel.Information)
                .build();

            newConnection.on("ReceivedMessage", (user, message) => {
                setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
            });

            newConnection.on("ErrorMessage", (errorMessage) => {
                setError(errorMessage);
            });

            await newConnection.start();
            console.log("Connection started");

            await newConnection.invoke("JoinSpecificGroup", { UserName: userName, ChatRoom: chatRoom });
            console.log("Joined specific group");

            setConnection(newConnection);
            setError('');
        } catch (e) {
            console.log(e);
            setError(`Failed to connect: ${e.message}`);
        }
    };

    const sendMessage = async () => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", { UserName: userName, ChatRoom: chatRoom }, message);
                setMessage('');
            } catch (e) {
                console.log(e);
                setError(`Failed to send message: ${e.message}`);
            }
        } else {
            setError("No connection to server yet.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Chat Room"
                value={chatRoom}
                onChange={(e) => setChatRoom(e.target.value)}
            />
            <button onClick={joinChat}>Join Chat</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;