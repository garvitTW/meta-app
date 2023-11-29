import * as Yup from "yup";

export const generalSchemaProfileDetails = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Phone number is required"),
  street: Yup.string().required("Street is required"),
  suite_unit: Yup.string().required("Suite/Unit is required"),
  zip: Yup.string()
    .required("Zip is required")
    .matches(/^\d+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  state: Yup.string()
    .required("State is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
});

const validationSchemaProfileDetails = generalSchemaProfileDetails.shape({
  organization_rep_first_name: Yup.string()
    .required("Organization representative's first name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  organization_rep_last_name: Yup.string()
    .required("Organization representative's last name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  organization_rep_phone: Yup.string()
    .matches(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid US mobile number Ex:-(123)456-7890"
    )
    .required("Phone number is required"),
  organization_rep_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Email is required"),
});

export default validationSchemaProfileDetails;
