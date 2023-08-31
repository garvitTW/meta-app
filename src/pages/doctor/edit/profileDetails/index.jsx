import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import { generateDoctorProfileDetailsInitialValue } from "../../../../utils/helperFunction";
import DoctorProfileDetailsForm from "../../../../components/doctor/profileDetails";
import { roles } from "../../../../constants/common.constants";
import { clinicService } from "../../../../services/clinic.service";
import validationSchemaDoctorProfileDetails from "../../../../validation/doctorProfileDetail";

function EditDoctorProfile() {
  const navigate = useNavigate();
  const [clinicList, setClinicList] = useState([]);
  const { state, dispatch } = useContext(Store);
  const { editDoctorDetails, userInfo } = state;
  const isClinic = userInfo.user_type === roles.clinic;

  const initialValues =
    generateDoctorProfileDetailsInitialValue(editDoctorDetails);

  useEffect(() => {
    if (!editDoctorDetails) {
      navigate(URL.ORGANISATION.LISTING);
    } else {
      const fetchData = async () => {
        try {
          const isOrganisation = userInfo.user_type === roles.organization;
          const { data } = await clinicService.getClinicNameId({
            organization_id: isOrganisation ? userInfo.id : "",
          });

          setClinicList(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [userInfo.id, userInfo.user_type, editDoctorDetails, navigate]);

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isSubmitting,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaDoctorProfileDetails,
    onSubmit: async (values, action) => {
      try {
        console.log("doctor profile details", values);
        // await OrganisationService.checkOrganisationMail({
        //   email: values.email,
        // });
        dispatch({ type: Type.ADD_EDIT_DOCTOR_STEP_1, payload: values });
        navigate(URL.DOCTOR.EDIT.PROFESSIONAL_DETAIL);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleClinicSelection = (event) => {
    if (values.clinics.length === 0) {
      const selectedClinicId = Number(event.target.value);
      if (!values.clinics.includes(selectedClinicId) && selectedClinicId) {
        setFieldValue("clinics", [...values.clinics, selectedClinicId]);
      }
    }
  };

  const removeClinic = (selectedClinicId) => {
    const updatedClinic = values.clinics?.filter(
      (ClinicId) => ClinicId !== selectedClinicId
    );
    setFieldValue("clinics", updatedClinic);
  };

  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />
        <DoctorProfileDetailsForm
          handleSubmit={handleSubmit}
          formikProps={formikProps}
          isClinic={isClinic}
          handleClinicSelection={handleClinicSelection}
          clinicList={clinicList}
          values={values}
          removeClinic={removeClinic}
          errors={errors}
          touched={touched}
        />
      </div>
    </>
  );
}
export default EditDoctorProfile;
