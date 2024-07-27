import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const ChatRoom = () => {
    const [connection, setConnection] = useState(null);
    const [userName, setUserName] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const joinChat = async () => {
        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5003/chat")
                .configureLogging(LogLevel.Information)
                .build();

            newConnection.on("ReceivedMessage", (user, message) => {
                setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
            });

            await newConnection.start();
            console.log("Connection started");

            await newConnection.invoke("JoinSpecificGroup", { Username: userName, ChatRoom: chatRoom });
            console.log("Joined specific group");

            setConnection(newConnection);
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async () => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", { Username: userName, ChatRoom: chatRoom, Message: message });
                setMessage('');
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("No connection to server yet.");
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