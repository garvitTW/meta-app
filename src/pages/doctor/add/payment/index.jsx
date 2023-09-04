import PaymentComp from "../../../../components/payment";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addDoctorTabs } from "../../../../constants/doctor.constants";

function AddDoctorPayment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile Add_Organisation_Professional">
        <TabsWithNavigation tabs={addDoctorTabs} heading="Add Doctor" />
        <PaymentComp />
      </div>
    </>
  );
}
export default AddDoctorPayment;
