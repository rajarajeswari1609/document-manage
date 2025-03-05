import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user.email || !user.password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3004/users/login", user);
      setMessage(response.data.message || "Login Successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="aa">Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} required />
        </div>

        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;