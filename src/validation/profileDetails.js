import * as Yup from "yup";

const validationSchemaProfileDetails = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .required("Phone number is required"),
  //   organization_fax: Yup.string()
  //     .matches(/^\d+$/, "Fax number must only contain digits")
  //     .required("Fax number is required"),
  organization_rep_first_name: Yup.string().required(
    "Organization representative's first name is required"
  ),
  organization_rep_last_name: Yup.string().required(
    "Organization representative's last name is required"
  ),
  organization_rep_phone: Yup.string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .required("Organization representative's phone number is required"),
  organization_rep_email: Yup.string()
    .email("Invalid email")
    .required("Organization representative's email is required"),
  street: Yup.string().required("Street is required"),
  suite_unit: Yup.string().required("Suite/Unit is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
});

export default validationSchemaProfileDetails;
