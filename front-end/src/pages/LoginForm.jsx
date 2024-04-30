import React, { useState } from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = JSON.stringify({
            username: formData.username,
            password: formData.password,
        });
        try {
            const response = await fetch('http://localhost:5003/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });
            const data = await response.json();
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <Header/>
        <div className="bg-gray-900 min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="text-white font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-white font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginForm;
