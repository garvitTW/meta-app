import "./style.scss";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import { generateClinicProfileDetailsInitialValue } from "../../../../utils/helperFunction";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import ClinicProfileDetailsForm from "../../../../components/clinic/profileDetailsForm";
import { editClinicTabs } from "../../../../constants/clinic.constants";
import validationSchemaClinicProfileDetails from "../../../../validation/clinicProfileDetails";

function EditClinicProfile() {
  const { state, dispatch } = useContext(Store);
  const { editClinicDetails } = state;
  const navigate = useNavigate();
  const initialValues =
    generateClinicProfileDetailsInitialValue(editClinicDetails);

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchemaClinicProfileDetails,
      onSubmit: async (values, action) => {
        try {
          // await OrganisationService.checkOrganisationMail({
          //   email: values.email,
          // });
          dispatch({ type: Type.ADD_EDIT_CLINIC_STEP_1, payload: values });
          navigate(URL.CLINIC.EDIT.PROFESSIONAL_DETAIL);
        } catch (err) {
          console.log(err);
        }
      },
    });
  useEffect(() => {
    if (!editClinicDetails) {
      navigate(URL.ORGANISATION.LISTING);
    }
  }, [editClinicDetails, navigate]);
  if (!editClinicDetails) {
    return null;
  }
  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };

  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <TabsWithNavigation tabs={editClinicTabs} heading="Edit Clinic" />
        <ClinicProfileDetailsForm
          handleSubmit={handleSubmit}
          formikProps={formikProps}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
export default EditClinicProfile;
