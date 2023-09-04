import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { Container, Row, Col, Form } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";
import { useFormik } from "formik";
import { validationSchema } from "../../validation/login";
import Input from "../../components/formGroupInput";
import ButtonWithLoader from "../../components/buttonWithLoading";
import { storageService } from "../../services/storage.service";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";
import { authService } from "../../services/auth.service";
import { Store } from "../../store/Store";
import { Type } from "../../constants/storeAction.constants";
import { roles } from "../../constants/common.constants";
import ModalComponent from "../../components/modal";
import TermsAndConditionCondition from "../../components/t&C";

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const details = storageService.decryptCredentials();
  const token = authService.isAuthenticated();

  useEffect(() => {
    if (token) {
      navigate(URL.DASHBOARD);
    }
  }, [navigate, token]);

  const checkedValue = Boolean(details);
  const [rememberMe, setRememberMe] = useState(checkedValue);

  const initialValues = {
    email: details?.email || "",
    password: details?.password || "",
  };

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        try {
          storageService.encryptCredentials(rememberMe, values);
          const { data } = await authService.login(values);
          data.user_type = data.user_type || roles.admin;
          dispatch({ type: Type.USER_LOGIN, payload: data });
          //handleShow();
          setRememberMe(false);
          action.resetForm();
          navigate(URL.VERIFICATION);
        } catch (err) {
          console.log(err);
        }
      },
    });

  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };
  if (token) {
    return null;
  }
  return (
    <>
      <div>
        <div className="Login_page">
          <Container fluid>
            <Row>
              <Col md={4} className="offset-md-4">
                <div className="form_align">
                  <div className="text-center">
                    <img src={Logo} alt="Logo" />
                  </div>
                  <h1>Admin Login</h1>
                  <p className="text-center">
                    Welcome back! Please enter your details.
                  </p>
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
                    />{" "}
                    <input
                      checked={rememberMe}
                      type="checkbox"
                      className="checkb"
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="remeberme">Remember me</label>
                    <div className="text-center">
                      <ButtonWithLoader
                        className="d-flex justify-content-center align-items-center"
                        variant="primary"
                        isSubmitting={isSubmitting}
                        label="Login"
                      />
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <ModalComponent modelTitle="Terms of Use" setShow={setShow} show={show}>
        <TermsAndConditionCondition
          handleAccept={() => {}}
          handleClose={handleClose}
        />
      </ModalComponent>
    </>
  );
}

export default Login;
