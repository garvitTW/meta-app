import { BrowserRouter, Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./constants/route";
import Layout from "./components/layout";
import NotFound from "./components/pageNotFound";
import { useContext, useEffect } from "react";
import { Store } from "./store/Store";
import ProtectedRoute from "./components/protectedRoutes";
import { authService } from "./services/auth.service";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const isRememberFor30Days = authService.isRememberFor30Days();
      // Call your logout function here
      if (!isRememberFor30Days) {
        authService.logout();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const accessibleRoutes = protectedRoutes.filter(({ roles }) =>
    roles.includes(userInfo?.user_type)
  );
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {/* Protected routes with sidebar and header */}

          {accessibleRoutes.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout>
                    <route.component />
                  </Layout>
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
