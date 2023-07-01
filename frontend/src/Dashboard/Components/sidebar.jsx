import React from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaUser} from "react-icons/fa";

import { useMediaQuery } from "react-responsive";
import "./sidebar.css";
import logo from "../../assets/Backendifyi.png";

const Sidebar = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="side-bar">
      {/* <img
        alt=""
        src="/Assets/MedConnect.png"
        width="165"
        height="30"
        className="d-inline-block align-top"
      /> */}

      <p
        style={{
          fontSize: "1.8rem",
          fontWeight: "900",
          color: "white",
          marginTop: "8px",
        }}
      >
        <center>
          <span style={{ color: "orange" }}>Backendifyi</span>
        </center>
      </p>
      <Nav className="flex-column sidebar " expand="lg" fixed="left">
        <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("ContentMain")}
            className="sidemenu"
            href="#"
          >
            <FaHome className="mr-2" /> {isMobile ? null : "Dashboard"}
          </Nav.Link>
        </div>

        {/* <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("Profile")}
            className="sidemenu"
            href="#"
          >
            <FaUser className="mr-2" /> {isMobile ? null : "Profile"}
          </Nav.Link>
        </div> */}
        <div className="sidemenu">
          <Nav.Link
            onClick={() => props.onClickButton("Logout")}
            className="sidemenu"
          >
            <FaUser className="mr-2" />
            {isMobile ? null : "Logout"}
          </Nav.Link>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
