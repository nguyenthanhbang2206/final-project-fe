import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";

function TopBar({ user, onLogout }) {
  const location = useLocation();
  const [uploadMessage, setUploadMessage] = useState("");

  let rightText = "";
  const userMatch = location.pathname.match(/\/users\/([^\/]+)/);
  const photosMatch = location.pathname.match(/\/photos\/([^\/]+)/);

  if (userMatch) {
    rightText = "User Details";
  } else if (photosMatch) {
    rightText = "User Photos";
  }

  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("photo-upload-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("http://localhost:8081/api/photo/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadMessage("Photo uploaded successfully!");
        setTimeout(() => setUploadMessage(""), 3000);
        // Refresh the page or update state to show new photo
        window.location.reload();
      } else {
        const data = await response.json();
        setUploadMessage(`Upload failed: ${data.error}`);
      }
    } catch (err) {
      setUploadMessage(`Upload error: ${err.message}`);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="h6" color="inherit">
            Nguyễn Thanh Bằng B23DCCN066
          </Typography>
          {uploadMessage && (
            <Typography variant="body2" sx={{ ml: 2, color: "yellow" }}>
              {uploadMessage}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Typography variant="subtitle1" color="inherit">
                Hi {user.first_name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleUploadButtonClick}
              >
                Add Photo
              </Button>
              <input
                type="file"
                id="photo-upload-input"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="subtitle1" color="inherit">
              Please Login
            </Typography>
          )}
          <Typography variant="subtitle1" color="inherit" sx={{ ml: 2 }}>
            {rightText}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
