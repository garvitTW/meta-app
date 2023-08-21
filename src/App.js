import "../src/assests/styles/globleStyle.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./constants/route";
import Layout from "./components/layout";
import ProtectedRoute from "./components/protectedRoutes";
import NotFound from "./components/pageNotFound";

function App() {
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

          {protectedRoutes.map((route) => (
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
