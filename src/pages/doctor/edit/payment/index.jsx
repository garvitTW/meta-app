import PaymentComp from "../../../../components/payment";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editDoctorTabs } from "../../../../constants/doctor.constants";
import "./style.scss";
function EditDoctorPayment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={editDoctorTabs} heading="Edit Doctor" />
        <PaymentComp />
      </div>
    </>
  );
}
export default EditDoctorPayment;
