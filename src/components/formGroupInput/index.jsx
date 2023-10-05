import { Form } from "react-bootstrap";
import { ErrorMessage } from "../errorMessage";
import "./style.scss";
import Asterisk from "../asterisk";
function Input({
  touched,
  errors,
  name,
  getFieldProps,
  type,
  placeholder,
  label,
  required = true,
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
        className={`${touched[name] && errors[name] ? "is-invalid-label" : ""}`}
      />
      <ErrorMessage errors={errors} touched={touched} name={name} />
    </Form.Group>
  );
}
export default Input;
