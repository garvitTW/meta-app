import { Col, Row, Form } from "react-bootstrap";
import Input from "../../formGroupInput";
import FormSelectWithChip from "../../formSelectWithChip";
import { ErrorMessage } from "../../errorMessage";
import ButtonWithLoader from "../../buttonWithLoading";

function PatientDetailsForm({
  handleSubmit,
  formikProps,
  handleDoctorSelection,
  doctorList,
  values,
  removeDoctor,
  errors,
  touched,
  handleCancel,
  isSubmitting,
  btnLabel,
}) {
  return (
    <Row>
      <Col md={8}>
        <Form onSubmit={handleSubmit}>
          <h1>Add Patient</h1>
          <Row>
            <Col md={6}>
              <Input
                name="first_name"
                type="text"
                placeholder="Enter First Name"
                label="First Name"
                {...formikProps}
              />
            </Col>
            <Col md={6}>
              <Input
                name="last_name"
                type="text"
                placeholder="Enter Last Name"
                label="Last Name"
                {...formikProps}
              />
            </Col>
            <Col md={6}>
              <Input
                name="email"
                type="text"
                placeholder="Enter Email"
                label="Email"
                {...formikProps}
              />
            </Col>
            <Col md={6}>
              <Input
                name="phone_number"
                type="text"
                placeholder="Enter Phone Number"
                label="Patient Phone Number"
                {...formikProps}
              />
            </Col>
          </Row>

          <div className="PatientAddress">
            <h2>Patient Address</h2>
            <Row>
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
          </div>
          <Row>
            <Col md={12}>
              <h2>Select Doctors</h2>
              <hr />

              <FormSelectWithChip
                handleItemSelection={handleDoctorSelection}
                name="Doctors"
                ItemList={doctorList}
                idKey="doctor_id"
                selectedItems={values.doctors}
                removeItem={removeDoctor}
              />
              <ErrorMessage errors={errors} touched={touched} name="doctors" />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12}>
              <button className="btn me-2 cancelBtn" onClick={handleCancel}>
                Cancel
              </button>
              <ButtonWithLoader
                isSubmitting={isSubmitting}
                label={btnLabel}
                className="btn addBtn"
              />
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default PatientDetailsForm;
