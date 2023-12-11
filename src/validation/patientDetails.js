import * as Yup from "yup";
import { generalSchemaProfileDetails } from "./profileDetails";

const validationSchemaPatient = generalSchemaProfileDetails.shape({
  surname: Yup.string()
    .required("Surname is required")
    .matches(/^[a-zA-Z_\-.'\s,]+$/, "Only alpha char allowed"),
  doctors: Yup.array().min(1, "Please select at least one doctor"),
});

export default validationSchemaPatient;
