import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";

function EmailVerificationFailed() {
  const navigate = useNavigate();
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
                <h1>User Already Verified</h1>
                <p className="text-center">
                  Already Verified email Please login again.
                </p>
                <div className="text-center">
                  <Button onClick={() => navigate(URL.LOGIN)}>
                    Go to Login
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default EmailVerificationFailed;
