import "./style.scss";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import {
  generateClinicProfileDetailsInitialValue,
  profileDetailsHandleChange,
} from "../../../../utils/helperFunction";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import ClinicProfileDetailsForm from "../../../../components/clinic/profileDetailsForm";
import { addClinicTabs } from "../../../../constants/clinic.constants";
import validationSchemaClinicProfileDetails from "../../../../validation/clinicProfileDetails";
import { clinicService } from "../../../../services/clinic.service";

function AddClinicProfile() {
  const { state, dispatch } = useContext(Store);
  const { addClinicStep1 } = state;
  const initialValues =
    generateClinicProfileDetailsInitialValue(addClinicStep1);

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaClinicProfileDetails,
    onSubmit: async (values, action) => {
      try {
        await clinicService.checkClinicMail({
          email: values.email,
        });
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

  const handleCustomChange = (e) => {
    const value = profileDetailsHandleChange(e);
    setFieldValue(e.target.name, value);
  };
  const handleTabChange = (key) => {
    handleSubmit();
  };

  return (
    <div className="Patients_section Organization-section AddOrganisationProfile">
      <TabsWithNavigation
        tabs={addClinicTabs}
        heading="Add Clinic"
        handleTabsChange={handleTabChange}
        errors={errors}
      />
      <ClinicProfileDetailsForm
        handleSubmit={handleSubmit}
        formikProps={formikProps}
        isSubmitting={isSubmitting}
        handleCustomChange={handleCustomChange}
      />
    </div>
  );
}
export default AddClinicProfile;
