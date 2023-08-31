import { Col, Form, Row } from "react-bootstrap";
import Input from "../../formGroupInput";
import FormSelectWithChip from "../../formSelectWithChip";
import { ErrorMessage } from "../../errorMessage";
import ButtonWithLoader from "../../buttonWithLoading";

function DoctorProfileDetailsForm({
  handleSubmit,
  formikProps,
  isClinic,
  handleClinicSelection,
  clinicList,
  values,
  removeClinic,
  errors,
  touched,
}) {
  return (
    <Row>
      <Col md={8}>
        <Form className="DoctoreDetail" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  name="name"
                  type="text"
                  placeholder="Doctor Name"
                  className="form-control"
                  label="Doctor Name"
                  {...formikProps}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  label="Doctor Email"
                  {...formikProps}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  name="phone_number"
                  type="text"
                  placeholder="Enter Doctor Phone Number"
                  className="form-control"
                  label="Doctor Phone Number"
                  {...formikProps}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  name="doctor_fax"
                  type="text"
                  placeholder="Enter Doctor Fax (optional)"
                  label="Doctor Fax (optional)"
                  className="form-control"
                  {...formikProps}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <h2>Doctor Address</h2>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  {...formikProps}
                  name="street"
                  type="text"
                  placeholder="Enter Street"
                  label="Street"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  {...formikProps}
                  name="suite_unit"
                  type="text"
                  placeholder="Enter Suite/Unit #"
                  label="Suite/Unit #"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  {...formikProps}
                  name="city"
                  type="text"
                  placeholder="Enter City"
                  label="City"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-4">
                <Input
                  {...formikProps}
                  name="state"
                  type="text"
                  placeholder="Enter State"
                  label="State"
                />
              </div>
            </Col>
          </Row>
          {!isClinic && (
            <Row>
              <Col md={12}>
                <h2>Select Clinic</h2>
                <hr />

                <FormSelectWithChip
                  handleItemSelection={handleClinicSelection}
                  name="Clinics"
                  ItemList={clinicList}
                  idKey="clinic_id"
                  selectedItems={values.clinics}
                  removeItem={removeClinic}
                />
                <ErrorMessage
                  errors={errors}
                  touched={touched}
                  name="clinics"
                />
              </Col>
            </Row>
          )}

          <Row className="mt-5">
            <Col md={12}>
              <ButtonWithLoader label="Next" className="Next_button" />
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
export default DoctorProfileDetailsForm;
