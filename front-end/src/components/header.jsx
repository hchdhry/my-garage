 import { jwtDecode } from "jwt-decode"
 const header= () =>{
    const jwtToken = localStorage.getItem("token")
   let  username = ""
    if(jwtToken)
    {
        try
        {
            const decodedToken = jwtDecode(jwtToken);
            username = decodedToken.given_name; 
        } catch (error) {
            console.error('Error decoding JWT token:', error);
        }
    }

return(
<header>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="/login">Login</a></li>
                {username && <li>Hello {username}</li>}
        </ul>
    </nav>
</header>
)
}

export default header;