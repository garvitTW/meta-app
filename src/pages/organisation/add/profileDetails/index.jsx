import "./style.scss";
import { Row, Col, Form } from "react-bootstrap";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchemaProfileDetails from "../../../../validation/profileDetails";
import Input from "../../../../components/formGroupInput";
import { useContext } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import AddOrganisationTabs from "../../../../components/addOrganisationTabs";
import { generateProfileDetailsInitialValue } from "../../../../utils/helperFunction";
import ButtonWithLoader from "../../../../components/buttonWithLoading";
import { OrganisationService } from "../../../../services/Organisation.service";
function AddOrganisationProfile() {
  const { state, dispatch } = useContext(Store);
  const { addOrganisationStep1 } = state;
  const initialValues =
    generateProfileDetailsInitialValue(addOrganisationStep1);

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } =
    useFormik({
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

  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <AddOrganisationTabs />
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Input
                    {...formikProps}
                    name="name"
                    type="text"
                    placeholder="Organization Name"
                    label="Organization Name"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    {...formikProps}
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    label="Organization Email"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    {...formikProps}
                    name="phone_number"
                    type="text"
                    placeholder="Enter Clinic Phone Number"
                    label="Organization Phone Number"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    {...formikProps}
                    name="organization_fax"
                    type="text"
                    placeholder="Enter Clinic Fax (optional)"
                    label="Organization Fax (optional)"
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
                    placeholder="Enter Phone"
                    label="Organization Representative Phone"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    {...formikProps}
                    name="organization_rep_email"
                    type="text"
                    placeholder="Enter Email"
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
              <ButtonWithLoader
                isSubmitting={isSubmitting}
                label="Next"
                className="Next_button"
              />
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddOrganisationProfile;
