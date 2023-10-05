import PaymentComp from "../../../../components/payment";
import TabsWithNavigation from "../../../../components/tabsWithNavigation";
import { editClinicTabs } from "../../../../constants/clinic.constants";

function EditClinicPayment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <TabsWithNavigation tabs={editClinicTabs} heading="Edit Clinic" />

        <PaymentComp />
      </div>
    </>
  );
}
export default EditClinicPayment;
