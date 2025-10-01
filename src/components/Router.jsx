import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login.jsx";
import Dashboard from "../../pages/Dashboard.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/:id" element={<Dashboard />} />
    </Routes>
  );
}

export default Router;
