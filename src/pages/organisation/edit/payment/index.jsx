import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import URL from "../../../../constants/routesURL";

function Payment() {
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
              defaultActiveKey={URL.ORGANISATION.EDIT.PAYMENT}
              id="uncontrolled-tab-example"
              className="organise_tabs"
              onSelect={handleTabChange}
            >
              <Tab
                eventKey={URL.ORGANISATION.EDIT.PROFILE_DETAIL}
                title="Profile Details"
              ></Tab>
              <Tab
                eventKey={URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL}
                title="Professional Details"
              ></Tab>
              <Tab
                eventKey={URL.ORGANISATION.EDIT.PAYMENT}
                title="Payment Plan"
              ></Tab>
            </Tabs>
          </Col>
        </Row>
        <Row className="payment_page">
          <Col md={12}>
            <p>Current Payment Plan:</p>
            <h3>Metadoc Enterprise <span>(Active)</span></h3>
          </Col>
          <Col  md={12}>
          <div className="plan_details">
            <h4>Plan Details</h4>
            <ul>
              <li><span>Unlimited reviews</span></li>
              <li><span>Ability to request feedback</span></li>
              <li><span>Anonymous feedback</span></li>
              <li><span>Unlimited reviews</span></li>
              <li><span>Ability to request feedback</span></li>
              <li><span>Anonymous feedback</span></li>
            </ul>
          </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Payment;
