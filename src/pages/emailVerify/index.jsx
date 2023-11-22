import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../assests/images/login/logo.png";

function EmailVerification() {
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
                <h1>Verify Your Email</h1>
                <p className="text-center">
                  Verification Link is send to your email
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default EmailVerification;
