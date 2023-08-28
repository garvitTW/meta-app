import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
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

function AddDoctorProfile() {
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
               <label>Doctor Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Organization Name"
                  className="form-control"
                />
               </div>
             
              </Col>
              <Col md={6}>
              <div className="mb-4">
              <label>Doctor Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>
              
              </Col>
              <Col md={6}>
              <div className="mb-4">
              <label>Doctor Phone Number</label>
                <input
                  name="phone_number"
                  type="text"
                  placeholder="Enter Clinic Phone Number"
                  className="form-control"
                  />
                  </div>
              </Col>
              <Col md={6}>
              <div className="mb-4">
                <label>Unique ID</label>
                <input
                  name="organization_fax"
                  type="text"
                  placeholder="Enter Clinic Fax (optional)"
                  label="Organization Fax (optional)"
                  className="form-control"
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
              <label>Street</label>
                <input
                  className="form-control"
                  name="street"
                  type="text"
                  placeholder="Enter Street"
                  label="Street"
                />
                </div>
              </Col>
              <Col md={6}>
              <div className="mb-4">
              <label>Suite/Unit #</label>
                <input
                  className="form-control"
                  name="suite_unit"
                  type="text"
                  placeholder="Enter Suite/Unit #"
                  label="Suite/Unit #"
                />
                </div>
              </Col>
              <Col md={6}>
              <div className="mb-4">
              <label>City</label>
                <input
                  className="form-control"
                  name="city"
                  type="text"
                  placeholder="Enter City"
                  label="City"
                />
                </div>
              </Col>
              <Col md={6}>
              <div className="mb-4">
              <label>State</label>
                <input
                 className="form-control"
                  name="state"
                  type="text"
                  placeholder="Enter State"
                  label="State"
                />
                </div>
              </Col>
            </Row>
            <ButtonWithLoader
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
export default AddDoctorProfile;
