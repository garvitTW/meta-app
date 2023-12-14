import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import URL from "../../../../constants/routesURL";
import { useContext, useEffect } from "react";
import { Store } from "../../../../store/Store";
import { useFormik } from "formik";
import validationSchemaProfileDetails from "../../../../validation/profileDetails";
import { Type } from "../../../../constants/storeAction.constants";
import Input from "../../../../components/formGroupInput";
import { generateProfileDetailsInitialValue } from "../../../../utils/helperFunction";
import EditOrganisationTabs from "../../../../components/editOrganisationTabs";
function EditOrganisationProfile() {
  const { state, dispatch } = useContext(Store);
  const { editOrganisationDetails, editOrganisationStep1 } = state;
  const initialValues =
    editOrganisationStep1 ||
    generateProfileDetailsInitialValue(editOrganisationDetails);

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaProfileDetails,
    onSubmit: (values, action) => {
      dispatch({ type: Type.ADD_EDIT_ORGANISATION_STEP_1, payload: values });
      navigate(URL.ORGANISATION.EDIT.PROFESSIONAL_DETAIL);
    },
  });
  const navigate = useNavigate();

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
  return (
    <div className="Patients_section Organization-section AddOrganisationProfile">
      <EditOrganisationTabs />
      <Row className="Scroll">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="name"
                  type="text"
                  placeholder="Enter Organization Name"
                  label="Organization Name"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="email"
                  type="email"
                  placeholder="Enter Organization Email"
                  label="Organization Email"
                  readOnly={Boolean(editOrganisationDetails?.id)}
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="phone_number"
                  type="text"
                  placeholder="Enter Organization Phone Number"
                  label="Organization Phone Number"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="organization_fax"
                  type="text"
                  placeholder="Enter Organization Fax (optional)"
                  label="Organization Fax (optional)"
                  required={false}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2>Organization Representative Details</h2>
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="organization_rep_first_name"
                  type="text"
                  placeholder="Enter First Name"
                  label="First Name"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="organization_rep_last_name"
                  type="text"
                  placeholder="Enter Last Name"
                  label="Last Name"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="organization_rep_phone"
                  type="text"
                  placeholder="Enter Organization Representative Phone"
                  label="Organization Representative Phone"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="organization_rep_email"
                  type="text"
                  placeholder="Enter Organization Representative Email"
                  label="Organization Representative Email"
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2>Organization Address</h2>
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="street"
                  type="text"
                  placeholder="Enter Street"
                  label="Street"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="suite_unit"
                  type="text"
                  placeholder="Enter Suite/Unit #"
                  label="Suite/Unit #"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="zip"
                  type="text"
                  placeholder="Enter Zip Code"
                  label="Zip code"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="city"
                  type="text"
                  placeholder="Enter City"
                  label="City"
                />
              </Col>
              <Col md={6}>
                <Input
                  {...formikProps}
                  name="state"
                  type="text"
                  placeholder="Enter State"
                  label="State"
                />
              </Col>
            </Row>
            <Button type="submit" className="Next_button">
              Save and Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default EditOrganisationProfile;
