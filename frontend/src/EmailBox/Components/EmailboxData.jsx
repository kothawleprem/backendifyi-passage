import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineEmail, MdDelete } from "react-icons/md";
import { FcFlashOn } from "react-icons/fc";
import "../Pages/Emailbox/Emailbox.css";

import axios from "axios";

const EmailboxData = () => {
  const { state } = useLocation();
  const projectId = state.projectId;
  console.log("data", projectId);
  const [emails, setEmails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("psg_auth_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get( `http://127.0.0.1:8000/api/emailbox/?project_id=${projectId}`, config)
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        setEmails(data);
      });
  }, []);

  const handleInstantClick = (email) => {
    console.log(email.id)
    navigate("/emailbox/instant/", {
      state:{
        "emailId":email.id,
        "email": email.email_address
      }
    })
  }

   const renderTableRows = () => {
     if (emails !== undefined) {
       return emails.map((email, idx) => {
         return (
           <tr key={email.id}>
             <td>{idx + 1}</td>
             <td>{email.email_address}</td>
             <td>{email.date}</td>
             <td>{email.time}</td>
             <td>{email.total_request}</td>
             <td>
               <Button onClick={() => handleInstantClick(email)}>
                 <FcFlashOn /> Instant Reply
               </Button>
             </td>
             <td>
               <Button href={"mailto: " + email.email_address}>
                 <MdOutlineEmail /> Reply
               </Button>
             </td>
             <td>
               <CopyToClipboard text={email.email_address}>
                 <Button>
                   <FaRegClipboard /> Copy Email
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
      <Table bordereless hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Email Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Request</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
    </>
  );
};

export default EmailboxData;
