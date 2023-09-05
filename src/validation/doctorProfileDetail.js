import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";

const validationSchemaDoctorProfileDetails = generalSchemaProfileDetails.shape({
  clinics: Yup.array().min(1, "Please select at least one clinic"),
});

export default validationSchemaDoctorProfileDetails;
