import React, { useEffect, useState } from "react";

import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const token = localStorage.getItem("psg_auth_token");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/client/profile/`, config)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setProfile(response.data);
        // const data = response.json()
        // console.log(data)
      });
  }, []);
  return (
    <div>
      {profile != undefined ? <div>Welcome, {profile.name}</div> : <></>}
    </div>
  );
};

export default Profile;
