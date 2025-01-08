import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Import the emoji picker library

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji); // Add emoji to message
    setEmojiPickerVisible(false); // Close emoji picker after emoji selection
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <div className="input__container">
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button
            type="button"
            className="emoji__btn"
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          >
            😀
          </button>
          {emojiPickerVisible && (
            <div className="emoji__picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
