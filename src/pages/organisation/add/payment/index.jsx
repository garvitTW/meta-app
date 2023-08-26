import "./style.scss";
import AddOrganisationTabs from "../../../../components/addOrganisationTabs";
import PaymentComp from "../../../../components/payment";
function Payment() {
  return (
    <>
      <div className="Patients_section Organization-section AddOrganisationProfile">
        <AddOrganisationTabs />
        <PaymentComp />
      </div>
    </>
  );
}

export default Payment;
