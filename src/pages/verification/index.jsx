import "./style.scss";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";
import { Store } from "../../store/Store";
import { authService, setAuthToken, setUserDetails } from "../../services/auth.service";
function Verification() {
  const navigate = useNavigate();
  const number = [1, 2, 3, 4, 5, 6];
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState("");
  const {state}=useContext(Store);
  const {userInfo}=state

  const otpInputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  useEffect(()=>{
if(!userInfo){
  navigate(URL.LOGIN)
}
  },[navigate,userInfo])

  const handleOtpChange = (index, value) => {
    // Validate that the input contains only a single digit (0-9)
    if (/^\d?$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setError("");

      // Move focus to the next input when a digit is entered
      if (value && index < otpInputRefs.length - 1) {
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine the OTP values into a single string (for validation or API call)
    const otpCode = otpValues.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit verification code.");
    } else {
      setError(""); // Clear the error if OTP is valid

      // Handle form submission or API call here
      console.log("OTP Code:", otpCode);

      // Reset the OTP input fields after submission (optional)
      setOtpValues(["", "", "", "", "", ""]);
      setUserDetails(userInfo);
      setAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
      navigate(URL.DASHBOARD);
    }
  };

  if(!userInfo){
    return null;
  }

  return (
    <>
      <div>
        <div className="Login_page">
          <Container fluid>
            <Row>
              <Col className=" verification_page">
              <div className="form_alignverify">
                <div className="text-center">
                  <img src={Logo} alt="logo" />
                </div>
                <h1>2-Step Verification</h1>
                <p className="text-center">
                  Enter the verification code generated by your authenticator
                  application
                </p>
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex verification_code">
                    {otpValues.map((value, index) => (
                      <div key={number[index]}>
                        <input
                          type="text"
                          value={value}
                          maxLength={1}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          ref={otpInputRefs[index]}
                        />
                      </div>
                    ))}
                  </div>
                  {error && (
                    <div className="text-center text-danger">{error}</div>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Remember this device for 30 days"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Verify
                    </Button>
                  </div>
                </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Verification;
