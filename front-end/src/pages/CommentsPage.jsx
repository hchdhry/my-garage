import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Header from '../components/header';
import CommentItem from '../components/CommentItems';
import { array } from 'yup';

const CommentsPage = () => {
    const {carId} = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ title: '', text: '' });
    const jwtToken = localStorage.getItem("token");
    const render = array[1]

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5003/api/Comment/${carId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                if (response.ok) {
                    const comments = await response.json();
                    setComments(comments);
                } else {
                    console.error('Error fetching comments:', response.status);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, []);

    const handleTitleChange = (e) => {
        setNewComment({ ...newComment, title: e.target.value });
    };

    const handleTextChange = (e) => {
        setNewComment({ ...newComment, text: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5003/api/Comment/${carId}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (response.ok) {
                console.log('Comment submitted successfully');
                setNewComment({ title: '', text: '' });

                
                const commentsResponse = await fetch(`http://localhost:5003/api/Comment/${carId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                if (commentsResponse.ok) {
                    const comments = await commentsResponse.json();
                    setComments(comments);
                } else {
                    console.error('Error fetching comments:', commentsResponse.status);
                }
            } else {
                console.error('Error submitting comment:', response.status);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-white mb-4">Comments</h1>
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        {comments.length === 0 ? (
                            <p className="text-gray-400">No comments yet.</p>
                        ) : (
                            <ul className="list-none">
                                {comments.map((comment, index) => (
                                    <CommentItem key={index} comment={comment} />
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={newComment.title}
                                onChange={handleTitleChange}
                                placeholder="Title"
                                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 w-full mb-2"
                                rows="1"
                            />
                            <textarea
                                value={newComment.text}
                                onChange={handleTextChange}
                                placeholder="Enter your comment..."
                                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 w-full mb-2"
                                rows="3"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentsPage;