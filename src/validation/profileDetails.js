import * as Yup from "yup";

const validationSchemaProfileDetails = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z]+(?:[A-Za-z\s.-]*[A-Za-z])?$/, "Invalid name format"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .required("Phone number is required"),
  //   organization_fax: Yup.string()
  //     .matches(/^\d+$/, "Fax number must only contain digits")
  //     .required("Fax number is required"),
  organization_rep_first_name: Yup.string()
    .required("Organization representative's first name is required")
    .matches(/^[A-Za-z]+(?:[A-Za-z\s.-]*[A-Za-z])?$/, "Invalid name format"),
  organization_rep_last_name: Yup.string()
    .required("Organization representative's last name is required")
    .matches(/^[A-Za-z]+(?:[A-Za-z\s.-]*[A-Za-z])?$/, "Invalid name format"),
  organization_rep_phone: Yup.string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
    .required("Organization representative's phone number is required"),
  organization_rep_email: Yup.string()
    .email("Invalid email")
    .required("Organization representative's email is required"),
  street: Yup.string().required("Street is required"),
  suite_unit: Yup.string().required("Suite/Unit is required"),
  city: Yup.string()
    .required("City is required")
    .matches(/^[A-Za-z]+(?:[A-Za-z\s.-]*[A-Za-z])?$/, "Invalid city format"),
  state: Yup.string()
    .required("State is required")
    .matches(/^[A-Za-z]+(?:[A-Za-z\s.-]*[A-Za-z])?$/, "Invalid state format"),
});

export default validationSchemaProfileDetails;
