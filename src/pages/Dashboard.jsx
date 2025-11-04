import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    const urlToken = new URLSearchParams(window.location.search).get("token");

    // If URL has a token (after Google auth), prefer it
    if (urlToken) {
      token = urlToken;
      localStorage.setItem("token", token);
    }

    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        if (data && data.email) {
          setUser(data);
        } else {
          throw new Error("Invalid user");
        }
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-20 text-white">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-white">
        <h2>No user data found ❌</h2>
        <button
          className="bg-indigo-500 px-4 py-2 rounded mt-4"
          onClick={() => navigate("/")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-3xl font-bold">Welcome, {user.name} 🎉</h1>

      {user.picture && (
        <img
          src={user.picture}
          alt="Profile"
          className="rounded-full mx-auto my-6 w-32 h-32"
        />
      )}

      <p>Email: {user.email}</p>
      {user.role && <p>Role: {user.role}</p>}
      {user.skills?.length > 0 && <p>Skills: {user.skills.join(", ")}</p>}
      {user.company && <p>Company: {user.company}</p>}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mt-6"
      >
        Logout
      </button>
    </div>
  );
}
