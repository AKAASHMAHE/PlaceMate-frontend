import React, { useEffect } from "react";

const JitsiRoom = ({ roomName }) => {
  useEffect(() => {
    const loadJitsi = async () => {
      try {
        // Call your backend API for the JWT token
        const res = await fetch(`http://localhost:5000/jitsi/token?room=${roomName}`, {
          credentials: "include", // send cookies if needed
        });

        if (!res.ok) {
          console.error("Failed to get Jitsi token");
          return;
        }

        const { token } = await res.json();

        const domain = "meet.jitsi"; // or your custom Jitsi domain
        const options = {
          roomName,
          width: "100%",
          height: 600,
          parentNode: document.getElementById("jitsi-container"),
          jwt: token,
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
          },
        };

        // Initialize Jitsi Meet
        new window.JitsiMeetExternalAPI(domain, options);
      } catch (err) {
        console.error("Error loading Jitsi:", err);
      }
    };

    loadJitsi();
  }, [roomName]);

  return <div id="jitsi-container" style={{ height: "600px", width: "100%" }} />;
};

export default JitsiRoom;
