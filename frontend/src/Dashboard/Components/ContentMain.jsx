import React from 'react'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import "./Content.css";

import HeroSection from './Sub-Components/HeroSection';
import ManageSection from './Sub-Components/ManageSection';
import MiniEmailboxData from './Sub-Components/MiniEmailboxData';

const ContentMain = () => {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Row>
          <Col>
            <HeroSection />
          </Col>
        </Row>
        <div className="bottomSection">
          <Row>
            <Col xl={4} lg={4} md={12} sm={12}>
              <ManageSection />
              <br />
              <Card className="manageCard">
                <Card.Body>
                  Checkout the documentation: &nbsp; &nbsp;&nbsp;&nbsp;
                  <Button
                    className="visitButton"
                    type="button"
                    // onClick={() => navigate("/emailbox/documentation")}
                    href="/emailbox/documentation"
                    target='_blank'
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12}>
              <MiniEmailboxData />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default ContentMain