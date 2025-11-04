import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
      });

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to reach chatbot server." },
      ]);
    }
  };

  return (
    <>
  <style>{`
  /* ========== CONTAINER ========== */
  .chatbot-container {
    width: 420px;
    height: 85vh;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at top left, #1b2333, #0f172a 70%);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    font-family: "Inter", sans-serif;
    color: #fff;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  /* ========== HEADER ========== */
  .chatbot-header {
    background: rgba(17, 24, 39, 0.9);
    color: #7dd3fc;
    text-align: center;
    padding: 18px 0;
    font-size: 1.1rem;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    letter-spacing: 0.4px;
  }

  /* ========== CHAT WINDOW ========== */
  .chat-window {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: linear-gradient(180deg, #111827 0%, #0f172a 100%);
    scrollbar-width: thin;
    scrollbar-color: #4f46e5 #111827;
  }

  .chat-window::-webkit-scrollbar {
    width: 6px;
  }
  .chat-window::-webkit-scrollbar-thumb {
    background-color: #4f46e5;
    border-radius: 6px;
  }

  /* ========== MESSAGE BUBBLES ========== */
  .msg {
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 16px;
    line-height: 1.5;
    font-size: 0.95rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    white-space: pre-wrap;
    word-break: break-word;
    animation: fadeIn 0.25s ease;
    transition: all 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .msg.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .msg.bot {
    align-self: flex-start;
    background: #1f2937;
    color: #e2e8f0;
    border-bottom-left-radius: 4px;
  }

  /* ========== INPUT AREA ========== */
  .chat-input-area {
    display: flex;
    align-items: center;
    padding: 14px;
    background: rgba(17, 24, 39, 0.9);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
  }

  .chat-input-area input {
    flex: 1;
    background: #1f2937;
    border: 1px solid #374151;
    border-radius: 10px;
    color: #fff;
    padding: 12px 14px;
    outline: none;
    font-size: 0.95rem;
    transition: border-color 0.2s ease;
  }

  .chat-input-area input:focus {
    border-color: #6366f1;
  }

  .chat-input-area button {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 10px;
    margin-left: 10px;
    padding: 10px 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .chat-input-area button:hover {
    background: linear-gradient(135deg, #818cf8, #6366f1);
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  }
`}</style>

      <div className="chatbot-container">
        <header className="chatbot-header">🤖 PlaceMate Chatbot</header>

        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
