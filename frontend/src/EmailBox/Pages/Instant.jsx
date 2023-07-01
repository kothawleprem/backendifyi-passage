import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { Container, Card, Col, Row, Form, Button } from 'react-bootstrap'
import "./Instant.css"

import axios from 'axios';

import NavBar from '../../Components/NavBar/NavBar';


const Instant = () => {
  const { state } = useLocation();
  console.log("state", state)
  const { emailId, email } = state;

  const [subject, setSubject] = useState();
  const [body, setBody] = useState();

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = () => {
    const emailData = {
      "emailId": emailId,
      "subject": subject,
      "body": body,
    };
    console.log(emailData)
    const token = localStorage.getItem("psg_auth_token")
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // Make the API call using fetch or Axios
    axios.post("http://127.0.0.1:8000/api/emailbox/instantReply/", 
      emailData,
      config
    ).then((response) => {
      if (response.status == 201) {
        alert("Email Sent Succesfully");
      }
    });
      
  };

  return (
    <>
    <NavBar/>
      <Container className="emailboxDiv">
        <Card className="manageCard">
          <Card.Title className="cardFormTitle">
            Send Instant Reply to <b>{email}</b>{" "}
          </Card.Title>
          <Card.Text className="cardFormText">
            <Form>
              <Form.Group controlId="formTextField">
                <Form.Control
                  type="text"
                  onChange={handleSubjectChange}
                  placeholder="Enter Subject for your Reply"
                />
                <br />
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={5}
                  onChange={handleBodyChange}
                  placeholder="Enter Your Reply...."
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formButton">
                <Button
                  className="formButton"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Send Text as Email Reply
                </Button>
              </Form.Group>
              <br />
            </Form>
          </Card.Text>
        </Card>
      </Container>
    </>
  );
}

export default Instant