import * as Yup from "yup";

const validationSchemaPatient = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  last_name: Yup.string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  email: Yup.string().email("Invalid email").required("Email is required"),
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
  doctors: Yup.array().min(1, "Please select at least one doctor"),
});

export default validationSchemaPatient;
