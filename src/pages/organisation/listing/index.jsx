import PaginationSection from "../../../components/PaginationSection";
import { Table, InputGroup, Row, Form, Col, Tabs, Tab } from "react-bootstrap";
import Search from "../../../assests/images/dashborad/Search.png";
import AddIcon from "../../../assests/images/dashborad/add.png";
import "./style.scss";
import Pending from "../../organisation/pending";
import Decliend from "../../organisation/declined";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/routesURL";
import { useState } from "react";
import ModalComponent from "../../../components/modal";
import ClinicListing from "../../clinic/listing";
function OrganisationListing() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };
  return (
    <>
      <div className="Patients_section Organization-section">
        <div>
          <div className="d-inline-block">
            <h1>Organization Clinics</h1>
          </div>
          <div className="right-header">
            <div className="position-relative">
              <img className="search-img" src={Search} alt="search" />
              <input
                className=" search-input"
                placeholder="Search by Organisation Name"
              />
            </div>
            <div>
              <button className="btn export-button w-export">Export</button>
            </div>
            <button
              onClick={() => navigate(URL.ORGANISATION.CREATE.PROFILE_DETAIL)}
              className="btn Organization-button"
            >
              <img src={AddIcon} className="pe-2" alt="add" />
              Add Organization
            </button>
          </div>
        </div>

        <Tabs
          defaultActiveKey={URL.ORGANISATION.LISTING}
          id="uncontrolled-tab-example"
          className="organise_tabs w-100"
          onSelect={handleTabChange}
        >
          <Tab
            eventKey={URL.ORGANISATION.LISTING}
            title="Registered (50)"
          ></Tab>
          <Tab eventKey={URL.ORGANISATION.PENDING} title="Pending(20)">
            <Pending />
          </Tab>
          <Tab eventKey={URL.ORGANISATION.DECLINED} title="Declined(45)">
            <Decliend />
          </Tab>
        </Tabs>
        <Row className="table-margin">
          <Col md={12}>
            <Table
              responsive
              className="stripednew table-stripednew Patients-table"
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
                  <td className="name-textunder" onClick={handleShow}>
                    ORG - 1111
                  </td>
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
      </div>
      <ModalComponent setShow={setShow} show={show} className="maxWidth">
        <ClinicListing />
      </ModalComponent>
    </>
  );
}

export default OrganisationListing;
