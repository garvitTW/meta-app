import PaginationSection from "../../../components/PaginationSection";
import { Table, InputGroup, Row, Form, Col, Tabs, Tab } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import "./style.scss";
import Pending from "../../organisation/pending";
import Decliend from "../../organisation/declined";
function OrganisationListing() {
  return (
    <>
      <div className="Patients_section Organization-section">
        <Row>
          <Col md={3}>
            <h1>Organization Clinics</h1>
          </Col>
          <Col md={4}>
            <div className="position-relative">
              <img className="search-img" src={Search} />
              <input
                className="w-100 search-input"
                placeholder="Search patients"
              />
            </div>
          </Col>
          <Col md={2}>
            <button className="btn export-button">Export</button>
          </Col>
          <Col md={3}>
            <button className="btn Organization-button">
              <img src={AddIcon} className="pe-2" />
              Add Organization
            </button>
          </Col>
        </Row>
        <Tabs
          defaultActiveKey="Registered"
          id="uncontrolled-tab-example"
          className="organise_tabs"
        >
          <Tab eventKey="Registered" title="Registered (50)">
            <Row className="table-margin">
              <Col md={12}>
                <Table
                  responsive
                  striped
                  className="Patients-table"
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
                      <th> Clinics</th>
                      <th> Doctors</th>
                      <th>Patients</th>
                      <th> Status</th>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
                      <td className="name-textunder">ORG - 1</td>
                      <td>loremipsum@mail.com</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td className="name-text">xx</td>
                      <td>
                        <button className="RegisteredButton">Registered</button>
                      </td>
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
              </Col>
              <Col md={12}>
                <PaginationSection />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="Pending" title="Pending(20)">
            <Pending />
          </Tab>
          <Tab eventKey="Declined" title="Declined(45)">
            <Decliend/>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default OrganisationListing;
