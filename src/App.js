import "../src/assests/styles/globleStyle.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Verification from "./pages/verification";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
