import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function AddDoctorProfile() {
  return (
    <>
      <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
      DoctorAddProfile
    </>
  );
}
export default AddDoctorProfile;
