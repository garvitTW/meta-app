import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";

const validationSchemaPatient = generalSchemaProfileDetails.shape({
  name: Yup.string()
    .required("First Name is required")
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
      "Invalid Mobile Number. Please enter 10 digits phone number"
    )
    .required("Patient Phone Number is required"),
  surname: Yup.string()
    .required("Last Name  is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  doctors: Yup.array().min(1, "Please select at least one doctor"),
});

export default validationSchemaPatient;
