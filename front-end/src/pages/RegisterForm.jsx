import { useState } from "react";
import Header from "../components/header";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [error,setError] = useState(null)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5003/api/Account/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json()
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError("error registering")
            }
           
        } catch (error) {
            setError(`error registering: ${error}`)
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
                <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-bold mb-2">Username:</label>
                        <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:shadow-outline text-white" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
                        <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:shadow-outline text-white" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:shadow-outline text-white" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </div>
                    {error&& <span className="error text-red-500">{error}</span>}
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
