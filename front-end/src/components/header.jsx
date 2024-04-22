import { jwtDecode } from "jwt-decode"
import { Link } from "react-router-dom";

const Header = () => {
    const jwtToken = localStorage.getItem("token")
    let username = ""

    if (jwtToken) {
        try {
            const decodedToken = jwtDecode(jwtToken);
            username = decodedToken.given_name;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
        }
    }

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><a href="#">About</a></li>
                    <li className="dropdown">
                        <a href="#">Services</a>
                        <div className="dropdown-content">
                            <Link to="/cars">Cars</Link>
                            <Link to="/your-garage">Your Garage</Link>
                        </div>

                    </li>
                    <li><Link to = "/login">log in</Link></li>
                    <li><Link to="/register">register</Link></li>
                    {username && <li>Hello {username}</li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;