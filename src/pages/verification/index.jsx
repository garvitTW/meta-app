import "./style.scss";
import { Container, Row, Col, Form } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";
import { Store } from "../../store/Store";
import {
  authService,
  setAuthToken,
  setRememberFor30Days,
  setUserDetails,
} from "../../services/auth.service";
import ButtonWithLoader from "../../components/buttonWithLoading";
import { roles } from "../../constants/common.constants";
import { Type } from "../../constants/storeAction.constants";

function Verification() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const data = sp.get("data") || null;

  const navigate = useNavigate();
  const number = [1, 2, 3, 4, 5, 6];
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const otpInputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (data && !userInfo) {
      try {
        const result = JSON.parse(decodeURIComponent(data));
        result.user_type = result.user_type || roles.admin;
        dispatch({ type: Type.USER_LOGIN, payload: result });
        return;
      } catch (error) {
        // Handle decoding error
        console.error("Error decoding JWT:", error.message);
      }
    }
    if (!userInfo) {
      navigate(URL.LOGIN);
      return;
    }
    if (!userInfo?.verify_email) {
      navigate(URL.EMAIL_VERIFICATION);
    }
  }, [navigate, userInfo, data, dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine the OTP values into a single string (for validation or API call)
    try {
      const otpCode = otpValues.join("");
      if (otpCode.length !== 6) {
        setError("Please enter a 6-digit verification code.");
      } else {
        setError(""); // Clear the error if OTP is valid

        // Handle form submission or API call here
        setLoading(true);
        const { data } = await authService.verifyOtp({
          email: userInfo.email,
          otp: otpCode,
        });

        // Reset the OTP input fields after submission (optional)
        setOtpValues(["", "", "", "", "", ""]);
        setUserDetails(userInfo);
        setAuthToken(data.token.access_token);
        setRememberFor30Days(rememberDevice);
        setLoading(false);
        navigate(URL.DASHBOARD);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleResendOtp = async () => {
    if (seconds === 0) {
      try {
        await authService.resendOtp({ email: userInfo.email });
        setSeconds(120);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!userInfo || !userInfo?.verify_email) {
    return null;
  }

  return (
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
                  Your Account is Protected with Two-Factor Authentication.
                  <br />
                  We have sent you a Code on your registered Email Address.
                  Please enter below.
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

                  <input
                    type="checkbox"
                    className="checkb"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                  />
                  <label className="remeberme">
                    Remember this device for 30 days
                  </label>

                  <div className="text-center">
                    <ButtonWithLoader
                      className="d-flex justify-content-center align-items-center"
                      variant="primary"
                      isSubmitting={loading}
                      label="Verify"
                    />

                    <div className="resendOtp" onClick={handleResendOtp}>
                      {seconds !== 0
                        ? `Resend Code in ${seconds} seconds`
                        : "Resend Code"}
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Verification;
