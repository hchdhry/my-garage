import React from 'react';

const CommentItem = ({ comment }) => {
    return (
        <li className="text-gray-300 mb-2">
            <div>
                <p className="font-semibold">
                    <span className="text-blue-500">{comment.username}</span> says:
                </p>
                <p className="font-semibold">{comment.title}</p>
                <p>{comment.text}</p>
            </div>
        </li>
    );
};

export default CommentItem;