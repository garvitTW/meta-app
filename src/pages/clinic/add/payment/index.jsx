import PaymentComp from "../../../../components/payment";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { addClinicTabs } from "../../../../constants/clinic.constants";

function AddClinicPayment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <TabsWithNavigation tabs={addClinicTabs} heading="Add Clinic" />

        <PaymentComp />
      </div>
    </>
  );
}
export default AddClinicPayment;
