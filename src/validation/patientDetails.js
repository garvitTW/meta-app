import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";

const validationSchemaPatient = generalSchemaProfileDetails.shape({
  doctors: Yup.array().min(1, "Please select at least one doctor"),
});

export default validationSchemaPatient;
