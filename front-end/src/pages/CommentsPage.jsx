import React, { useState } from 'react';
import Header from '../components/header';

const CommentsPage = () => {
    const [comments, setComments] = useState([
        { id: 1, text: 'This is a sample comment.' },
        { id: 2, text: 'Another sample comment.' },
    ]);
    const [newComment, setNewComment] = useState({Title:null,Text:null});
    const jwtToken = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();
      try
      {
          fetch('http://localhost:5003/api/Comment/1', {
              method: 'POST',
              headers: {
                  'accept': '*/*',
                  'Authorization': `Bearer ${jwtToken}`
              },
              body: JSON.stringify(newComment)
          })
      }
      catch(e)
      {
        console.log(e);
      } 
      
    };

    return (
        <>
        <Header/>
        <div className="bg-gray-900 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-white mb-4">Comments</h1>

                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    {comments.length === 0 ? (
                        <p className="text-gray-400">No comments yet.</p>
                    ) : (
                        <ul>
                            {comments.map((comment) => (
                                <li key={comment.id} className="text-gray-300 mb-2">
                                    {comment.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                    <form onSubmit={handleSubmit}>
                            <textarea
                                value={newComment.Title}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Title"
                                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 w-full mb-2"
                                rows="1"
                            />
                        <textarea
                            value={newComment.Text}
                            onChange={(e) => setNewComment(e.target.value)}
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