import { Col, Form, Row } from "react-bootstrap";
import Input from "../../formGroupInput";
import ButtonWithLoader from "../../buttonWithLoading";

function ClinicProfileDetailsForm({
  handleSubmit,
  formikProps,
  isSubmitting,
  editClinicDetails = {},
}) {
  return (
    <Row>
      <Col md={8}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Input
                {...formikProps}
                name="name"
                type="text"
                placeholder="Enter Clinic Name"
                label="Clinic Name"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="email"
                type="email"
                placeholder="Enter Email"
                label="Clinic Email"
                readOnly={Boolean(editClinicDetails?.id)}
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="phone_number"
                type="text"
                placeholder="Enter Clinic Phone Number"
                label="Clinic Phone Number"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="clinic_extension"
                type="text"
                placeholder="Eg. 4211"
                label="Extension"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="clinic_fax"
                type="text"
                placeholder="Enter Clinic Fax (optional)"
                label="Clinic Fax (optional)"
                required={false}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Clinic Representative Details</h2>
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="clinic_rep_name"
                type="text"
                placeholder="Enter Name"
                label="Representative Name"
              />
            </Col>

            <Col md={6}>
              <Input
                {...formikProps}
                name="clinic_rep_phone"
                type="text"
                placeholder="Enter Phone"
                label="Representative Phone"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="clinic_rep_email"
                type="text"
                placeholder="Enter Email"
                label="Representative Email"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Clinic Address</h2>
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="street"
                type="text"
                placeholder="Enter Street"
                label="Street"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="suite_unit"
                type="text"
                placeholder="Enter Suite/Unit #"
                label="Suite/Unit #"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="zip"
                type="text"
                placeholder="Enter Zip Code"
                label="Zip code"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="city"
                type="text"
                placeholder="Enter City"
                label="City"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="state"
                type="text"
                placeholder="Enter State"
                label="State"
              />
            </Col>
          </Row>
          <ButtonWithLoader
            isSubmitting={isSubmitting}
            label="Next"
            className="Next_button"
          />
        </Form>
      </Col>
    </Row>
  );
}

export default ClinicProfileDetailsForm;
