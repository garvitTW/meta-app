import ClinicProfessionalDetailsForm from "../../../../components/clinic/professionalDetailsForm";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
import URLS from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import { OrganisationService } from "../../../../services/Organisation.service";
import { useFormik } from "formik";
import validationSchemaProfessionalDetails from "../../../../validation/professionalDetails";
import { Type } from "../../../../constants/storeAction.constants";
import { documentObject } from "../../../../constants/common.constants";
import { Col, Row } from "react-bootstrap";

function AddDoctorProfessional() {
  const { state, dispatch } = useContext(Store);
  const { addDoctorStep1 } = state;
  const [languages, setLanguages] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newService, setNewService] = useState("");
  const [loadingServiceAdd, setLoadingServiceAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!addDoctorStep1) {
    //   navigate(URLS.ORGANISATION.CREATE.PROFILE_DETAIL);
    // } else {
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
    // }
  }, [addDoctorStep1, navigate]);

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
        // const { results } = await OrganisationService.postOrganisationClinic({
        //   ...addOrganisationStep1,
        //   password: "password@123",
        //   enabled: true,
        //   user_type: "ORGANIZATION",
        //   ...rest,
        // });

        // const { organization_id } = results;
        // const documentsWithOrganisationId = documents.map((document) => {
        //   document.organization = organization_id;
        //   return document;
        // });
        // const uploadDocument = {
        //   documents: documentsWithOrganisationId,
        // };
        // await OrganisationService.postOrganisationClinicDocument(
        //   organization_id,
        //   uploadDocument
        // );
        // dispatch({ type: Type.REMOVE_ORGANISATION_STEP_1 });
        // navigate(URLS.ORGANISATION.LISTING);
        console.log({ ...addDoctorStep1, ...rest });
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

  const uploadFile = (event, index) => {
    const file = event.target.files[0];
    setFieldValue(`documents[${index}].file`, file);
  };

  const addDocument = () => {
    setFieldValue("documents", [...values.documents, { ...documentObject }]);
  };

  const handleCancel = () => {
    dispatch({ type: Type.REMOVE_CLINIC_STEP_1 });
    navigate(URLS.DOCTOR.LISTING);
  };

  const removeDocument = (index) => {
    const updatedDocuments = values.documents.filter((_, i) => i !== index);
    setFieldValue("documents", updatedDocuments);
  };

  // if (!addDoctorStep1) {
  //   return null;
  // }
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
        <div className="AddOrganisationProfile ">
          <h2 className="mt-0">Years of experience</h2>
          <hr />
        </div>
        <Row className="mb-4">
          <Col md={6}>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Years</label>
                  <input
                    name="email"
                    type="text"
                    placeholder="Years"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Months</label>
                  <input
                    name="email"
                    type="text"
                    placeholder="Years"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <ClinicProfessionalDetailsForm
          handleSubmit={handleSubmit}
          servicesOffered={servicesOffered}
          values={values}
          handleServiceOffered={handleServiceOffered}
          errors={errors}
          touched={touched}
          newService={newService}
          setNewService={setNewService}
          loadingServiceAdd={loadingServiceAdd}
          addService={addService}
          languages={languages}
          handleLanguageSelection={handleLanguageSelection}
          removeLanguage={removeLanguage}
          getFieldProps={getFieldProps}
          removeDocument={removeDocument}
          isSubmitting={isSubmitting}
          uploadFile={uploadFile}
          handleCancel={handleCancel}
          addDocument={addDocument}
        />
      </div>
    </>
  );
}
export default AddDoctorProfessional;
