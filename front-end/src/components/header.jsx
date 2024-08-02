import React, { useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";



const Header = () => {

    const [userDetails,setUserDetails] = useState({username:null,role:null});

    useEffect(() => {
        const handleStorageChange = async () => {
            try {
                const jwtToken = localStorage.getItem("token");
                if (jwtToken) {
                    const decodedToken = await jwtDecode(jwtToken);
                    const usernameProp = decodedToken.given_name ; 
                    const roleProp = decodedToken.role;
                    setUserDetails({username:usernameProp,role:roleProp})
                   
                } else {
                    setUserDetails({username:null,role:null});
                }
            } catch (error) {
                console.error("Error decoding JWT token:", error);
                
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
        setUserDetails({username:null,role:null}); 
    };

   

     return (
         
             <header className="bg-gray-900 text-white">
                 <nav>
                 <ul className="list-none" >
                         <li>
                             <Link to="/" className="text-white">
                                 home
                             </Link>
                         </li>
             <li>
               <Link to="/chat" className="text-white">
                 chat
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
                                 <Link to="/Garage" className="text-white">
                                     Your Garage
                                 </Link>
                             </div>
                         </li>
                         {userDetails.username !== null ? (
                             <>
                                 <li className="text-white">
                                     {`Hello ${userDetails.role}, ${userDetails.username}`}
                </li>
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