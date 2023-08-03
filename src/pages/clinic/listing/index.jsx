import "./style.scss";
import { Row, Col, Dropdown, Table, Form, InputGroup } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import Dropdownarrow from "../../../assests/images/dashborad/dropdown.png";
import PaginationSection from "../../../components/PaginationSection";
function ClinicListing() {
  return (
    <>
      <div className="Patients_section">
        <div>
          <div className="d-inline-block">
            <h1>Clinics (2040)</h1>
          </div>
          <div className="right-header">
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input className=" search-input" placeholder=" Search clinics" />
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

          <Col md={3} className="status_dropdown">
            <Dropdown className="Organization_drop">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Organization:</span> All
                <img src={Dropdownarrow} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={12} className="mt-4">
            <Table responsive striped className="Patients-table" variant="dark">
              <thead>
                <tr>
                  <th>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </th>
                  <th>Clinic Name</th>
                  <th> Email Address</th>
                  <th> Organization Clinic</th>
                  <th> Doctors</th>
                  <th> Patients</th>
                  <th> Enable/Disable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    </InputGroup>
                  </td>
                  <td className="name-text">NHS Family Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>Epic</td>
                  <td className="name-textunder">234</td>
                  <td className="name-textunder">234</td>
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
                  <td className="name-text">NHS Family Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>Epic</td>
                  <td className="name-textunder">234</td>
                  <td className="name-textunder">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check type="switch" id="custom-switch" label="" />
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
                  <td className="name-text">NHS Family Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>Epic</td>
                  <td className="name-textunder">234</td>
                  <td className="name-textunder">234</td>
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
                  <td className="name-text">NHS Family Clinic</td>
                  <td>loremipsum@mail.com</td>
                  <td>Epic</td>
                  <td className="name-textunder">234</td>
                  <td className="name-textunder">234</td>
                  <td>
                    <div>
                      <Form>
                        <Form.Check type="switch" id="custom-switch" label="" />
                      </Form>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <PaginationSection />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClinicListing;
