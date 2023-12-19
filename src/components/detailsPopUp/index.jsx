import Emailimg from "../../assests/images/dashborad/email.svg";
import Phoneimg from "../../assests/images/dashborad/phone.png";
import Faximg from "../../assests/images/dashborad/fax.svg";
import Addressimg from "../../assests/images/dashborad/address.svg";
import Delete from "../../assests/images/dashborad/trash.svg";
import Edit from "../../assests/images/dashborad/pen.svg";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { formatPhoneNumber } from "../../utils/helperFunction";

function DetailsPopUp({ show, handleClose, details, handleEdit, faxKey }) {
  const findNameInitials = (name) => {
    const trimmedName = name?.trim(); // Remove leading and trailing spaces
    const splitName = trimmedName?.split(/\s+/).filter(Boolean); // Remove empty strings

    if (!splitName || splitName.length === 0) {
      return "XX"; // Default for empty or undefined names
    }

    const nameInitials = splitName
      .map((word) => (word.length > 0 ? word[0].toUpperCase() : ""))
      .join("");

    return nameInitials || "XX";
  };
  return (
    <Modal show={show} onHide={handleClose} className="patient-info">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <div className="info_section">
              <div className="info-bg">{findNameInitials(details?.name)}</div>
              <p>{details?.name}</p>
              {faxKey === "patient_fax" && <p>MRN- {details?.mrn}</p>}
            </div>
            <div className="bottom-info">
              <Row>
                <Col md={4}>
                  <img src={Emailimg} alt="email" />
                  Email
                </Col>
                <Col md={8}>
                  <p>{details?.email}</p>
                </Col>
                <Col md={6}>
                  <img src={Phoneimg} alt="phn" />
                  Phone
                </Col>
                <Col md={6}>
                  <p>{formatPhoneNumber(details?.phone_number || "")}</p>
                </Col>
                {faxKey !== "patient_fax" && (
                  <>
                    <Col md={6}>
                      <img src={Faximg} alt="fax" />
                      Fax
                    </Col>
                    <Col md={6}>
                      <p>{details?.[faxKey] || "Null"}</p>
                    </Col>
                  </>
                )}
                <Col md={6}>
                  <img src={Addressimg} alt="address" />
                  Address
                </Col>
                <Col md={6}>
                  <p>
                    {`${details?.suite_unit}, ${details?.street}, ${details?.state}, USA-${details?.zip}`}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="delete-button"
          onClick={handleClose}
        >
          <img src={Delete} alt="delete" />
          delete
        </Button>
        <Button
          variant="primary"
          className="edit-button"
          onClick={() => {
            handleEdit();
            handleClose();
          }}
        >
          <img src={Edit} alt="edit" />
          edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailsPopUp;
