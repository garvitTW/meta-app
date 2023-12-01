import { memo } from "react";
import Spinner from "react-bootstrap/Spinner";

function LoaderSpinner({ loading, className = "" }) {
  return (
    loading && (
      <Spinner
        animation="border"
        variant="warning"
        role="status"
        className={className}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  );
}

export default memo(LoaderSpinner);
