import './App.css';

import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} onLogout={handleLogout} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {user ? <UserList /> : null}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {user ? (
                  <>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId" element={<UserPhotos />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/" element={<Navigate to={`/users/${user._id}`} />} />
                    <Route path="/login-register" element={<Navigate to={`/users/${user._id}`} />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="/login-register"
                      element={<LoginRegister onLoginSuccess={handleLoginSuccess} />}
                    />
                    <Route path="*" element={<Navigate to="/login-register" />} />
                  </>
                )}
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
