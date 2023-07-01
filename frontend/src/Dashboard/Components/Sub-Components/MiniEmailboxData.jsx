import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Card, Button, Table } from "react-bootstrap";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineEmail, MdDelete } from "react-icons/md";
import { FcFlashOn } from "react-icons/fc";

import "../Content.css";

import axios from "axios";

const MiniEmailboxData = () => {
    const navigate = useNavigate()
    const [emails, setEmails] = useState();

    useEffect(() => {
      const token = localStorage.getItem("psg_auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(
          `http://127.0.0.1:8000/api/emailbox/allEmails/`,
          config
        )
        .then((response) => {
          console.log(response.data);
          const data = response.data;
          setEmails(data);
        });
    }, []);

    const renderTableRows = () => {
      if (emails !== undefined) {
        return emails.map((email, idx) => {
          return (
            <tr key={email.id}>
              <td>{idx + 1}</td>
              <td>{email.email_address}</td>
              <td>{email.date}</td>
              <td>{email.project_name}</td>
              <td>
                <Button onClick={() => navigate("/emailbox/instant")}>
                  <FcFlashOn /> Instant
                </Button>
              </td>
              <td>
                <Button href={"mailto: " + email.email_address}>
                  <MdOutlineEmail /> Reply
                </Button>
              </td>
              <td>
                <CopyToClipboard>
                  <Button>
                    <FaRegClipboard /> Copy
                  </Button>
                </CopyToClipboard>
              </td>
            </tr>
          );
        });
      }
    };
  return (
    <>
      <Card className="manageCard">
        <Card.Title className="cardTitle">Recent EmailBox Data</Card.Title>
        <Card.Body>
          <Table bordereless hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Email Id</th>
                <th>Date</th>
                <th>EmailBox</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
           {renderTableRows()}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default MiniEmailboxData