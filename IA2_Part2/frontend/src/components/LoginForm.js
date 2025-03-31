import React, { useState } from "react";

const LoginForm = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle login request
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login Successful!"); 
        onLogin(username); // Update username in Header
        onClose(); // Close login form
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Server error! Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Show error if exists */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" onClick={handleLogin}>Login</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginForm;

