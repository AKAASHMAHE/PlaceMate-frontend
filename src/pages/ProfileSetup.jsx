// src/pages/ProfileSetup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const navigate = useNavigate();

  // ✅ State variables
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [company, setCompany] = useState("");
  const [newSkill, setNewSkill] = useState("");

  // ✅ Get token from URL query
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  // ✅ Save token to localStorage if present
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Add/remove skills
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) return navigate("/login");

      const formData = new FormData();
      formData.append("role", role);
      formData.append("skills", JSON.stringify(skills));
      formData.append("companies", JSON.stringify(company ? [company] : []));
    

      const res = await fetch("http://localhost:5000/api/users/profile-setup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${savedToken}`, // ✅ browser sets Content-Type
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save profile");

      navigate("/dashboard"); // ✅ token is already in localStorage
    } catch (err) {
      console.error("❌ Profile setup error:", err);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 w-full max-w-2xl p-10 rounded-3xl shadow-xl border border-gray-700">
        <h2 className="text-4xl font-bold text-indigo-400 mb-8 text-center">
          Complete Your Profile
        </h2>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select role</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Skills</label>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-indigo-500 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-700 px-3 py-1 rounded-full text-gray-200 cursor-pointer hover:bg-red-600 transition"
                onClick={() => removeSkill(skill)}
              >
                {skill} ×
              </span>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Company (optional)</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company you are working at"
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

     

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

export default ProfileSetup;
