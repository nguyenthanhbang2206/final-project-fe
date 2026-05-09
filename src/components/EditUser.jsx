import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";

const EditUser = () => {
  const { user, login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        location: user.location || "",
        description: user.description || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      const newUser = {
        ...user,
        ...updated,
      };
      login(newUser);
      navigate("/user/" + user._id);
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          name="first_name"
          value={formData?.first_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="last_name"
          value={formData?.last_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="location"
          value={formData?.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={formData?.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button onClick={handleUpdate}>Save</Button>
      </div>
    </div>
  );
};

export default EditUser;
