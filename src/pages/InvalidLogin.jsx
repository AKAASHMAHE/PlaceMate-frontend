import React from "react";
import { useNavigate } from "react-router-dom";

function InvalidLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 w-full max-w-lg p-10 rounded-3xl shadow-xl border border-gray-700 text-center">
        <h2 className="text-4xl font-bold text-indigo-400 mb-6">
          Oops!
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          It looks like you tried to login with an email that is not part of your college domain.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-500 px-6 py-3 rounded-2xl font-semibold text-white hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg"
        >
          Login with College Email
        </button>
      </div>
    </div>
  );
}

export default InvalidLogin;
