import { Col, Row, Form } from "react-bootstrap";
import Input from "../../formGroupInput";
import FormSelectWithChip from "../../formSelectWithChip";
import { ErrorMessage } from "../../errorMessage";
import ButtonWithLoader from "../../buttonWithLoading";
import CustomInput from "../../customInput";

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
  mrnNumber = "",
  handleCustomChange,
}) {
  return (
    <>
      <h1>{btnLabel}</h1>
      <Row className="patientDetailScroll">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter First Name"
                  label="First Name"
                  {...formikProps}
                />
              </Col>
              <Col md={6}>
                <Input
                  name="surname"
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
                  readOnly={Boolean(mrnNumber)}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  name="phone_number"
                  type="text"
                  placeholder="Enter Patient Phone Number"
                  label="Patient Phone Number"
                  {...formikProps}
                  handleChange={handleCustomChange}
                />
              </Col>
              {mrnNumber && (
                <Col md={6}>
                  <div className="mb-4">
                    <Form.Group className="mb-4 errorClass">
                      <Form.Label>MRN</Form.Label>
                      <Form.Control value={mrnNumber} readOnly={true} />
                    </Form.Group>
                  </div>
                </Col>
              )}
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
                <ErrorMessage
                  errors={errors}
                  touched={touched}
                  name="doctors"
                />
              </Col>
            </Row>
            <Row
              className="mt-5"
              style={{
                "padding-bottom": "15px",
              }}
            >
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
    </>
  );
}

export default PatientDetailsForm;
