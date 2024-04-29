import React, { useState } from 'react';

const CommentsPage = () => {
    const [comments, setComments] = useState([
        { id: 1, text: 'This is a sample comment.' },
        { id: 2, text: 'Another sample comment.' },
    ]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit the new comment would go here
        console.log('New comment:', newComment);
        setNewComment('');
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Comments</h1>

            <div className="mb-4">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Enter your comment..."
                        className="border border-gray-300 rounded-md px-3 py-2 mr-2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id} className="mb-2">
                                {comment.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CommentsPage;