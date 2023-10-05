import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { ErrorMessage } from "../../errorMessage";
import DeleteIcon from "../../../assests/images/dashborad/delete.png";
import AddIcon from "../../../assests/images/dashborad/plus-circle.svg";
import CrossIcon from "../../../assests/images/dashborad/cross.svg";
import SaveIcon from "../../../assests/images/dashborad/save.svg";
import UploadIcon from "../../../assests/images/dashborad/upload.png";
import DocumentErrorMessage from "../../documentErrorMessage";
import ButtonWithLoader from "../../buttonWithLoading";
import { numArray } from "../../../constants/common.constants";
import Asterisk from "../../asterisk";

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
  const generateFileUrl = (file) => {
    const type = typeof file;
    return type === "string"
      ? process.env.REACT_APP_API_URL + file
      : URL.createObjectURL(file);
  };
  return (
    <Form onSubmit={handleSubmit}>
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
                  placeholder="Other reason..."
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
        <Col md={12}>
          <h2 className="mt-4">Documents </h2>
          <hr />
        </Col>
      </Row>
      {values.documents.map((document, index) => (
        <div className="d-flex Category_div" key={numArray[index]}>
          <div className="mb-2">
            {index === 0 && (
              <p>
                Category <Asterisk />
              </p>
            )}
            <Form.Select
              className=""
              defaultValue=""
              {...getFieldProps(`documents[${index}].category`)}
            >
              <option disabled value="">
                Select{" "}
              </option>
              <option value="LICENSE">License </option>
              <option value="BUSINESS">Business</option>
              <option value="COMPLIANCE">Compliance</option>
            </Form.Select>
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="category"
            />
          </div>
          <div className="mb-2">
            {index === 0 && (
              <p>
                Document Type <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].document_type`)}
              type="text"
              placeholder="Document Name"
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="document_type"
            />
          </div>
          <div className="mb-2">
            {index === 0 && (
              <p>
                Issuer Name <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].issuer_name`)}
              type="text"
              placeholder="License Issuer"
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="issuer_name"
            />
          </div>
          <div className="mb-2">
            {index === 0 && (
              <p>
                License Number <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].license_number`)}
              type="text"
              placeholder="License Number (#)"
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="license_number"
            />
          </div>
          <div className="mb-2">
            {index === 0 && (
              <p>
                Validity <Asterisk />
              </p>
            )}
            <Form.Control
              {...getFieldProps(`documents[${index}].validity`)}
              type="date"
              placeholder="Validity"
              min={
                !document?.id
                  ? new Date().toISOString().split("T")[0]
                  : undefined
              }
            />
            <DocumentErrorMessage
              touched={touched}
              errors={errors}
              index={index}
              name="validity"
            />
          </div>
          <div className="Category_div">
            {values.documents[index].file ? (
              <>
                <a
                  href={generateFileUrl(values.documents[index].file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={index === 0 ? "fileico" : "fileico2"}
                >
                  <img src={SaveIcon} alt="View" />
                </a>
                {values.documents.length > 1 && (
                  <Button onClick={() => removeDocument(index)}>
                    <img src={DeleteIcon} alt="delete" />
                  </Button>
                )}
              </>
            ) : (
              <>
                <input
                  {...getFieldProps(`documents[${index}].file`)}
                  style={{ display: "none" }}
                  type="file"
                  id={`file-${index}`}
                  accept="application/pdf"
                  onChange={(event) => uploadFile(event, index)}
                />

                <label
                  htmlFor={`file-${index}`}
                  className={index === 0 ? "toppad" : "botmbox"}
                >
                  <img className="uploadIcon" src={UploadIcon} alt="Upload" />
                  {values.documents.length > 1 && (
                    <Button onClick={() => removeDocument(index)}>
                      <img src={DeleteIcon} alt="delete" />
                    </Button>
                  )}
                </label>
                <DocumentErrorMessage
                  touched={touched}
                  errors={errors}
                  index={index}
                  name="file"
                />
              </>
            )}
          </div>
        </div>
      ))}

      <button className="add_morebtn mt-3" onClick={addDocument}>
        <img src={AddIcon} className="me-2" alt="add" />
        Add More
      </button>
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
