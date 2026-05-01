import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";


function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchModel("http://localhost:8081/api/user/list");
      if (data) {
        setUsers(data);
        
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText primary={` ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
