import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function EditDoctorProfile() {
  return (
    <>
      <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />
      DoctorEditProfile
    </>
  );
}
export default EditDoctorProfile;
