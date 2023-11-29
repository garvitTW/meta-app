import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";

const validationSchemaClinicProfileDetails = generalSchemaProfileDetails.shape({
  clinic_extension: Yup.string()
    .matches(/^\d+$/, "Extension must only contain digits")
    .min(1, "Extension must be at least 1 digit")
    .max(6, "Extension must be at most 6 digits")
    .required("Extension is required"),
  clinic_rep_name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),

  clinic_rep_phone: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Phone number is required"),
  clinic_rep_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Email is required"),
});

export default validationSchemaClinicProfileDetails;
