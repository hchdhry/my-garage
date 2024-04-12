import React, { useState } from 'react';
import Header from './header';
import "../styles/form.css"

const LoginForm = () => {
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
            if(data)
            {
                localStorage.setItem("token",data.token)   
                console.log(localStorage.getItem("token"))
            }
            else
            {
                console.log("error")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <Header/>
        <div className="login-container">
        <form className="login-form"  onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username} 
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
        </>
    );
};

export default LoginForm;