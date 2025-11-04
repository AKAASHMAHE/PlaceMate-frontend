import React, { useState, useRef, useEffect } from "react";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { text: input, sender: "user" };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Inline CSS (merged from ChatWindow.css) */}
      <style>{`
        .chat-window-container {
          display: flex;
          flex-direction: column;
          height: 85vh;
          width: 380px;
          background: #1f2937;
          border-radius: 16px;
          margin: 40px auto;
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          font-family: 'Poppins', sans-serif;
        }

        .chat-window-header {
          background: #282c34;
          color: #61dafb;
          padding: 16px;
          text-align: center;
          font-weight: bold;
          border-bottom: 1px solid #333;
        }

        .chat-window-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chat-msg {
          max-width: 70%;
          padding: 10px 14px;
          border-radius: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .chat-msg.user {
          align-self: flex-end;
          background: #61dafb;
          color: #1f2937;
          border-top-right-radius: 0;
        }

        .chat-msg.other {
          align-self: flex-start;
          background: #374151;
          color: #fff;
          border-top-left-radius: 0;
        }

        .chat-window-input {
          display: flex;
          padding: 10px;
          background: #282c34;
          border-top: 1px solid #333;
        }

        .chat-window-input input {
          flex: 1;
          background: #1f2937;
          border: none;
          border-radius: 10px;
          color: #fff;
          padding: 10px;
          outline: none;
          font-size: 0.95rem;
        }

        .chat-window-input button {
          background: #61dafb;
          color: #1f2937;
          border: none;
          border-radius: 10px;
          margin-left: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .chat-window-input button:hover {
          background: #4fc3f7;
        }
      `}</style>

      <div className="chat-window-container">
        <div className="chat-window-header">💬 Messaging Service</div>

        <div className="chat-window-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-msg ${m.sender === "user" ? "user" : "other"}`}
            >
              {m.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-window-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
