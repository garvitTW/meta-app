import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";

function AddOrganisationTabs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleTabChange = (eventKey) => {
    navigate(eventKey);
  };
  return (
    <Row>
      <Col>
        <h1>Add Organisation Clinics</h1>
      </Col>
      <Col md={12}>
        <Tabs
          defaultActiveKey={pathname}
          id="uncontrolled-tab-example"
          className="organise_tabs"
          onSelect={handleTabChange}
        >
          <Tab
            eventKey={URL.ORGANISATION.CREATE.PROFILE_DETAIL}
            title="Profile Details"
          ></Tab>
          <Tab
            eventKey={URL.ORGANISATION.CREATE.PROFESSIONAL_DETAIL}
            title="Professional Details"
          ></Tab>
          <Tab
            eventKey={URL.ORGANISATION.CREATE.PAYMENT}
            title="Payment Plan"
          ></Tab>
        </Tabs>
      </Col>
    </Row>
  );
}

export default AddOrganisationTabs;
