import { Button, Spinner } from "react-bootstrap";

function ButtonWithLoader({
  variant = "",
  isSubmitting,
  label,
  className = "",
}) {
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={isSubmitting}
      className={className}
    >
      {isSubmitting ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <span className="ml-5">{label}</span>
        </>
      )}
    </Button>
  );
}
export default ButtonWithLoader;
