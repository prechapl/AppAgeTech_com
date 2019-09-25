import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Contact extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "green" }}>
        <Row>
          {/* <Row className="align-items-center" style={{ backgroundColor: "red" }}> */}
          <Col lg="6">
            <Row>
              <h4>William Griffin</h4>
            </Row>
            <Row>
              <i>Los Angeles, California</i>
            </Row>
            <Row>
              <a href={`mailto: william@appagetech.com`}>
                william@appagetech.com
              </a>
            </Row>
            <Row>
              <a href={`tel:949-632-3021`}>(949)632-3021 </a>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <h4>Preston Chaplin</h4>
            </Row>
            <Row>
              <i>New York, New York</i>
            </Row>
            <Row>
              <a href={`mailto: preston@appagetech.com`}>
                preston@appagetech.com
              </a>
            </Row>
            <Row>
              <a href={`tel:646-271-3127`}>(646)271-3127 </a>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;
