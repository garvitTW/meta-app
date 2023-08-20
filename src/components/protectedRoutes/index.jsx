import { Navigate } from "react-router-dom";
import URL from "../../constants/routesURL";
import { authService } from "../../services/auth.service";

export default function ProtectedRoute({ children }) {
  const authToken = authService.isAuthenticated()
  return authToken ? children : <Navigate to={URL.LOGIN} />;
}
