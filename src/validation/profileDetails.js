import * as Yup from "yup";
import { faxRegExp } from "../constants/common.constants";

export const generalSchemaProfileDetails = Yup.object().shape({
  street: Yup.string().required("Street is required"),
  suite_unit: Yup.string().required("Suite/Unit is required"),
  zip: Yup.string()
    .matches(
      /^\d{5}(-\d{4})?$/,
      "enter a valid ZIP code. It should be 5 digits or in the format 12345-1234."
    )
    .required("ZIP is required"),
  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  state: Yup.string()
    .required("State is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
});

const validationSchemaProfileDetails = generalSchemaProfileDetails.shape({
  name: Yup.string()
    .required("Organization Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Organization Email is required"),
  phone_number: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Organization Phone number is required"),
  organization_fax: Yup.string()
    .nullable()
    .matches(faxRegExp, "Invalid FAX format Ex:-(000)000-0000"),
  organization_rep_first_name: Yup.string()
    .required("First Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  organization_rep_last_name: Yup.string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  organization_rep_phone: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Representative Phone number is required"),
  organization_rep_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Representative Email is required"),
});

export default validationSchemaProfileDetails;
