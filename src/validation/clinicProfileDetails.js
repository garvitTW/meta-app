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
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .required("Phone number is required"),
  clinic_rep_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Email is required"),
});

export default validationSchemaClinicProfileDetails;
