import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function EditDoctorProfile() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />
        DoctorEditProfile
      </div>
    </>
  );
}
export default EditDoctorProfile;
