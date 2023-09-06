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
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .required("Phone number is required"),
  street: Yup.string().required("Street is required"),
  suite_unit: Yup.string().required("Suite/Unit is required"),
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
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .required("Phone number is required"),
  organization_rep_email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Email is required"),
});

export default validationSchemaProfileDetails;
