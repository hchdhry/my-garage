import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const ChatRoomComment = ({ user, message }) => {
    return (
        <li className="text-gray-300 mb-2">
            <div>
                <p className="font-semibold">
                    <span className="text-blue-500">{user}</span> says:
                </p>
                <p>{message}</p>
            </div>
        </li>
    );
};

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
                setMessages(prevMessages => [...prevMessages, { user, message }]);
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
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mr-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Chat Room"
                    value={chatRoom}
                    onChange={(e) => setChatRoom(e.target.value)}
                    className="mr-2 p-2 border rounded"
                />
                <button onClick={joinChat} className="p-2 bg-blue-500 text-white rounded">Join Chat</button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <ul className="mb-4 h-64 overflow-y-auto bg-gray-800 p-4 rounded">
                {messages.map((msg, index) => (
                    <ChatRoomComment key={index} user={msg.user} message={msg.message} />
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mr-2 p-2 border rounded"
                />
                <button onClick={sendMessage} className="p-2 bg-green-500 text-white rounded">Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;