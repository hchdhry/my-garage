import { useState } from "react"
import Header from "./header"

const RegisterForm = () => 
{

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
})
    const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
}
const handleChange = (e) =>
{
    setFormData({...formData,[e.target.name]:e.target.value})
}
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(payload);
        try {
            const response = await fetch("http://localhost:5003/api/Account/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), 
            });
    
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
        <Header/>
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <label >Username:</label>
            <input type="text" id="username" name="username" onChange={handleChange} value={formData.username}required/>

            <label >Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} required/>

            <label >Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={formData.password}required/>

                        <button type="submit">Submit</button>
            </form>
        </div>
        </>
  )
}

export default RegisterForm