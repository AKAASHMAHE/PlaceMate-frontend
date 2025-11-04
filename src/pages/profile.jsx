import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [company, setCompany] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user details when page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        setUser(data);
        setSkills(data.skills || []);
        setCompany(data.companies?.[0] || "");
      } catch (err) {
        console.error("❌ Error loading profile:", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Add / remove skills
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // ✅ Handle Save
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const formData = new FormData();
      formData.append("role", user.role);
      formData.append("skills", JSON.stringify(skills));
      formData.append("companies", JSON.stringify([company]));

      const res = await fetch("http://localhost:5000/api/users/profile-setup", {
        method: "POST",
        headers: { Authorization:` Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        throw new Error("Failed to update profile");
      }

      alert("✅ Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Profile update error:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-900">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 w-full max-w-2xl p-10 rounded-3xl shadow-xl border border-gray-700">
        <h2 className="text-4xl font-bold text-indigo-400 mb-8 text-center">
          Edit Profile
        </h2>

        {/* Name (Read-only) */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Name</label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full p-3 rounded-xl bg-gray-700 text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Company */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter your company"
            className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Skills</label>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
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
                onClick={() => removeSkill(skill)}
                className="bg-gray-700 px-3 py-1 rounded-full text-gray-200 cursor-pointer hover:bg-red-600 transition"
              >
                {skill} ×
              </span>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold text-xl transition transform hover:scale-105 shadow-lg ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;