import React from "react";
import { useLocation } from "react-router-dom";

function Signup() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const name = query.get("name");
  const email = query.get("email");
  const picture = query.get("picture");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Signup / Dashboard</h1>
      {name && (
        <div>
          <img src={picture} alt="profile" style={{ borderRadius: "50%" }} />
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      )}
    </div>
  );
}

export default Signup;
