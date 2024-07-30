import React from 'react';

const ChatRoomComment= ({ user,message }) => {
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

export default ChatRoomComment;