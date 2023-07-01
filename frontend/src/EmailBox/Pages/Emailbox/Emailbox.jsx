import React from 'react'
import { useLocation } from 'react-router-dom';
import { Container, Col, Row, Card } from "react-bootstrap"

import withAuth from '../../../utils/withAuth';

import './Emailbox.css'
import UpdateName from '../../Components/UpdateName';
import UpdateAPI from '../../Components/UpdateAPI';
import EmailboxData from '../../Components/EmailboxData';

import NavBar from '../../../Components/NavBar/NavBar';

const Emailbox = () => {
  const { state } = useLocation()
  console.log(state)
  return (
    <>
      <NavBar />
      <Container>
        <div className="emailboxDiv">
          <Card className="manageCard">
            <Card.Title className="cardTitle"> Manage Emailbox</Card.Title>
            <Card.Body>
              <Card.Text className="cardText">
                <Row>
                  <Col xl={4} lg={4} md={12} sm={12}>
                    <UpdateName />
                  </Col>
                  <Col>
                    <UpdateAPI />
                  </Col>
                </Row>
                <br />
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="emailboxDiv">
          <Card className="manageCard">
            <Card.Title className="cardTitle">EmailBox Data</Card.Title>
            <Card.Body>
              <EmailboxData />
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default withAuth(Emailbox)