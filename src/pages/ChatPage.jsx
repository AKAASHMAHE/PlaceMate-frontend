import React from "react";
import { useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const { userId } = useParams();
  const currentUserId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

  return (
    <div className="flex gap-4 p-6 h-screen bg-gray-900">
      <ChatList currentUserId={currentUserId} />
      {userId ? (
        <div className="flex-1">
          <ChatWindow otherUserId={userId} currentUserId={currentUserId} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a user to chat
        </div>
      )}
    </div>
  );
}
