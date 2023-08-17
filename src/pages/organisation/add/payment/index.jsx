import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import AddOrganisationTabs from "../../../../components/addOrganisationTabs";
function Payment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <AddOrganisationTabs />
        <Row className="payment_page">
          <Col md={12}>
            <p>Current Payment Plan:</p>
            <h3>
              Metadoc Enterprise <span>(Active)</span>
            </h3>
          </Col>
          <Col md={12}>
            <div className="plan_details">
              <h4>Plan Details</h4>
              <ul>
                <li>
                  <span>Unlimited reviews</span>
                </li>
                <li>
                  <span>Ability to request feedback</span>
                </li>
                <li>
                  <span>Anonymous feedback</span>
                </li>
                <li>
                  <span>Unlimited reviews</span>
                </li>
                <li>
                  <span>Ability to request feedback</span>
                </li>
                <li>
                  <span>Anonymous feedback</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Payment;
