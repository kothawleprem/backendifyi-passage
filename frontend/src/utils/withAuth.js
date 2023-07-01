import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (Component) => {
  const WrappedComponent = (props) => {
    // const token = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("psg_auth_token");
      console.log("in withAuth", token);
      if (!token || token === null) {
        // Redirect unauthenticated users to the login page
        console.log("home");
        navigate("/", {
          state: {
            authenticate: false,
          },
        });
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get("http://127.0.0.1:8000/api/client/auth/", config)
          .then((response) => {
            if (response.status !== 200) {
              navigate("/", {
                state: {
                  authenticate: false,
                },
              });
            }
          });
      }
    }, [navigate]);

    // Render the protected component for authenticated users
    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuth;
