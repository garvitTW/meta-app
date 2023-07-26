import "./style.scss";
import { Row, Col, Dropdown, Table, Form } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import Dropdownarrow from "../../../assests/images/dashborad/dropdown.png";
import PaginationSection from "../../../components/PaginationSection";
function DoctorListing() {
  return (
    <>
      <div className="Patients_section">
        <Row>
          <Col md={4}>
            <h1>Clinics (2040) </h1>
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
          <Col md={2}>
            <button className="btn export-button">Export</button>
          </Col>
          <Row className="mt-4">
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
            <Col md={3} className="status_dropdown">
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
          <Col md={12} className="mt-4">
            <Table responsive striped className="Patients-table" variant="dark">
              <thead>
                <tr>
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
                  <td className="name-text">Dr. Jennifer Simpson</td>
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
                  <td className="name-text">Dr. Jennifer Simpson</td>
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
                  <td className="name-text">Dr. Jennifer Simpson</td>
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
                  <td className="name-text">Dr. Jennifer Simpson</td>
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
                  <td className="name-text">Dr. Jennifer Simpson</td>
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
      </div>
    </>
  );
}

export default DoctorListing;
