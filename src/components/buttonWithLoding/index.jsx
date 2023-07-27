import { Button, Spinner } from "react-bootstrap";

function ButtonWithLoader({ isSubmitting, label }) {
  return (
    <Button variant="primary" type="submit" disabled={isSubmitting}>
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
