import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import AddIcon from "../../../../assests/images/dashborad/plus-circle.svg";
import CrossIcon from "../../../../assests/images/dashborad/cross.svg";
import { useNavigate } from "react-router-dom";
import EditOrganisationTabs from "../../../../components/editOrganisationTabs";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import URLS from "../../../../constants/routesURL";
import { OrganisationService } from "../../../../services/Organisation.service";
import validationSchemaProfessionalDetails from "../../../../validation/professionalDetails";
import { documentObject } from "../../../../constants/common.constants";
import { useFormik } from "formik";
import ButtonWithLoader from "../../../../components/buttonWithLoading";
import { Type } from "../../../../constants/storeAction.constants";
import { ErrorMessage } from "../../../../components/errorMessage";
import Asterisk from "../../../../components/asterisk";
import YearOfExperience from "../../../../components/yearOfExperience";
import DocumentField from "../../../../components/documentField";

function EditOrganisationProfessional() {
  const { state, dispatch } = useContext(Store);
  const { editOrganisationDetails, editOrganisationStep1 } = state;
  const [languages, setLanguages] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newService, setNewService] = useState("");
  const [loadingServiceAdd, setLoadingServiceAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!editOrganisationStep1) {
      navigate(URLS.ORGANISATION.EDIT.PROFILE_DETAIL);
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
  }, [editOrganisationStep1, navigate]);

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
      services_offered: editOrganisationDetails?.services_offered || [],
      languages_spoken: editOrganisationDetails?.languages_spoken || [],
      documents:
        editOrganisationDetails?.document.length > 0
          ? editOrganisationDetails?.document
          : [{ ...documentObject, organization: editOrganisationDetails?.id }],
    },
    validationSchema: validationSchemaProfessionalDetails,
    onSubmit: async (values) => {
      try {
        const { documents, ...rest } = values;
        const { data } = await OrganisationService.updateOrganisationClinic(
          editOrganisationDetails.id,
          {
            ...editOrganisationStep1,
            user_type: "ORGANIZATION",
            ...rest,
          }
        );
        const uploadDocument = {
          documents: documents,
        };
        const { id } = data;
        await OrganisationService.postOrganisationClinicDocument(
          id,
          uploadDocument
        );
        dispatch({ type: Type.REMOVE_EDIT_ORGANISATION_DETAILS });
        navigate(URLS.ORGANISATION.LISTING);
      } catch (err) {
        console.log(err);
      }
    },
  });
  if (!editOrganisationStep1) {
    return null;
  }

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
    const updatedServices = values?.services_offered?.includes(service?.id)
      ? values?.services_offered?.filter((id) => id !== service?.id)
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
    setFieldValue("documents", [
      ...values.documents,
      { ...documentObject, organization: editOrganisationDetails.id },
    ]);
  };

  const removeDocument = async (index) => {
    try {
      if (values.documents[index]?.id) {
        await OrganisationService.deleteOrganisationDocument(
          values.documents[index].id
        );
      }
      const updatedDocuments = values.documents.filter((_, i) => i !== index);
      setFieldValue("documents", updatedDocuments);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = (event, index) => {
    const file = event.target.files[0];
    setFieldValue(`documents[${index}].file`, file);
  };

  if (!editOrganisationStep1) {
    return null;
  }
  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };
  return (
    <div className="Add_Organisation_Professional Patients_section Organization-section AddOrganisationProfile">
      <EditOrganisationTabs />

      <Form onSubmit={handleSubmit} className="Scroll">
        <Row className="AddOrganisationProfile">
          <Col md={12}>
            <h2 className="mt-0">
              Services offered (Select Minimum 1)
              <Asterisk />
            </h2>
            <hr />
          </Col>

          <Col md={12}>
            <Row className="align-items-center">
              {servicesOffered?.map((service, index) => {
                return (
                  <Col md={4} key={service?.id}>
                    <InputGroup className="mb-3 checkbox-group">
                      <InputGroup.Checkbox
                        id={`checkbox-${service?.id}`}
                        checked={values?.services_offered?.includes(
                          service?.id
                        )}
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
                    placeholder="Other Service..."
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
        <DocumentField
          values={values}
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
          removeDocument={removeDocument}
          uploadFile={uploadFile}
        />

        <button className="add_morebtn mt-3" onClick={addDocument}>
          <img src={AddIcon} className="me-2" alt="add" />
          Add More
        </button>
        <Row className="mt-5">
          <Col md={12}>
            <button
              className="cancel-buttongry"
              onClick={() => {
                dispatch({ type: Type.REMOVE_ORGANISATION_STEP_1 });
                navigate(URLS.ORGANISATION.LISTING);
              }}
            >
              Cancel
            </button>
            <ButtonWithLoader
              isSubmitting={isSubmitting}
              label="Update Organization"
              className="blue-button-loader"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditOrganisationProfessional;
