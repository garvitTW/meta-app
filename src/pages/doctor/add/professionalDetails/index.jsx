import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function AddDoctorProfessional() {
  return (
    <>
      <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
      DoctorAddProfessional
    </>
  );
}
export default AddDoctorProfessional;
