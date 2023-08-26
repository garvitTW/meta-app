import EditOrganisationTabs from "../../../../components/editOrganisationTabs";
import PaymentComp from "../../../../components/payment";

function Payment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <EditOrganisationTabs />
        <PaymentComp />
      </div>
    </>
  );
}

export default Payment;
