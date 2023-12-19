import { Form } from "react-bootstrap";
import { ErrorMessage } from "../errorMessage";

import Asterisk from "../asterisk";
function PhoneOrFaxInput({
  touched,
  errors,
  name,
  getFieldProps,
  type,
  placeholder,
  label,
  required = true,
  readOnly = false,
  handleChange,
}) {
  return (
    <Form.Group className="mb-4 errorClass">
      <Form.Label>
        {label}
        {required && <Asterisk />}
      </Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...getFieldProps(name)}
        onChange={handleChange}
        className={`${touched[name] && errors[name] ? "is-invalid-label" : ""}`}
        readOnly={readOnly}
      />
      <ErrorMessage errors={errors} touched={touched} name={name} />
    </Form.Group>
  );
}
export default PhoneOrFaxInput;
