import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";
import { faxRegExp } from "../constants/common.constants";

const validationSchemaClinicProfileDetails = generalSchemaProfileDetails.shape({
  name: Yup.string()
    .required("Clinic Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Clinic Email is required"),
  phone_number: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Clinic Phone number is required"),
  clinic_fax: Yup.string()
    .nullable()
    .matches(faxRegExp, "Invalid FAX format Ex:-(000)000-0000"),
  clinic_extension: Yup.string()
    .matches(/^\d+$/, "Extension must only contain digits")
    .min(1, "Extension must be at least 1 digit")
    .max(6, "Extension must be at most 6 digits")
    .required("Extension is required"),
  clinic_rep_name: Yup.string()
    .required("Representative Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),

  clinic_rep_phone: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Representative Phone number is required"),
  clinic_rep_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Representative Email is required"),
});

export default validationSchemaClinicProfileDetails;
