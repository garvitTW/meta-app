import { Col, Row } from "react-bootstrap";
import Input from "../formGroupInput";

function YearOfExperience({ formikProps }) {
  return (
    <>
      <div className="AddOrganisationProfile ">
        <h2 className="mt-0">Years of experience</h2>
        <hr />
      </div>
      <Row className="mb-4">
        <Col md={6}>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Input
                  name="years"
                  type="text"
                  placeholder="Years"
                  className="form-control"
                  label="Years (optional)"
                  required={false}
                  {...formikProps}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Input
                  name="months"
                  type="text"
                  placeholder="Months"
                  className="form-control"
                  label="Months (optional)"
                  required={false}
                  {...formikProps}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default YearOfExperience;
