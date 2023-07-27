import { Form } from "react-bootstrap";
import { ErrorMessage } from "../errorMessage";

function Input({
  touched,
  errors,
  name,
  getFieldProps,
  type,
  placeholder,
  label,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...getFieldProps(name)}
        className={`${touched[name] && errors[name] ? "is-invalid-label" : ""}`}
      />
      <ErrorMessage errors={errors} touched={touched} name={name} />
    </Form.Group>
  );
}
export default Input;
