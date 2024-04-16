import { jwtDecode } from "jwt-decode"

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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li className="dropdown">
                        <a href="#">Services</a>
                        <div className="dropdown-content">
                            <a href="/Cars">Cars</a>
                            <a href="#">Your Garage</a>
                        </div>
                    </li>
                    <li><a href="/login">Login</a></li>
                    {username && <li>Hello {username}</li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;