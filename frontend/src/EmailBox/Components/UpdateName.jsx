import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import "../Pages/Emailbox/Emailbox.css";

import axios from "axios";

const UpdateName = () => {
  const { state } = useLocation();
  console.log("updatename", state);

  const [projectName, setProjectName] = useState("");
  const [initialProjectName, setInitialProjectName] = useState("");
  const token = localStorage.getItem("psg_auth_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/project/name?project_id=${state.projectId}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setProjectName(data.project_name);
        setInitialProjectName(data.project_name);
      });
  }, []);

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = async () => {
    if (projectName === initialProjectName) {
      alert("The project name is already set to this value.");
      return;
    }

    if (!projectName) {
      alert("Please enter a project name");
      return;
    }

    const data = {
      project_id: state.projectId,
      project_name: projectName,
    };

    axios
      .patch("http://127.0.0.1:8000/api/project/name/", data, config)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("Project name updated successfully!");
        setInitialProjectName(projectName); // Update initialProjectName to reflect the new value
      })
      .catch((error) => {
        console.error("Error updating project name:", error);
        alert("An error occurred while updating the project name.");
      });
  };

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formTextField">
              <Form.Control
                type="text"
                onChange={handleInputChange}
                value={projectName}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formButton">
              <Button
                className="formButton"
                type="button"
                onClick={handleSubmit}
              >
                Update Name
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UpdateName;
