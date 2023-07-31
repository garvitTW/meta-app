import "./style.scss";
import { Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import ProfessionalDetails from "../professionalDetails";
import { useNavigate } from "react-router-dom";
import URL from "../../../../constants/routesURL";
function EditOrganisationProfile() {
  const navigate = useNavigate();
  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };
  return (
    <>
      
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <Row>
          <Col>
            <h1>Edit Organization</h1>
          </Col>
          <Col md={12}>
            <Tabs
              defaultActiveKey={URL.ORGANISATION.EDIT.PROFILE_DETAIL}
              id="uncontrolled-tab-example"
              className="organise_tabs"
              onSelect={handleTabChange}
            >
              <Tab eventKey={URL.ORGANISATION.EDIT.PROFILE_DETAIL} title="Profile Details">
               
              </Tab>
              <Tab eventKey={URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL} title="Professional Details">
               
              </Tab>
              <Tab eventKey={URL.ORGANISATION.EDIT.PAYMENT} title="Payment Plan">
 
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <Form.Label htmlFor="">Organisation Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Organisation Name"
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">Organisation Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">
                          Organization Phone Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Clinic Phone Number"
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">
                          Organization Fax (optional)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Clinic Fax (optional)"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <h2>Organization Representative Details</h2>
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter First Name"
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Last Name"
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">
                          Organization Representative Phone
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Phone" />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">
                          Organization Representative Email
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <h2>Organization Address</h2>
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">Street</Form.Label>
                        <Form.Control type="text" placeholder="Enter Street" />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">Suite/Unit #</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Suite/Unit #"
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" />
                      </Col>
                      <Col md={6}>
                        <Form.Label htmlFor="">State</Form.Label>
                        <Form.Control type="text" placeholder="Enter State" />
                      </Col>
                    </Row>
                    <Button className="Next_button">Next</Button>
                  </Col>
                </Row>
      </div>
    </>
  );
}

export default EditOrganisationProfile;
