import React, { useState } from "react";
import axios from "axios";


const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

 const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user.username || !user.email || !user.password) {
      setMessage("❌ All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3004/users/signup", user);
      setMessage(response.data.message || "✅ Signup Successful!");
      setUser({ username: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Signup Failed!");
    }
  };

  return (
    <div className="form">
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} required />
        </div>

        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
    </div>
  );
};

export default Signup;
