import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function EditDoctorProfessional() {
  return (
    <>
      {" "}
      <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />
      DoctorEditProfessional
    </>
  );
}
export default EditDoctorProfessional;
