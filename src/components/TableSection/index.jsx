import { useState } from "react";
import { v4 as uuid } from "uuid";
import Emailimg from "../../assests/images/dashborad/email.svg";
import Phoneimg from "../../assests/images/dashborad/phone.png";
import Faximg from "../../assests/images/dashborad/fax.svg";
import Addressimg from "../../assests/images/dashborad/address.svg";
import Delete from "../../assests/images/dashborad/trash.svg";
import Edit from "../../assests/images/dashborad/pen.svg";
import {
  Table,
  InputGroup,
  Form,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import "./style.scss";
function Tablemy({
  data,
  patientToExport,
  handleSwitchToggle,
  handleEditPatient,
  handleCheckboxChange,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <div>
      <Table
        responsive
        className="table-stripednew Patients-table"
        variant="dark"
      >
        <thead>
          <tr>
            <th>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Checkbox for following text input"
                  checked={
                    patientToExport.length === data.length && data.length > 0
                  }
                  onChange={() => handleCheckboxChange("All", null)}
                />
              </InputGroup>
            </th>
            <th> MRN</th>
            <th> Patient Name</th>
            <th> Posture Score</th>
            <th> Last Doctor’s Appointment</th>
            <th> Last Self Scan</th>
            <th> Next Scan</th>
            <th> Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((patient) => (
            <tr key={uuid()}>
              <td>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    checked={patientToExport.includes(patient?.id)}
                    onChange={() => handleCheckboxChange("", patient?.id)}
                  />
                </InputGroup>
              </td>
              <td>{patient?.mrn}</td>
              <td
                className="name-text"
                onClick={() => handleEditPatient(patient?.id)}
              >
                {patient?.patient_name}
              </td>
              <td>
                {patient?.posture_score !== ""
                  ? `${patient?.posture_score}%`
                  : "No Data"}
              </td>
              <td>{patient?.last_doctors_appointment || "No Data"}</td>
              <td>{patient?.last_self_scan || "No Data"}</td>
              <td>{patient?.next_scan || "No Data"}</td>
              <td>
                <div>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label=""
                      checked={patient?.is_enabled}
                      onChange={() => handleSwitchToggle(patient)}
                    />
                  </Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Modal show={show} onHide={handleClose} className="patient-info">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <div className="info_section">
                  <div className="info-bg">JG</div>
                  <p>Jennifer Graham</p>
                  <p>MRN- 123456</p>
                </div>
                <div className="bottom-info">
                  <Row>
                    <Col md={6}>
                      <img src={Emailimg} alt="email" />
                      Email
                    </Col>
                    <Col md={6}>
                      <p>Jennifer Graham@mail.com</p>
                    </Col>
                    <Col md={6}>
                      <img src={Phoneimg} alt="phn" />
                      Phone
                    </Col>
                    <Col md={6}>
                      <p>050 414 8778</p>
                    </Col>
                    <Col md={6}>
                      <img src={Faximg} alt="fax" />
                      Fax
                    </Col>
                    <Col md={6}>
                      <p>050 414 8778</p>
                    </Col>
                    <Col md={6}>
                      <img src={Addressimg} alt="address" />
                      Address
                    </Col>
                    <Col md={6}>
                      <p>1234, Main Street, New York, USA- 10001</p>
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
              onClick={handleClose}
            >
              <img src={Edit} alt="edit" />
              edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Tablemy;
