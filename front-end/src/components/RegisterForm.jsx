import { useState } from "react"

const RegisterForm = () => 
{

    const [formData, setFormData] = useState({
        username: '',
        email: 'user@example.com',
        password: '',
})
const handleChange = (e) =>
{
    setFormData({...formData,[e.target.name]:e.target.value})
}
    return (
        <form>
            <label >Username:</label>
            <input type="text" id="username" name="username" onChange={handleChange} value={formData.username}required/>

            <label >Email:</label>
            <input type="email" id="email" name="email" value={formData.email} required/>

            <label >Password:</label>
            <input type="password" id="password" name={formData.password} required/>

                        <button type="submit">Submit</button>
            </form>
  )
}

export default RegisterForm