import "./style.scss";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import DeleteIcon from "../../../../assests/images/dashborad/delete.png";
import AddIcon from "../../../../assests/images/dashborad/plus-circle.svg";
import CrossIcon from "../../../../assests/images/dashborad/cross.svg";
import SaveIcon from "../../../../assests/images/dashborad/save.svg";
import UploadIcon from "../../../../assests/images/dashborad/upload.png";
import URLS from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import { OrganisationService } from "../../../../services/Organisation.service";
import AddOrganisationTabs from "../../../../components/addOrganisationTabs";
import { useFormik } from "formik";
import validationSchemaProfessionalDetails from "../../../../validation/professionalDetails";
import { ErrorMessage } from "../../../../components/errorMessage";
import { Type } from "../../../../constants/storeAction.constants";
import ButtonWithLoader from "../../../../components/buttonWithLoading";
import DocumentErrorMessage from "../../../../components/documentErrorMessage";
import { numArray } from "../../../../constants/common.constants";

function AddOrganisationProfessional() {
  const { state, dispatch } = useContext(Store);
  const { addOrganisationStep1 } = state;
  const [languages, setLanguages] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newService, setNewService] = useState("");
  const [loadingServiceAdd, setLoadingServiceAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!addOrganisationStep1) {
      navigate(URLS.ORGANISATION.CREATE.PROFILE_DETAIL);
    } else {
      const fetchData = async () => {
        try {
          const { data } = await OrganisationService.getServicesOffered();
          const fetchedLanguages = await OrganisationService.getLanguages();
          setServicesOffered(data);
          setLanguages(fetchedLanguages);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [addOrganisationStep1, navigate]);

  const getMdValue = (index) => {
    if (index % 3 === 0) {
      return 4;
    } else if (index % 3 === 1) {
      return 3;
    } else {
      return 5;
    }
  };

  const documentObject = {
    document_type: "",
    file: "",
    validity: "",
    issuer_name: "",
    category: "",
    license_number: "",
  };

  const {
    setFieldValue,
    getFieldProps,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      services_offered: [],
      languages_spoken: [],
      documents: [{ ...documentObject }],
    },
    validationSchema: validationSchemaProfessionalDetails,
    onSubmit: async (values) => {
      try {
        const { documents, ...rest } = values;
        const { results } = await OrganisationService.postOrganisationClinic({
          ...addOrganisationStep1,
          password: "password@123",
          enabled: true,
          user_type: "ORGANIZATION",
          ...rest,
        });

        const uploadDocument = {
          documents: documents,
        };
        const { organization_id } = results;
        await OrganisationService.postOrganisationClinicDocument(
          organization_id,
          uploadDocument
        );
        dispatch({ type: Type.REMOVE_ORGANISATION_STEP_1 });
        navigate(URLS.ORGANISATION.LISTING);
        console.log(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const addService = async () => {
    try {
      if (newService) {
        setLoadingServiceAdd(true);
        const data = await OrganisationService.postServicesOffered({
          name: newService,
        });
        setServicesOffered([...servicesOffered, data]);
        setLoadingServiceAdd(false);
        setNewService("");
      }
    } catch (err) {
      setLoadingServiceAdd(false);
      console.log(err);
    }
  };
  const handleServiceOffered = (service) => {
    const updatedServices = values.services_offered.includes(service?.id)
      ? values.services_offered.filter((id) => id !== service?.id)
      : [...values.services_offered, service?.id];
    setFieldValue("services_offered", updatedServices);
  };

  const handleLanguageSelection = (event) => {
    const selectedLanguageId = Number(event.target.value);
    if (
      !values.languages_spoken.includes(selectedLanguageId) &&
      selectedLanguageId
    ) {
      setFieldValue("languages_spoken", [
        ...values.languages_spoken,
        selectedLanguageId,
      ]);
    }
  };

  const removeLanguage = (selectedLanguageId) => {
    const updatedLanguages = values.languages_spoken?.filter(
      (languageId) => languageId !== selectedLanguageId
    );
    setFieldValue("languages_spoken", updatedLanguages);
  };

  const addDocument = () => {
    setFieldValue("documents", [...values.documents, { ...documentObject }]);
  };

  const removeDocument = (index) => {
    const updatedDocuments = values.documents.filter((_, i) => i !== index);
    setFieldValue("documents", updatedDocuments);
  };

  if (!addOrganisationStep1) {
    return null;
  }

  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <AddOrganisationTabs />
        <Form onSubmit={handleSubmit}>
          <Row className="AddOrganisationProfile ">
            <Col md={12}>
              <h2 className="mt-0">Services offered (Select Minimum 1)</h2>
              <hr />
            </Col>

            <Col md={10}>
              <Row>
                {servicesOffered?.map((service, index) => {
                  return (
                    <Col md={getMdValue(index)} key={service?.id}>
                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox
                          id={`checkbox-${service?.id}`}
                          checked={values.services_offered.includes(
                            service?.id
                          )}
                          onChange={() => handleServiceOffered(service)}
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
              <h2 className="mt-0">Languages</h2>
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
              <h2 className="mt-0">Documents</h2>
              <hr />
            </Col>
          </Row>
          {values.documents.map((document, index) => (
            <div className="d-flex Category_div" key={numArray[index]}>
              <div>
                <p>Category</p>
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
              <div>
                <p>Document Type</p>
                <Form.Control
                  {...getFieldProps(`documents[${index}].document_type`)}
                  type="text"
                  placeholder="Clinic License"
                />
                <DocumentErrorMessage
                  touched={touched}
                  errors={errors}
                  index={index}
                  name="document_type"
                />
              </div>
              <div>
                <p>Issuer Name</p>
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
              <div>
                <p>License Number</p>
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
              <div>
                <p>Validity</p>
                <Form.Control
                  {...getFieldProps(`documents[${index}].validity`)}
                  type="date"
                  placeholder="Validity"
                  min={new Date().toISOString().split("T")[0]}
                />
                <DocumentErrorMessage
                  touched={touched}
                  errors={errors}
                  index={index}
                  name="validity"
                />
              </div>
              <div className="d-flex Category_div">
                {values.documents[index].file ? (
                  <a
                    href={URL.createObjectURL(values.documents[index].file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={SaveIcon} alt="View" />
                  </a>
                ) : (
                  <>
                    <input
                      {...getFieldProps(`documents[${index}].file`)}
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept="application/pdf"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setFieldValue(`documents[${index}].file`, file);
                      }}
                    />
                    <label htmlFor="file">
                      <img
                        className="uploadIcon"
                        src={UploadIcon}
                        alt="Upload"
                      />
                    </label>
                    <DocumentErrorMessage
                      touched={touched}
                      errors={errors}
                      index={index}
                      name="file"
                    />
                  </>
                )}

                {values.documents.length > 1 && (
                  <Button onClick={() => removeDocument(index)}>
                    <img src={DeleteIcon} alt="delete" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <button className="add_morebtn" onClick={addDocument}>
            <img src={AddIcon} className="me-2" alt="add" />
            Add More
          </button>
          <Row className="mt-5">
            <Col md={12}>
              <button className="cancel-buttongry">Cancel</button>
              <ButtonWithLoader
                isSubmitting={isSubmitting}
                label="Add Organization"
                className="blue-button-loader"
              />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default AddOrganisationProfessional;
