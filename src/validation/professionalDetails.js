import * as Yup from "yup";
const validationSchemaProfessionalDetails = Yup.object().shape({
  services_offered: Yup.array().min(1, "Please select at least one service"),

  languages_spoken: Yup.array()
    .required("Please select at least one language")
    .test(
      "unique-languages",
      "Duplicate languages are not allowed",
      (value) => {
        return new Set(value).size === value.length;
      }
    ),

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
});

export default validationSchemaProfessionalDetails;
