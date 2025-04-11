import { useState } from "react";
import api from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    
      // Replace this with your API call
      console.log("Sending data to server:", formData);
      api.post('/user/signup', formData)
      .then(res=>{
        console.log(res)
        setSuccess("Sign up successful!");
        setError("");
        setFormData({ username: "", email: "", password: "" });

      }).catch(err=>{
        console.log(err)
      })

    
  };

  return (
    <div className="create">
      <h2 >Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
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
          Sign Up
        </button>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
};

export default Signup;
