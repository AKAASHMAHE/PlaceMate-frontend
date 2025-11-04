// src/pages/ChatWindow.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./ChatWindow.css"; // We'll create proper CSS for styling

const ChatWindow = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null); // Logged-in user
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return window.location.href = "/login";

      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Remove logged-in user from the list
        setUsers(res.data.filter(u => u._id !== user?._id));
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

// Setup socket connection
useEffect(() => {
  if (!user) return;

  socketRef.current = io("http://localhost:5000");
  socketRef.current.emit("userConnected", user._id);

  socketRef.current.on("receiveMessage", (msg) => {
    // ✅ Only add messages that are NOT sent by the logged-in user
    if (msg.senderId !== user._id) {
      setMessages((prev) => [...prev, msg]);
    }
  });

  return () => socketRef.current.disconnect();
}, [user]);


  // Fetch messages with selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${selectedUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUser]);

const handleSend = () => {
  if (!newMessage.trim() || !selectedUser) return;

  const msgData = {
    senderId: user._id,
    receiverId: selectedUser._id,
    content: newMessage,
    createdAt: new Date(),
  };

  // ✅ Emit message through socket
  socketRef.current.emit("sendMessage", msgData);

  // ✅ Add it locally just once
  setMessages((prev) => [...prev, msgData]);

  setNewMessage("");
};


  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chat-dashboard">
      {/* Left panel: user list */}
      <div className="chat-users-panel">
        <h2>Users</h2>
        {users.map(u => (
          <div
            key={u._id}
            className={`chat-user-card ${selectedUser?._id === u._id ? "selected" : ""}`}
            onClick={() => setSelectedUser(u)}
          >
            <img src={u.picture} alt={u.name} className="avatar" />
            <div className="user-info">
              <p className="name">{u.name}</p>
              <p className="role">{u.role}</p>
              <p className="skills">{u.skills?.join(", ")}</p>
              <p className="companies">{u.companies?.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right panel: chat window */}
      <div className="chat-window-panel">
        {!selectedUser ? (
          <div className="no-chat-selected">
            Select a user to start chatting
          </div>
        ) : (
          <>
            <div className="chat-header">
              <img src={selectedUser.picture} alt={selectedUser.name} className="avatar" />
              <h3>{selectedUser.name}</h3>
            </div>
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${msg.senderId === user._id ? "sent" : "received"}`}
                >
                  <p>{msg.content}</p>
                  <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
