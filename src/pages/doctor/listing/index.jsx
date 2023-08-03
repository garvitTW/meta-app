import { useState } from "react";
import "./style.scss";
import {
  Row,
  Col,
  Dropdown,
  Table,
  Form,
  Button,
  Modal,
  InputGroup,
} from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import Dropdownarrow from "../../../assests/images/dashborad/dropdown.png";
import PaginationSection from "../../../components/PaginationSection";
function DoctorListing() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="Patients_section">
        <div>
          <div className="d-inline-block">
            <h1>Doctors</h1>
          </div>
          <div className="right-header">
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input className=" search-input" placeholder="Search patients" />
            </div>
            <div>
              <button className="btn export-button w-export">Export</button>
            </div>
          </div>
        </div>

        <Row className="mt-4">
          <Col md={3} className="status_dropdown enable-status">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Status:</span> Enabled
                <img src={Dropdownarrow} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} className="status_dropdown enable-status">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Clinic:</span> All
                <img src={Dropdownarrow} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-4">
            <Table responsive striped className="Patients-table" variant="dark">
              <thead>
                <tr>
                  <th>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </th>
                  <th>Doctor Name</th>
                  <th>Doctor ID</th>
                  <th>Doctor ID</th>
                  <th>Clinic Name</th>
                  <th>Patients</th>
                  <th>Enable/Disable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text" onClick={handleShow}>
                    Dr. Jennifer Simpson
                  </td>
                  <td>xxxxxx</td>
                  <td>loremipsum@mail.com</td>
                  <td className="">NHS Family Clinic</td>
                  <td className="name-text">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=""
                          checked
                        />
                      </Form>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text" onClick={handleShow}>
                    Dr. Jennifer Simpson
                  </td>
                  <td>xxxxxx</td>
                  <td>loremipsum@mail.com</td>
                  <td className="">NHS Family Clinic</td>
                  <td className="name-text">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=""
                          checked
                        />
                      </Form>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text" onClick={handleShow}>
                    Dr. Jennifer Simpson
                  </td>
                  <td>xxxxxx</td>
                  <td>loremipsum@mail.com</td>
                  <td className="">NHS Family Clinic</td>
                  <td className="name-text">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=""
                          checked
                        />
                      </Form>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text" onClick={handleShow}>
                    Dr. Jennifer Simpson
                  </td>
                  <td>xxxxxx</td>
                  <td>loremipsum@mail.com</td>
                  <td className="">NHS Family Clinic</td>
                  <td className="name-text">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=""
                          checked
                        />
                      </Form>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text" onClick={handleShow}>
                    Dr. Jennifer Simpson
                  </td>
                  <td>xxxxxx</td>
                  <td>loremipsum@mail.com</td>
                  <td className="">NHS Family Clinic</td>
                  <td className="name-text">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=""
                          checked
                        />
                      </Form>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <PaginationSection />
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal
              show={show}
              onHide={handleClose}
              className="patientlist_modal Patients_section "
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={3}>
                    <h1>Patients</h1>
                  </Col>
                  <Col md={3} className="status_dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <span>Status:</span> Enabled
                        <img src={Dropdownarrow} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col md={6}>
                    <div className="position-relative">
                      <img className="search-img" src={Search} />
                      <input
                        className="w-100 search-input"
                        placeholder="Search by Clinic Name, Clinic Email"
                      />
                    </div>
                  </Col>
                  <div className="mt-4">
                    <Table
                      responsive
                      striped
                      className="Patients-table"
                      variant="dark"
                    >
                      <thead>
                        <tr>
                          <th className="first-th"> MRN</th>
                          <th className="sec-th">Patient Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>######</td>
                          <td className="name-text">Jennifer</td>
                          <td>
                            <div>
                              <Form>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label=""
                                  checked
                                />
                              </Form>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>######</td>
                          <td className="name-text">Jennifer</td>
                          <td>
                            <div>
                              <Form>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label=""
                                  checked
                                />
                              </Form>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>######</td>
                          <td className="name-text">mehek</td>
                          <td>
                            <div>
                              <Form>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label=""
                                  checked
                                />
                              </Form>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DoctorListing;
