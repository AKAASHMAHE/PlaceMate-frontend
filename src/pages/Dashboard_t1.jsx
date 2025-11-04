// src/pages/Dashboard_t1.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard_t1.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
        const storedToken = localStorage.getItem("token");

        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
        }

        const token = tokenFromUrl || storedToken;
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-900">
        Loading your dashboard...
      </div>
    );
  }

  // ✅ Function to handle mock interview session (Jitsi call)
  const handleMockInterview = () => {
    const roomName = `placemate-mock-${user.name.replace(/\s+/g, "")}`;
    const jitsiUrl = `https://meet.jit.si/${roomName}`;
    window.open(jitsiUrl, "_blank");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>PlaceMate</h1>
        <nav className="nav">
          <Link to="/dashboard"><span>🏠</span> Dashboard</Link>
          <Link to="/profile"><span>👤</span> Profile</Link>
          <Link to="/forum"><span>💬</span> Forum</Link>
          <Link to="/chat"><span>📨</span> Messaging</Link>
          <Link to="/Chatbot"><span>🤖</span> Chatbot</Link>
          <Link to="/stat"><span>📊</span> Statistics</Link>

          {/* ✅ Added Mock Interview Session with same styling as other links */}
          <button
            onClick={handleMockInterview}
            className="sidebar-link"
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              font: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
              textAlign: "left",
              padding: "3px 3px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          > 
          🎥 Mock Interview Session
          </button>
        </nav>
        <Link to="/" className="logout">Logout</Link>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <h2>
            Welcome Back, <span>{user.name}</span>
          </h2>
          <div className="flex items-center">
            {user.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="avatar-img"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginLeft: "10px" }}
              />
            ) : (
              <div className="avatar">👤</div>
            )}
          </div>
        </header>

        {/* Dashboard Widgets */}
        <section className="grid grid-3">
          <div className="card">
            <h3>Your Profile</h3>
            <div className="flex items-center" style={{ gap: "16px", flexWrap: "wrap" }}>
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  style={{ width: "64px", height: "64px", borderRadius: "50%" }}
                />
              ) : (
                <div className="avatar" style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}>👤</div>
              )}
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm">{user.role !== "unassigned" ? user.role : "Role not set"}</p>
                <p className="text-sm">{user.skills?.length ? user.skills.join(", ") : "No skills added"}</p>
                <p className="text-sm">{user.companies?.length ? user.companies.join(", ") : "No company info"}</p>
              </div>
            </div>
            <Link to="/profile" className="btn mt-3">Edit Profile</Link>
          </div>

          <div className="card">
            <h3>Forum Highlights</h3>
            <ul className="list">
              <li>💡 How to prepare for Deloitte interviews?</li>
              <li>📘 Best resources for DSA in Java?</li>
              <li>🎯 Tips for Group Discussions?</li>
            </ul>
            <Link to="/forum" className="btn">View Forum</Link>
          </div>

          <div className="card">
            <h3>Connect</h3>
            <p>View and chat with your seniors and juniors</p>
            <Link to="/chat" className="btn">Open</Link>
          </div>
        </section>

        {/* 📊 Statistics Section */}
        <section className="card mt-8">
          <h3>Placement Statistics</h3>
          <ul className="list">
            <li>✅ Average Package (CSE): ₹8.5 LPA</li>
            <li>🏢 Top Recruiter: Amazon (30 hires)</li>
            <li>🔥 Highest Package: ₹42 LPA</li>
          </ul>
          <Link to="/stat" className="btn mt-4">View Detailed Stats</Link>
        </section>

        {/* ✅ Placement Q&A Section */}
        <section className="card mt-8">
          <h3>Placement Questions & Tips</h3>
          <div className="qa-item">
            <span className="q">Q:</span> What are some common HR questions asked in interviews?
            <p><span className="tip">Tip:</span> Prepare answers for “Tell me about yourself”, “Why should we hire you?”, and “Where do you see yourself in 5 years?”</p>
          </div>
          <div className="qa-item">
            <span className="q">Q:</span> How to prepare for the coding round effectively?
            <p><span className="tip">Tip:</span> Focus on DSA concepts — arrays, strings, recursion, and dynamic programming. Use platforms like LeetCode and GeeksforGeeks.</p>
          </div>
          <div className="qa-item">
            <span className="q">Q:</span> What should I include in my resume for IT placements?
            <p><span className="tip">Tip:</span> Highlight projects, internships, and core skills. Keep it one page and avoid unnecessary details.</p>
          </div>
          <div className="qa-item">
            <span className="q">Q:</span> How can I improve my communication skills for interviews?
            <p><span className="tip">Tip:</span> Practice mock interviews with peers, record yourself, and engage in discussions or debates regularly.</p>
          </div>
          <div className="qa-item">
            <span className="q">Q:</span> How to approach group discussions?
            <p><span className="tip">Tip:</span> Be confident, concise, and respectful. Start with facts or examples and avoid interrupting others.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;