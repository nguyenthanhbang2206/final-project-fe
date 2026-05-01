import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();

  let rightText = "";

  const userMatch = location.pathname.match(/\/users\/([^\/]+)/);
  const photosMatch = location.pathname.match(/\/photos\/([^\/]+)/);

  if (userMatch) {
    rightText = "User Details";
  } else if (photosMatch) {
    rightText = "User Photos";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" color="inherit">
            Nguyễn Thanh Bằng B23DCCN066
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="inherit">
            {rightText}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
