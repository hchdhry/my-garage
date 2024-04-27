import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Header = () => {
    const [username, setUsername] = useState("");
    const [role,setRole] = useState("");

    useEffect(() => {
        const handleStorageChange = async () => {
            try {
                const jwtToken = localStorage.getItem("token");
                if (jwtToken) {
                    const decodedToken = await jwtDecode(jwtToken);
                    const usernameProp = decodedToken.given_name || decodedToken.username; 
                    const roleProp = decodedToken.role;
                    setRole(roleProp);
                    setUsername(usernameProp);
                } else {
                    setUsername("");
                }
            } catch (error) {
                console.error("Error decoding JWT token:", error);
                setUsername("");
            }
        };

        window.addEventListener("storage", handleStorageChange);
        handleStorageChange(); 

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setUsername(""); 
    };

   

     return (
        <header className="bg-gray-900 text-white">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="text-white">
                            home
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="text-white">
                            About
                        </a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="text-white">
                            Services
                        </a>
                        <div className="dropdown-content">
                            <Link to="/cars" className="text-white">
                                Cars
                            </Link>
                            <Link to="/your-garage" className="text-white">
                                Your Garage
                            </Link>
                        </div>
                    </li>
                    {username !== "" ? (
                        <>
                            <li className="text-white">Hello {`${role},${username}`}</li>
                            <button className="text-white" onClick={handleLogOut}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-white">
                                    log in
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-white">
                                    register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;