import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function AddDoctorPayment() {
  return (
    <>
      <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
      DoctorAddPayment
    </>
  );
}
export default AddDoctorPayment;
