import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat([...chat, { sender: "user", text: userMessage }]);
    setMessage("");

    try {
      const res = await axios.post(
        "https://hotel-website-hyqt.onrender.com/api/chat",
        { message: userMessage }
      );

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply }
      ]);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      background: "white",
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "10px"
    }}>
      <h4>Hotel Assistant</h4>

      <div style={{ height: "200px", overflowY: "auto" }}>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "100%" }}
      />

      <button onClick={sendMessage} style={{ width: "100%", marginTop: "5px" }}>
        Send
      </button>
    </div>
  );
}