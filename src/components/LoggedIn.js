import React from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import { Form, Button, Row, Container } from "react-bootstrap";

export function LoggedIn() {

  const logOut = () => {
    if (window.confirm("Are you sure to log out?")) {
      window.localStorage.setItem('logInMode', true);
      window.location.reload();
    }
  }

  return (
    <Container>
      <Row style={{textAlign: "center"}}>
        <h1> You are logged in. </h1>
        <h2> Have a great visit! </h2>
        <Button onClick={logOut}> Log Out </Button>
      </Row>
   </Container>
  );
}
