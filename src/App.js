import './App.css';

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import { useContext } from "react";
import { AppContext } from "./AppContext";

const App = () => {
  const { user, login, logout } = useContext(AppContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar />
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
                      element={<LoginRegister onLoginSuccess={login} />}
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
