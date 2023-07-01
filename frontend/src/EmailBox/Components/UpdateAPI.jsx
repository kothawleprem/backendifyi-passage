import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaRegClipboard } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../Pages/Emailbox/Emailbox.css";
import axios from "axios";

const UpdateAPI = () => {
  const { state } = useLocation();
  console.log("updateapi", state);

  const [apiKey, setApiKey] = useState("");
  const [initialApiKey, setInitialApiKey] = useState("");

  const token = localStorage.getItem("psg_auth_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    project_id: state.projectId,
  };

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/project/apikey?project_id=${state.projectId}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setApiKey(data.api_key);
        setInitialApiKey(data.api_key);
      })
      .catch((error) => {
        console.error("Error fetching API key:", error);
      });
  }, []);

  const handleUpdateAPIKey = () => {
    axios
      .patch(`http://127.0.0.1:8000/api/project/apikey/`, data, config)
      .then((response) => {
        console.log(response.data);
        const updatedApiKey = response.data.api_key; // Get the updated API key from the response
        setApiKey(updatedApiKey); // Update the apiKey state with the new value
        setInitialApiKey(updatedApiKey); // Update the initial API key value
        alert("API Key updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating API key:", error);
        alert("An error occurred while updating the API Key.");
      });
  };

  return (
    <>
      <Form>
        <Row>
          <Col xl={9} lg={9} md={12} sm={12}>
            <Form.Group controlId="formTextField">
              <Form.Control
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formButton">
              <CopyToClipboard text={apiKey}>
                <Button className="formButton">
                  <FaRegClipboard />
                </Button>
              </CopyToClipboard>
              &nbsp;
              <Button className="formButton" onClick={handleUpdateAPIKey}>
                Update API Key
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UpdateAPI;
