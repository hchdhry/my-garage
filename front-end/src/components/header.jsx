import React from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Header = () => {
    const jwtToken = localStorage.getItem("token");
    let username = "";

    if (jwtToken) {
        try {
            const decodedToken = jwtDecode(jwtToken);
            username = decodedToken.given_name;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
        }
    }

    const name = ""; 

    return (
        <header className="bg-gray-900 text-white">
            <nav>
                <ul>
                    <li><Link to="/" className="text-white">home</Link></li>
                    <li><a href="#" className="text-white">About</a></li>
                    <li className="dropdown">
                        <a href="#" className="text-white">Services</a>
                        <div className="dropdown-content">
                            <Link to="/cars" className="text-white">Cars</Link>
                            <Link to="/your-garage" className="text-white">Your Garage</Link>
                        </div>
                    </li>
                    {name !== "" ? (
                        <>
                            <li><Link to="/login" className="text-white">log in</Link></li>
                            <li><Link to="/register" className="text-white">register</Link></li>
                        </>
                    ) : (
                        <>
                        <li className="text-white">Hello {username}</li>
                        <li className="text-white">Log Out</li>
                            </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
