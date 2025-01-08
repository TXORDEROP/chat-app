import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Using React Icons for user icon

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };

  return (
    <div className="home__container">
      <div className="home__content">
        <h2 className="home__header">Sign in to Chat</h2>
        <form className="home__form" onSubmit={handleSubmit}>
          <div className="input__container">
            <FaUser className="input__icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="home__input"
            />
          </div>
          <button type="submit" className="home__cta">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
