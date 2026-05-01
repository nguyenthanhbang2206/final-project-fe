import React, { useState, useEffect } from "react";
import { Typography, Divider, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchModel(`http://localhost:8081/api/user/${userId}`);
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {user.location}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">{user.description}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Occupation: </strong>
        {user.occupation}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>
        <Link to={`/photos/${user._id}`}>View photos of {user.first_name}</Link>
      </Typography>
    </Box>
  );
}

export default UserDetail;
