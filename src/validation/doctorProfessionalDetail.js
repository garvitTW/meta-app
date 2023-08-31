import * as Yup from "yup";
const doctorProfessionalValidationSchema = Yup.object().shape({
  services_offered: Yup.array().min(1, "Please select at least one service"),

  languages_spoken: Yup.array().min(1, "Please select at least one languages"),

  documents: Yup.array().of(
    Yup.object().shape({
      document_type: Yup.string().required("Document type is required"),
      file: Yup.mixed().required("Please upload a document"),
      validity: Yup.string().required("Validity is required"),
      issuer_name: Yup.string().required("Issuer name is required"),
      category: Yup.string().required("Category is required"),
      license_number: Yup.string().required("License number is required"),
    })
  ),
  years: Yup.number()
    .typeError("Years must be a number")
    .integer("Years must be an integer")
    .min(0, "Years must be a positive number or zero")
    .required("Years is required"),

  months: Yup.number()
    .typeError("Months must be a number")
    .integer("Months must be an integer")
    .min(0, "Months must be a positive number or zero")
    .max(11, "Months must be between 0 and 11")
    .required("Months is required"),
});

export default doctorProfessionalValidationSchema;
