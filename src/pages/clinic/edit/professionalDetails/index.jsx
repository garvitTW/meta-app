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
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editClinicTabs } from "../../../../constants/clinic.constants";
import ClinicProfessionalDetailsForm from "../../../../components/clinic/professionalDetailsForm";
import { clinicService } from "../../../../services/clinic.service";

function EditClinicProfessional() {
  const { state, dispatch } = useContext(Store);
  const { editClinicDetails, editClinicStep1 } = state;
  const [languages, setLanguages] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newService, setNewService] = useState("");
  const [loadingServiceAdd, setLoadingServiceAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!editClinicStep1) {
      navigate(URLS.CLINIC.EDIT.PROFILE_DETAIL);
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
  }, [editClinicStep1, navigate]);

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
      services_offered: editClinicDetails?.services_offered || [],
      languages_spoken: editClinicDetails?.languages_spoken || [],
      documents:
        editClinicDetails?.document.length > 0
          ? editClinicDetails?.document
          : [{ ...documentObject, clinic: editClinicDetails?.id }],
    },
    validationSchema: validationSchemaProfessionalDetails,
    onSubmit: async (values) => {
      try {
        const { documents, ...rest } = values;
        await clinicService.updateClinic(editClinicDetails.id, {
          ...editClinicStep1,
          ...rest,
          organization_clinic: editClinicDetails.organization_clinic,
        });

        const uploadDocument = {
          documents: documents,
        };
        await clinicService.postClinicDocument(uploadDocument);
        dispatch({ type: Type.REMOVE_EDIT_CLINIC_DETAILS });
        navigate(URLS.CLINIC.LISTING);
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
      { ...documentObject, clinic: editClinicDetails.id },
    ]);
  };

  const handleCancel = () => {
    dispatch({ type: Type.REMOVE_EDIT_CLINIC_DETAILS });
    navigate(URLS.CLINIC.LISTING);
  };

  const removeDocument = async (index) => {
    try {
      if (values.documents[index]?.id) {
        await clinicService.deleteClinicDocument(values.documents[index].id);
      }
      const updatedDocuments = values.documents.filter((_, i) => i !== index);
      setFieldValue("documents", updatedDocuments);
    } catch (err) {
      console.log(err);
    }
  };

  if (!editClinicStep1) {
    return null;
  }

  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={editClinicTabs} heading="Edit Clinic" />

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
          buttonLabel="Edit Clinic"
        />
      </div>
    </>
  );
}
export default EditClinicProfessional;
