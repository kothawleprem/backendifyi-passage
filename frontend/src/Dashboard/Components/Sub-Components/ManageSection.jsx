import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,

  Table,
} from "react-bootstrap";

import "../Content.css";

const ManageSection = () => {
  const [emailboxList, setEmailboxList] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("psg_auth_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get("http://127.0.0.1:8000/api/emailbox/list/", config)
    .then((response) => {
      // console.log(response.data)
      const data = response.data
      setEmailboxList(data)
    })
  },[])
    

  const renderTableRows = () => {
    if (emailboxList !== undefined) {
      return emailboxList.map((msg, idx) => {
        return (
            <tr className="tableRow" key={msg.id}>
              <td>
                <div className="circle">
                  <span className="number">{idx+1}</span>
                </div>
              </td>
              <td className="emailboxName">{msg.name}</td>
              <td>
                <Button
                  size="sm"
                  className="visitButton"
                  onClick={() => navigate("/emailbox", {
                    state : {
                      "projectId": msg.project_id,
                    }
                  })}
                >
                  Visit
                </Button>
              </td>
            </tr>
        );
      });
    }
  }
  return (
    <>
      <Card className="manageCard">
        <Card.Body>
          <Card.Title className="subtitle">View & Manage EmailBox</Card.Title>
          <Card.Text>
            <br />
            <Table borderless size="sm" className="emailboxTable">
              <tbody>
                {renderTableRows()}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ManageSection;
