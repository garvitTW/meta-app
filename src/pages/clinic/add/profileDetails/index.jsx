import "./style.scss";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import { generateClinicProfileDetailsInitialValue } from "../../../../utils/helperFunction";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import ClinicProfileDetailsForm from "../../../../components/clinic/profileDetailsForm";
import { addClinicTabs } from "../../../../constants/clinic.constants";
import validationSchemaClinicProfileDetails from "../../../../validation/clinicProfileDetails";

function AddClinicProfile() {
  const { state, dispatch } = useContext(Store);
  const { addClinicStep1 } = state;
  const initialValues =
    generateClinicProfileDetailsInitialValue(addClinicStep1);

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchemaClinicProfileDetails,
      onSubmit: async (values, action) => {
        try {
          // await OrganisationService.checkOrganisationMail({
          //   email: values.email,
          // });
          dispatch({ type: Type.ADD_CLINIC_STEP_1, payload: values });
          navigate(URL.CLINIC.CREATE.PROFESSIONAL_DETAIL);
        } catch (err) {
          console.log(err);
        }
      },
    });

  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <TabsWithNavigation tabs={addClinicTabs} heading="Add Clinic" />
        <ClinicProfileDetailsForm
          handleSubmit={handleSubmit}
          formikProps={formikProps}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
export default AddClinicProfile;
