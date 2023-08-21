import { memo } from "react";
import Spinner from "react-bootstrap/Spinner";

function LoaderSpinner({ loading }) {
  return (
    loading && (
      <Spinner animation="border" variant="warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  );
}

export default memo(LoaderSpinner);
