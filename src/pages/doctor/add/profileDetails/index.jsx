import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function AddDoctorProfile() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
        DoctorAddProfile
      </div>
    </>
  );
}
export default AddDoctorProfile;
