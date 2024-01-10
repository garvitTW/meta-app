import * as Yup from "yup";
const validationSchemaProfessionalDetails = Yup.object().shape({
  years: Yup.number()
    .typeError("Years must be a number")
    .integer("Years must be a whole number")
    .min(0, "Years cannot be negative")
    .nullable(true),

  months: Yup.number()
    .typeError("Years must be a number")
    .integer("Months must be a whole number")
    .min(0, "Months cannot be negative")
    .max(11, "Months cannot be more than 11")
    .nullable(true),

  services_offered: Yup.array().min(1, "Please select at least one service"),

  languages_spoken: Yup.array().min(1, "Please select at least one languages"),

  // documents: Yup.array().of(
  //   Yup.object().shape({
  //     document_type: Yup.string().required("Document type is required"),
  //     file: Yup.mixed().required("Please upload a document"),
  //     validity: Yup.string().required("Validity is required"),
  //     issuer_name: Yup.string().required("Issuer name is required"),
  //     category: Yup.string().required("Category is required"),
  //     license_number: Yup.string().required("License number is required"),
  //   })
  // ),

  documents: Yup.array().of(
    Yup.object().shape({
      validity: Yup.string().required("Validity is required"),
      document_state: Yup.string().required("State is required"),
      category: Yup.string().required("Category is required"),
      license_number: Yup.string().required("License number is required"),
    })
  ),
});

export default validationSchemaProfessionalDetails;
