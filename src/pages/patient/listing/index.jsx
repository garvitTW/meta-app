import "./style.scss";
import Patients from "../../../components/Patients";
function PatientListing({ doctor_id = "" }) {
  return (
    <>
      <Patients doctor_id={doctor_id} />
    </>
  );
}

export default PatientListing;
