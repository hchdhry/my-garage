import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { jwtDecode } from "jwt-decode";

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
    const { carId } = useParams();
    const [connection, setConnection] = useState(null);
    const [userName, setUserName] = useState('Anonymous');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.given_name || 'Anonymous');
            } catch (e) {
                console.error("Error decoding token:", e);
                setError("Error decoding user token. Using 'Anonymous' as username.");
            }
        }
        joinChat();
    }, [carId]);

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

            await newConnection.invoke("JoinSpecificGroup", { UserName: userName, ChatRoom: carId });
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
                await connection.invoke("SendMessage", { UserName: userName, ChatRoom: carId }, message);
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
            <h1 className="text-2xl font-bold mb-4">Chat Room for Car ID: {carId}</h1>

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