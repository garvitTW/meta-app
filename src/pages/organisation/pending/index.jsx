import "./style.scss";
import { useState } from "react";
import PaginationSection from "../../../components/PaginationSection";
import {
  Table,
  InputGroup,
  Row,
  Form,
  Col,
  Button,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import EditIcon from "../../../assests/images/dashborad/edit.png";
import CheckIcon from "../../../assests/images/dashborad/check.png";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/routesURL";

function OrgnisationPending() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  return (
    <>
      <Row className="table-margin">
        <Col md={12}>
          <Table
            responsive
            striped
            className="Patients-table pending_table"
            variant="dark"
          >
            <thead>
              <tr>
                <th>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </th>
                <th> Organizational Clinic Name</th>
                <th> Email Address</th>
                <th> Status</th>
                <th> Action</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </td>
                <td className="name-text">ORG - 1</td>
                <td>loremipsum@mail.com</td>
                <td>
                  <Button className="pending_button">Pending</Button>
                </td>
                <td>
                  <Button className="Decline_button" onClick={handleShow}>
                    Decline
                  </Button>
                  <Modal
                    className="decline_modal"
                    show={show}
                    onHide={handleClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Reason for declining.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Select Reason</p>
                      <select>
                        <option>Incorrect Details</option>
                        <option value="1">Others</option>
                      </select>
                      <p>Describe the reason</p>
                      <Form.Control
                        as="textarea"
                        placeholder="Details do not match"
                      />
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
                  </Modal>
                  <Button className="Accept_button">
                    <img src={CheckIcon} className="pe-2" />
                    Accept
                  </Button>
                </td>
                <td>
                  <Button
                    className="Edit_button"
                    onClick={() =>
                      navigate(URL.ORGANISATION.EDIT.PROFILE_DETAIL)
                    }
                  >
                    <img src={EditIcon} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </td>
                <td className="name-text">ORG - 1</td>
                <td>loremipsum@mail.com</td>
                <td>
                  <Button className="pending_button">Pending</Button>
                </td>
                <td>
                  <Button className="Decline_button">Decline</Button>
                  <Button className="Accept_button">
                    <img src={CheckIcon} className="pe-2" />
                    Accept
                  </Button>
                </td>
                <td>
                  <Button className="Edit_button">
                    <img src={EditIcon} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </td>
                <td className="name-text">ORG - 1</td>
                <td>loremipsum@mail.com</td>
                <td>
                  <Button className="pending_button">Pending</Button>
                </td>
                <td>
                  <Button className="Decline_button">Decline</Button>
                  <Button className="Accept_button">
                    <img src={CheckIcon} className="pe-2" />
                    Accept
                  </Button>
                </td>
                <td>
                  <Button className="Edit_button">
                    <img src={EditIcon} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </td>
                <td className="name-text">ORG - 1</td>
                <td>loremipsum@mail.com</td>
                <td>
                  <Button className="pending_button">Pending</Button>
                </td>
                <td>
                  <Button className="Decline_button">Decline</Button>
                  <Button className="Accept_button">
                    <img src={CheckIcon} className="pe-2" />
                    Accept
                  </Button>
                </td>
                <td>
                  <Button className="Edit_button">
                    <img src={EditIcon} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </td>
                <td className="name-text">ORG - 1</td>
                <td>loremipsum@mail.com</td>
                <td>
                  <Button className="pending_button">Pending</Button>
                </td>
                <td>
                  <Button className="Decline_button">Decline</Button>
                  <Button className="Accept_button">
                    <img src={CheckIcon} className="pe-2" />
                    Accept
                  </Button>
                </td>
                <td>
                  <Button className="Edit_button">
                    <img src={EditIcon} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                  </InputGroup>
                </td>
                <td className="name-text">ORG - 1</td>
                <td>loremipsum@mail.com</td>
                <td>
                  <Button className="pending_button">Pending</Button>
                </td>
                <td>
                  <Button className="Decline_button">Decline</Button>
                  <Button className="Accept_button">
                    <img src={CheckIcon} className="pe-2" />
                    Accept
                  </Button>
                </td>
                <td>
                  <Button className="Edit_button">
                    <img src={EditIcon} />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={12}>
          <PaginationSection />
        </Col>
      </Row>
    </>
  );
}

export default OrgnisationPending;
