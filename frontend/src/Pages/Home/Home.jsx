import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import rocket from "../../assets/rocket.png";
import charmRocket from "../../assets/charm_rocket.png";
// import announcement from "../../assets/announcement.png"
// import play from "../../assets/bi_play-fill.png";
// import mouse from "../../assets/bi_mouse.png";

import "./Home.css";

import NavBar from "../../Components/NavBar/NavBar";
import Newsletter from "../../Components/Newsletter/Newsletter";
// import Footer from "../../Components/Footer/Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [isAuth, setisAuth] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate()
  console.log(state);
  if (state !== null) {
    console.log("in if");
    if (state.authenticate === false) {
      console.log("show toast");
      toast.info("Please Sign In To Experience Backendifyi", {
        autoClose: 3000, // Adjust the duration as needed
      });
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("psg_auth_token");
    if (token && token !== null) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get("http://127.0.0.1:8000/api/client/auth/page/", config)
        .then((response) => {
          if (response.status === 200) {
            setisAuth(true);
          }
        });
    }
  }, []);
  return (
    <>
      <div className="home-body">
        <NavBar />
        <Container>
          <Row>
            <Col xl={6} lg={6} md={12} sm={12}>
              <div className="text">
                <h1 className="title" style={{ fontSize: "50px" }}>
                  Simplify Your Backend,
                  <br />
                  Amplify Your Application <br />
                </h1>
                <br />
                <p className="subtitle">
                  Streamline your backend development with easy-to-use APIs and
                  a dashboard for managing data.
                </p>
                {/* <div className="button">
                  <Col>
                      <Button
                        type="button"
                        className="btn btn-outline-danger btn-lg"
                        href="/"
                      >
                   
                        Launching Soon
                      </Button>
                    </Col>
                  

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-lg"
                    href="/documentation"
                  >
                    <img src={charmRocket} style={{ height: "30px" }} alt="" />
                    Get Started
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                  >
                    <img
                      // src={play}
                      style={{ height: "30px" }}
                      className=""
                      alt=""
                    />
                    How it Works
                  </button>
                </div> */}
                {isAuth === true ? (
                  <>
                    <div className="button">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-lg"
                        onClick={() => navigate("/dashboard")}
                      >
                        <img
                          src={charmRocket}
                          style={{ height: "30px" }}
                          alt=""
                        />
                        Dashboard
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="button">
                      <div className="button">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-lg"
                        onClick={() => navigate("/login")}
                      >
                        <img
                          src={charmRocket}
                          style={{ height: "30px" }}
                          alt=""
                        />
                        Get Started
                      </button>
                    </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12}>
              <center>
                <img className="main-rocket" src={rocket} alt="" />
              </center>
            </Col>
          </Row>
          <br />
          <Newsletter className="footer" />
        </Container>
        <br />
        {/* <Footer /> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
