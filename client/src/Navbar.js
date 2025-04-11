import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // converts to true/false
    }, [localStorage.getItem("username")]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (

        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                {localStorage.getItem("username") ? (
                    <>
                        <Link to="/create">New Blog</Link>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;