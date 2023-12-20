import "./style.scss";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchemaProfileDetails from "../../../../validation/profileDetails";
import { useContext } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import AddOrganisationTabs from "../../../../components/addOrganisationTabs";
import {
  formatPhoneNumber,
  generateProfileDetailsInitialValue,
  profileDetailsHandleChange,
} from "../../../../utils/helperFunction";
import { OrganisationService } from "../../../../services/Organisation.service";
import OrganisationProfileDetails from "../../../../components/organisation/profileDetails";
function AddOrganisationProfile() {
  const { state, dispatch } = useContext(Store);
  const { addOrganisationStep1 } = state;
  const initialValues =
    generateProfileDetailsInitialValue(addOrganisationStep1);

  const {
    setFieldValue,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaProfileDetails,
    onSubmit: async (values, action) => {
      try {
        await OrganisationService.checkOrganisationMail({
          email: values.email,
        });
        dispatch({ type: Type.ADD_ORGANISATION_STEP_1, payload: values });
        navigate(URL.ORGANISATION.CREATE.PROFESSIONAL_DETAIL);
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

  return (
    <div className="Patients_section Organization-section AddOrganisationProfile">
      <AddOrganisationTabs />
      <OrganisationProfileDetails
        handleSubmit={handleSubmit}
        formikProps={formikProps}
        handleCustomChange={handleCustomChange}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default AddOrganisationProfile;
