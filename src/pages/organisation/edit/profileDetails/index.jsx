import { useNavigate } from "react-router-dom";
import URL from "../../../../constants/routesURL";
import { useContext, useEffect } from "react";
import { Store } from "../../../../store/Store";
import { useFormik } from "formik";
import validationSchemaProfileDetails from "../../../../validation/profileDetails";
import { Type } from "../../../../constants/storeAction.constants";

import {
  generateProfileDetailsInitialValue,
  profileDetailsHandleChange,
} from "../../../../utils/helperFunction";
import EditOrganisationTabs from "../../../../components/editOrganisationTabs";
import OrganisationProfileDetails from "../../../../components/organisation/profileDetails";
function EditOrganisationProfile() {
  const { state, dispatch } = useContext(Store);
  const { editOrganisationDetails, editOrganisationStep1 } = state;
  const initialValues =
    editOrganisationStep1 ||
    generateProfileDetailsInitialValue(editOrganisationDetails);

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaProfileDetails,
    onSubmit: (values, action) => {
      dispatch({ type: Type.ADD_EDIT_ORGANISATION_STEP_1, payload: values });
      navigate(URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL);
    },
  });
  const navigate = useNavigate();

  const handleTabChange = (key) => {
    handleSubmit();
  };

  useEffect(() => {
    if (!editOrganisationDetails) {
      navigate(URL.ORGANISATION.LISTING);
    }
  }, [editOrganisationDetails, navigate]);
  if (!editOrganisationDetails) {
    return null;
  }
  const formikProps = {
    touched: touched,
    errors: errors,
    getFieldProps: getFieldProps,
  };

  const handleCustomChange = (e) => {
    const value = profileDetailsHandleChange(e);
    setFieldValue(e.target.name, value);
  };

  return (
    <div className="Patients_section Organization-section AddOrganisationProfile">
      <EditOrganisationTabs
        handleTabChanges={handleTabChange}
        errors={errors}
      />
      <OrganisationProfileDetails
        handleSubmit={handleSubmit}
        formikProps={formikProps}
        editOrganisationDetails={editOrganisationDetails}
        handleCustomChange={handleCustomChange}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default EditOrganisationProfile;
