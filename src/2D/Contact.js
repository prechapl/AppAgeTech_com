import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./contact.css";

class Contact extends Component {
  render() {
    return (
      <Container className="container">
        {/* <Jumbotron> */}
        <div className="col">
          <h4>William Griffin</h4>
          <i>Los Angeles, California</i>
          <br />
          <a href={`mailto: william@appagetech.com`}>william@appagetech.com</a>
          <br />
          <a href={`tel:949-632-3021`}>(949)632-3021 </a>
        </div>
        <Col>
          <h4>Preston Chaplin</h4>

          <i>New York, New York</i>
          <br />

          <a href={`mailto: preston@appagetech.com`}>preston@appagetech.com</a>
          <br />

          <a href={`tel:646-271-3127`}>(646)271-3127 </a>
        </Col>
        {/* </Jumbotron> */}
      </Container>
    );
  }
}

export default Contact;
