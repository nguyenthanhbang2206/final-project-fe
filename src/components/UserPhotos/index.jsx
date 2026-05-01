import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user details and photos concurrently
      const [userData, photosData] = await Promise.all([
        fetchModel(`http://localhost:8081/api/user/${userId}`),
        fetchModel(`http://localhost:8081/api/photosOfUser/${userId}`),
      ]);

      if (userData) {
        setUser(userData);
      }
      if (photosData) {
        setPhotos(photosData);
      }
    };

    fetchData();
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  const fmt = (dt) => {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleString();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            sx={{
              maxHeight: 400,
              objectFit: "contain",
            }}
            image={require(`../../images/${photo.file_name}`)}
            alt={photo.file_name}
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              {fmt(photo.date_time)}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle1">Comments</Typography>
            <List>
              {(photo.comments || []).map((c) => (
                <React.Fragment key={c._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <>
                          <Link to={`/users/${c.user._id}`}>
                            {c.user.first_name} {c.user.last_name}
                          </Link>
                          {` — ${fmt(c.date_time)}`}
                        </>
                      }
                      secondary={c.comment}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
