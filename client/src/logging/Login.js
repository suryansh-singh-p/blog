import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        if (!username || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await api.post('/user/login', formData); // Adjust if your route is different
            const token = response.data.token;

            // Save token in localStorage or cookies
            localStorage.setItem('token', token);
            localStorage.setItem("username", response.data.username); // or whatever key you're getting from backend
            console.log(localStorage.getItem("username"));


            setError('');
            console.log('Login successful!');
            navigate('/'); // Redirect to homepage or dashboard
        } catch (err) {
            console.error(err);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="create">
            <h2 >Log In</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label className="block mb-2">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                >
                    Log In
                </button>
                <Link to="/signup">
                    <button>
                        Signup
                    </button>
                </Link>

                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </div>
    );
};

export default Login;
