import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatList({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        // Exclude current user
        setUsers(data.filter((u) => u._id !== currentUserId));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl w-64">
      <h3 className="text-indigo-400 font-bold mb-4">Chat Users</h3>
      {users.map((user) => (
        <div
          key={user._id}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded mb-2"
          onClick={() => navigate(`/chat/${user._id}`)}
        >
          {user.name} ({user.role})
        </div>
      ))}
    </div>
  );
}

export default ChatList;
