import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard_t1";
import ProfileSetup from "./pages/ProfileSetup";
import InvalidLogin from "./pages/InvalidLogin";
import ForumPage from "./pages/Forum.jsx";
import ChatWindow from "./pages/ChatWindow"; 
import STAT from "./pages/STAT"; 
import Profile from "./pages/profile.jsx"
import JobsPage from "./pages/JobsPage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />

        {/* Chatbot */}
        <Route path="/Chatbot" element={<Chatbot />} />

        {/* Profile setup */}
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />       {/* Chat routes */}
     <Route path="/chat/:userId?" element={<ChatWindow />} />
     <Route path="/forum/*" element={<ForumPage />} />
  <Route path="/stat" element={<STAT />} />
<Route path="/profile" element={<Profile />} />
  <Route path="/jobs" element={<JobsPage />} /> 
        {/* Invalid login */}
        <Route path="/invalid-login" element={<InvalidLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
