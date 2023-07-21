import React from "react";
import "./style.scss";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";
function Login() {
  return (
    <>
      <div>
        <div className="Login_page">
          <Container fluid>
            <Row>
              <Col md={4} className="offset-md-4">
                <div className="text-center">
                  <img src={Logo} />
                </div>
                <h1>Admin Login</h1>
                <p>Welcome back! Please enter your details.</p>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Login;
