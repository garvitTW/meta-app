import { Button, Col, Form, Modal, Row } from "react-bootstrap";

function DeclineReasonForm({ handleClose }) {
  return (
    <>
      <Modal.Body>
        <p>Select Reason</p>
        <select>
          <option>Incorrect Details</option>
          <option value="1">Others</option>
        </select>
        <p>Describe the reason</p>
        <Form.Control as="textarea" placeholder="Details do not match" />
      </Modal.Body>
      <Modal.Footer>
        <Row className="p-0 w-100">
          <Col md={6} className="ps-0">
            <Button
              className="cancel_button"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Col>

          <Col md={6} className="pe-0">
            <Button
              className="confirm_button"
              variant="primary"
              onClick={handleClose}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </>
  );
}
export default DeclineReasonForm;
