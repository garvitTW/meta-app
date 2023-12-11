import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import URLS from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import { OrganisationService } from "../../../../services/Organisation.service";
import { useFormik } from "formik";
import { Type } from "../../../../constants/storeAction.constants";
import { documentObject } from "../../../../constants/common.constants";
import ClinicProfessionalDetailsForm from "../../../../components/clinic/professionalDetailsForm";

import { doctorService } from "../../../../services/doctor.service";
import doctorProfessionalValidationSchema from "../../../../validation/doctorProfessionalDetail";

function EditDoctorProfessional() {
  const { state, dispatch } = useContext(Store);
  const { editDoctorDetails, editDoctorStep1 } = state;
  const [languages, setLanguages] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newService, setNewService] = useState("");
  const [loadingServiceAdd, setLoadingServiceAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!editDoctorStep1) {
      navigate(URLS.DOCTOR.EDIT.PROFILE_DETAIL);
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
  }, [editDoctorStep1, navigate]);

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
      years: editDoctorDetails?.years || 0,
      months: editDoctorDetails?.months || 0,
      services_offered: editDoctorDetails?.services_offered || [],
      languages_spoken: editDoctorDetails?.languages_spoken || [],
      documents:
        editDoctorDetails?.document.length > 0
          ? editDoctorDetails?.document
          : [{ ...documentObject, doctor: editDoctorDetails?.id }],
    },
    validationSchema: doctorProfessionalValidationSchema,
    onSubmit: async (values) => {
      try {
        const { documents, ...rest } = values;
        await doctorService.updateDoctor(editDoctorDetails.id, {
          ...editDoctorStep1,
          clinic: editDoctorStep1.clinics[0],
          ...rest,
        });

        const uploadDocument = {
          documents: documents,
        };
        await doctorService.postDoctorDocument(uploadDocument);
        dispatch({ type: Type.REMOVE_EDIT_DOCTOR_DETAILS });
        navigate(URLS.DOCTOR.LISTING);
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
    setFieldValue("documents", [
      ...values.documents,
      { ...documentObject, doctor: editDoctorDetails.id },
    ]);
  };

  const handleCancel = () => {
    dispatch({ type: Type.REMOVE_EDIT_DOCTOR_DETAILS });
    navigate(URLS.DOCTOR.LISTING);
  };

  const removeDocument = async (index) => {
    try {
      if (values.documents[index]?.id) {
        await doctorService.deleteDoctorDocument(values.documents[index].id);
      }
      const updatedDocuments = values.documents.filter((_, i) => i !== index);
      setFieldValue("documents", updatedDocuments);
    } catch (err) {
      console.log(err);
    }
  };

  if (!editDoctorStep1) {
    return null;
  }

  return (
    <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
      <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />

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
        buttonLabel="Update Doctor"
        serviceHeading="Specialization"
      />
    </div>
  );
}
export default EditDoctorProfessional;
