import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function EditDoctorPayment() {
  return (
    <>
      <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />
      DoctorEditPayment
    </>
  );
}
export default EditDoctorPayment;
