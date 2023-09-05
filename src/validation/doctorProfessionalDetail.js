import * as Yup from "yup";
import validationSchemaProfessionalDetails from "./professionalDetails";
const doctorProfessionalValidationSchema =
  validationSchemaProfessionalDetails.shape({
    years: Yup.number()
      .typeError("Years must be a number")
      .integer("Years must be an integer")
      .min(0, "Years must be a positive number or zero")
      .max(99, "Years must be a 2 digit")
      .required("Years is required"),

    months: Yup.number()
      .typeError("Months must be a number")
      .integer("Months must be an integer")
      .min(0, "Months must be a positive number or zero")
      .max(11, "Months must be between 0 and 11")
      .required("Months is required"),
    services_offered: Yup.array().min(
      1,
      "Please select at least one Specialization"
    ),
  });

export default doctorProfessionalValidationSchema;
