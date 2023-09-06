import { useNavigate } from "react-router-dom";
import URL from "../../constants/routesURL";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3">
          {" "}
          <span class="text-danger">Opps!</span> Page not found.
        </p>
        <p class="lead">The page you’re looking for doesn’t exist.</p>
        <button class="btn btn-primary" onClick={() => navigate(URL.LOGIN)}>
          Click to Go Back
        </button>
      </div>
    </div>
  );
}
export default NotFound;
