import "./Header.css"; 
import React, { useState } from "react";
import PageImage from "../assets/Page.png";  
import LoginForm from "./LoginForm"; // Import the new component

const Header = () => {
  const [showLogin, setShowLogin] = useState(false); // State to toggle login form
  const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>Electricity Monitoring System</h1>
          <p>By Shrey and Mahimna</p>
        </div>

        <nav className="nav">
          <a href="">About</a>
          <a href="">Services</a>
          <a href="">News</a>
          <a href="">Blog</a>
          <a href="">Guides</a>
          <a href="">Contact</a>
        </nav>

        {/* Show username if logged in, otherwise show Login button */}
        {loggedInUser ? (
          <span className="username">{loggedInUser}</span>
        ) : (
          <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
        )}
      </header>
      
      <div>
        <img src={PageImage} alt="PageImageHere" style={{
            width: "100%",  
            display: "block",
            margin: "20px auto",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
          }} />
      </div>    

      {/* Show Login Form when button is clicked */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} onLogin={setLoggedInUser} />}
    </>
  );
};

export default Header;
