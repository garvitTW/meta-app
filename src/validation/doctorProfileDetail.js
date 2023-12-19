import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";
import { faxRegExp } from "../constants/common.constants";

const validationSchemaDoctorProfileDetails = generalSchemaProfileDetails.shape({
  name: Yup.string()
    .required("Doctor Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Doctor Email is required"),
  phone_number: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Doctor Phone number is required"),
  doctor_fax: Yup.string()
    .nullable()
    .matches(faxRegExp, "Invalid FAX format Ex:-(000)000-0000"),
  clinics: Yup.array().min(1, "Please select at least one clinic"),
});

export default validationSchemaDoctorProfileDetails;
