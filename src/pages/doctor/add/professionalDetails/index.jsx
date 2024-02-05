import ClinicProfessionalDetailsForm from "../../../../components/clinic/professionalDetailsForm";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import URLS from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import { OrganisationService } from "../../../../services/Organisation.service";
import { useFormik } from "formik";
import { Type } from "../../../../constants/storeAction.constants";
import { documentObject } from "../../../../constants/common.constants";
import doctorProfessionalValidationSchema from "../../../../validation/doctorProfessionalDetail";
import { doctorService } from "../../../../services/doctor.service";

function AddDoctorProfessional() {
  const { state, dispatch } = useContext(Store);
  const { addDoctorStep1 } = state;
  const [languages, setLanguages] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newService, setNewService] = useState("");
  const [loadingServiceAdd, setLoadingServiceAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!addDoctorStep1?.name) {
      navigate(URLS.DOCTOR.CREATE.PROFILE_DETAIL);
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
      years: 0,
      months: 0,
      services_offered: [],
      languages_spoken: [],
      // documents: [{ ...documentObject }],
    },
    validationSchema: doctorProfessionalValidationSchema,
    onSubmit: async (values) => {
      try {
        const { documents, ...rest } = values;
        const { results } = await doctorService.createDoctor({
          ...addDoctorStep1,
          clinic: addDoctorStep1.clinics,
          user_type: "DOCTOR",
          ...rest,
        });

        // const { doctor_id } = results;
        // const documentsWithDoctorId = documents.map((document) => {
        //   document.doctor = doctor_id;
        //   return document;
        // });
        // const uploadDocument = {
        //   documents: documentsWithDoctorId,
        // };
        // await doctorService.postDoctorDocument(uploadDocument);
        dispatch({ type: Type.REMOVE_DOCTOR_STEP_1 });
        navigate(URLS.DOCTOR.LISTING);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const addService = () => {
    // try {
    if (newService) {
      // setLoadingServiceAdd(true);
      // const data = await OrganisationService.postServicesOffered({
      //   name: newService,
      // });
      const newServiceTOAdd = { id: newService, name: newService };
      setServicesOffered([...servicesOffered, newServiceTOAdd]);
      //setLoadingServiceAdd(false);
      setNewService("");
      // }
      // } catch (err) {
      //   setLoadingServiceAdd(false);
      //   console.log(err);
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
    dispatch({ type: Type.REMOVE_DOCTOR_STEP_1 });
    navigate(URLS.DOCTOR.LISTING);
  };

  const removeDocument = (index) => {
    const updatedDocuments = values.documents.filter((_, i) => i !== index);
    setFieldValue("documents", updatedDocuments);
  };

  if (!addDoctorStep1?.name) {
    return null;
  }

  return (
    <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
      <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />

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
        buttonLabel="Add Doctor"
        serviceHeading="Specialization"
      />
    </div>
  );
}
export default AddDoctorProfessional;
