import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { ErrorMessage } from "../../errorMessage";
import AddIcon from "../../../assests/images/dashborad/plus-circle.svg";
import CrossIcon from "../../../assests/images/dashborad/cross.svg";
import ButtonWithLoader from "../../buttonWithLoading";
import Asterisk from "../../asterisk";
import DocumentField from "../../documentField";
import YearOfExperience from "../../yearOfExperience";

function ClinicProfessionalDetailsForm({
  handleSubmit,
  servicesOffered,
  values,
  handleServiceOffered,
  errors,
  touched,
  newService,
  setNewService,
  loadingServiceAdd,
  addService,
  languages,
  handleLanguageSelection,
  removeLanguage,
  getFieldProps,
  removeDocument,
  isSubmitting,
  uploadFile,
  handleCancel,
  addDocument,
  buttonLabel = "Add Clinic",
  serviceHeading = "Services offered (Select Minimum 1)",
}) {
  const otherSpecialization = "Other Specialization...";
  const otherServicePlaceHolder =
    serviceHeading === "Services offered (Select Minimum 1)"
      ? "Other Service..."
      : otherSpecialization;

  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };
  return (
    <Form onSubmit={handleSubmit} className="Scroll">
      {otherServicePlaceHolder === otherSpecialization && (
        <YearOfExperience formikProps={formikProps} />
      )}
      <div>
        <h2 className="mt-0">
          {serviceHeading}
          <Asterisk />
        </h2>
        <hr />
      </div>
      <Row>
        <Col md={12}>
          <Row className="align-items-center">
            {servicesOffered?.map((service, index) => {
              return (
                <Col md={4} key={service?.id}>
                  <InputGroup className="mb-3 checkbox-group">
                    <InputGroup.Checkbox
                      id={`checkbox-${service?.id}`}
                      checked={values.services_offered.includes(service?.id)}
                      onChange={() => handleServiceOffered(service)}
                      className="checkbox-item"
                    />
                    <span className="checkbox-label">{service?.name}</span>
                  </InputGroup>
                </Col>
              );
            })}
            <ErrorMessage
              errors={errors}
              touched={touched}
              name="services_offered"
            />

            <Col md={12}>
              <Form.Label htmlFor="" className="mt-3">
                Others
              </Form.Label>
              <div className="others_section">
                <Form.Control
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  type="text"
                  placeholder={otherServicePlaceHolder}
                />
                <Button disabled={loadingServiceAdd} onClick={addService}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <h2 className="mt-5">Languages</h2>
          <hr />
          <Form.Label htmlFor="" className="mt-3">
            Languages<span className="mendatory-feild">*</span>
          </Form.Label>
          <Form.Select
            value=""
            className="Languages_select"
            onChange={(event) => handleLanguageSelection(event)}
          >
            <option value="">Select Languages</option>
            {languages?.map((language) => (
              <option key={language?.id} value={language?.id}>
                {language?.name}
              </option>
            ))}
          </Form.Select>
          <ErrorMessage
            errors={errors}
            touched={touched}
            name="languages_spoken"
          />

          <div className="select_tags">
            <ul>
              {values.languages_spoken?.map((selectedLanguageId) => (
                <li key={selectedLanguageId}>
                  {
                    languages.find(
                      (language) => language.id === selectedLanguageId
                    )?.name
                  }
                  <img
                    className="ms-1"
                    src={CrossIcon}
                    alt="Remove"
                    onClick={() => removeLanguage(selectedLanguageId)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Col>
        {/* <Col md={12}>
          <h2 className="mt-4">Documents </h2>
          <hr />
        </Col> */}
      </Row>
      {/* <DocumentField
        values={values}
        getFieldProps={getFieldProps}
        touched={touched}
        errors={errors}
        removeDocument={removeDocument}
        uploadFile={uploadFile}
      /> */}

      {/* <button className="add_morebtn mt-3" onClick={addDocument}>
        <img src={AddIcon} className="me-2" alt="add" />
        Add More
      </button> */}
      <Row className="mt-5">
        <Col md={12}>
          <button className="cancel-buttongry" onClick={handleCancel}>
            Cancel
          </button>
          <ButtonWithLoader
            isSubmitting={isSubmitting}
            label={buttonLabel}
            className="blue-button-loader"
          />
        </Col>
      </Row>
    </Form>
  );
}

export default ClinicProfessionalDetailsForm;
