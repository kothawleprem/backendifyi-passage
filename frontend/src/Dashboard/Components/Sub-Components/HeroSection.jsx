import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import "../Content.css";
import mailbox from "../../../assets/undraw_mailbox_re_dvds.svg";

const HeroSection = () => {
  // console.log("heoo")
  const [project, setProject] = useState()
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    setProject(event.target.value);
  };

  const handleSubmit = (async() => {
    if( project == null || project == undefined ){
      alert("Please Enter EmailBox Name")
      return
    }
    const token = localStorage.getItem("psg_auth_token");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      "project_name": project,
    };
    console.log(data)
    axios
      .post(`http://127.0.0.1:8000/api/emailbox/`, data, config)
      .then((response) => {
        const project_id = response.data.project_id
        navigate("/emailbox", {
          state: {
            projectId: project_id,
          },
        });
      });
  })
  return (
    <>
      <Card className="heroCard">
        <Card.Body>
          <Row>
            <Col xl={3} lg={3} md={12} sm={12}>
              <center>
                <img src={mailbox} className="mailbox" alt="My SVG" />
              </center>
            </Col>

            <Col xl={9} lg={9} md={12} sm={12}>
              <Card className="rightHeroCard">
                <Card.Title className="heroTitle">EmailBox</Card.Title>
                <Card.Text className="heroText">
                  Streamline Customer Communication and Business Leads by
                  Capturing and Managing Email Addresses Effortlessly.
                </Card.Text>
                <Card.Text className="heroText">
                  Easy Integration | Quick Reply | Filtering | Analysis |
                  Download Data
                </Card.Text>
                <Form>
                  <Row>
                    <Col xl={6} lg={6} md={12} sm={12}>
                      <Form.Group controlId="formTextField">
                        <Form.Control
                          type="text"
                          onChange={handleInputChange}
                          placeholder="Enter Project Name (EmailBox Name)"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Button
                          className="formButton"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Create EmailBox
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default HeroSection