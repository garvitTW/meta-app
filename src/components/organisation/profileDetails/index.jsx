import { Col, Form, Row } from "react-bootstrap";
import Input from "../../formGroupInput";
import CustomInput from "../../customInput";
import ButtonWithLoader from "../../buttonWithLoading";

function OrganisationProfileDetails({
  handleSubmit,
  formikProps,
  editOrganisationDetails = {},
  handleCustomChange,
  isSubmitting,
}) {
  return (
    <Row className="Scroll">
      <Col md={8}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Input
                {...formikProps}
                name="name"
                type="text"
                placeholder="Enter Organization Name"
                label="Organization Name"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="email"
                type="email"
                placeholder="Enter Organization Email"
                label="Organization Email"
                readOnly={Boolean(editOrganisationDetails?.id)}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                {...formikProps}
                handleChange={handleCustomChange}
                name="phone_number"
                type="text"
                placeholder="(000)000-0000"
                label="Organization Phone Number"
              />
            </Col>
            <Col md={6}>
              <CustomInput
                {...formikProps}
                handleChange={handleCustomChange}
                name="organization_fax"
                type="text"
                placeholder="Enter Organization Fax (optional)"
                label="Organization Fax (optional)"
                required={false}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Organization Representative Details</h2>
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="organization_rep_first_name"
                type="text"
                placeholder="Enter First Name"
                label="First Name"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="organization_rep_last_name"
                type="text"
                placeholder="Enter Last Name"
                label="Last Name"
              />
            </Col>
            <Col md={6}>
              <CustomInput
                {...formikProps}
                handleChange={handleCustomChange}
                name="organization_rep_phone"
                type="text"
                placeholder="(000)000-0000"
                label="Representative Phone"
              />
            </Col>
            <Col md={6}>
              <Input
                {...formikProps}
                name="organization_rep_email"
                type="text"
                placeholder="Enter Representative Email"
                label="Representative Email"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Organization Address</h2>
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
              <CustomInput
                {...formikProps}
                handleChange={handleCustomChange}
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
            label="Save and Continue"
            className="Next_button"
          />
        </Form>
      </Col>
    </Row>
  );
}

export default OrganisationProfileDetails;
