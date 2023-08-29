import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
import { Row, Col, Form } from "react-bootstrap";
import URL from "../../../../constants/routesURL";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Input from "../../../../components/formGroupInput";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../../store/Store";
import { Type } from "../../../../constants/storeAction.constants";
import { generateDoctorProfileDetailsInitialValue } from "../../../../utils/helperFunction";
import ButtonWithLoader from "../../../../components/buttonWithLoading";
import validationSchemaDoctorProfileDetails from "../../../../validation/docotrProfileDetail";
import { clinicService } from "../../../../services/clinic.service";
import FormSelectWithChip from "../../../../components/formSelectWithChip";
import { ErrorMessage } from "../../../../components/errorMessage";

function AddDoctorProfile() {
  const navigate = useNavigate();
  const [clinicList, setClinicList] = useState([]);
  const { state, dispatch } = useContext(Store);
  const { addDoctorStep1 } = state;
  const initialValues =
    generateDoctorProfileDetailsInitialValue(addDoctorStep1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await clinicService.getClinicNameId();

        setClinicList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
        // await OrganisationService.checkOrganisationMail({
        //   email: values.email,
        // });
        dispatch({ type: Type.ADD_CLINIC_STEP_1, payload: values });
        navigate(URL.DOCTOR.CREATE.PROFESSIONAL_DETAIL);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleClinicSelection = (event) => {
    const selectedClinicId = Number(event.target.value);
    if (!values.clinics.includes(selectedClinicId) && selectedClinicId) {
      setFieldValue("clinics", [...values.clinics, selectedClinicId]);
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
        <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
        <Row>
          <Col md={8}>
            <Form className="DoctoreDetail">
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      name="name"
                      type="text"
                      placeholder="Doctor Name"
                      className="form-control"
                      label="Doctor Name"
                      {...formikProps}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      label="Doctor Email"
                      {...formikProps}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      name="phone_number"
                      type="text"
                      placeholder="Enter Doctor Phone Number"
                      className="form-control"
                      label="Doctor Phone Number"
                      {...formikProps}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      name="doctor_fax"
                      type="text"
                      placeholder="Enter Doctor Fax (optional)"
                      label="Doctor Fax (optional)"
                      className="form-control"
                      {...formikProps}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <h2>Doctor Address</h2>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      {...formikProps}
                      name="street"
                      type="text"
                      placeholder="Enter Street"
                      label="Street"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      {...formikProps}
                      name="suite_unit"
                      type="text"
                      placeholder="Enter Suite/Unit #"
                      label="Suite/Unit #"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      {...formikProps}
                      name="city"
                      type="text"
                      placeholder="Enter City"
                      label="City"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <Input
                      {...formikProps}
                      name="state"
                      type="text"
                      placeholder="Enter State"
                      label="State"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h2>Select Clinic</h2>
                  <hr />

                  <FormSelectWithChip
                    handleItemSelection={handleClinicSelection}
                    name="Clinics"
                    ItemList={clinicList}
                    idKey="clinic_id"
                    selectedItems={values.clinics}
                    removeItem={removeClinic}
                  />
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    name="clinics"
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md={12}>
                  <ButtonWithLoader label="Next" className="Next_button" />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default AddDoctorProfile;
