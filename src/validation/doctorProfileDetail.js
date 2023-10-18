import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";

const validationSchemaDoctorProfileDetails = generalSchemaProfileDetails.shape({
  clinics: Yup.array().min(1, "Please select at least one clinic"),
  zip: Yup.string()
    .required()
    .matches(/^\d+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
});

export default validationSchemaDoctorProfileDetails;
