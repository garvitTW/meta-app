import { Button, Col, Modal, Row } from "react-bootstrap";

function TermsAndConditionCondition({ handleClose, handleAccept }) {
  return (
    <>
      <Modal.Body>
        <p>
          General Site Usage Last Revised: December 16, 2013 Welcome to
          www.lorem-ipsum.info. This site is provided as a service to our
          visitors and may be used for informational purposes only. Because the
          Terms and Conditions contain legal obligations, please read them
          carefully. 1. YOUR AGREEMENT By using this Site, you agree to be bound
          by, and to comply with, these Terms and Conditions. If you do not
          agree to these Terms and Conditions, please do not use this site.
          PLEASE NOTE: We reserve the right, at our sole discretion, to change,
          modify or otherwise alter these Terms and Conditions at any time.
          Unless otherwise indicated, amendments will become effective
          immediately. Please review these Terms and Conditions periodically.
          Your continued use of the Site following the posting of changes and/or
          modifications will constitute your acceptance of the revised Terms and
          Conditions and the reasonableness of these standards for notice of
          changes. For your information, this page was last updated as of the
          date at the top of these terms and conditions. 2. PRIVACY Please
          review our Privacy Policy, which also governs your visit to this Site,
          to understand our practices.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Row className="p-0 w-100">
          <Col md={6} className="pe-0">
            <Button
              className="confirm_button"
              variant="primary"
              onClick={handleAccept}
            >
              Agree and Continue
            </Button>
          </Col>
          <Col md={6} className="ps-0">
            <Button
              className="cancel_button"
              variant="secondary"
              onClick={handleClose}
            >
              Disagree
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </>
  );
}
export default TermsAndConditionCondition;
