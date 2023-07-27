import React, { useState } from "react";
import "./style.scss";
import { Container, Row, Col, Form } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";
import { useFormik } from "formik";
import { validationSchema } from "../../validation/login";
import Input from "../../components/formGroupInput";
import ButtonWithLoader from "../../components/buttonWithLoding";
import { storageService } from "../../services/storage.service";
import { STORAGE_KEYS } from "../../constants/common.constants";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";

function Login() {
  const navigate = useNavigate();

  const details = storageService.getFromLocalStorage(
    STORAGE_KEYS.REMEMBER_ME_DETAILS
  );

  const checkedValue = details ? true : false;
  const [rememberMe, setRememberMe] = useState(checkedValue);

  const initialValues = {
    email: details?.email || "",
    password: details?.password || "",
    check: checkedValue,
  };

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        authService.setRememberMe(rememberMe, values);
        console.log(values);
        setRememberMe(false);
        action.resetForm();
        navigate(URL.VERIFICATION);
      },
    });

  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };

  return (
    <>
      <div>
        <div className="Login_page">
          <Container fluid>
            <Row>
              <Col md={4} className="offset-md-4">
                <div className="text-center">
                  <img src={Logo} alt="Logo" />
                </div>
                <h1>Admin Login</h1>
                <p>Welcome back! Please enter your details.</p>
                <Form onSubmit={handleSubmit}>
                  <Input
                    {...formikProps}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                  />
                  <Input
                    {...formikProps}
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                  />
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      checked={rememberMe}
                      type="checkbox"
                      label="Remember me"
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <ButtonWithLoader
                      isSubmitting={isSubmitting}
                      label="Login"
                    />
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
