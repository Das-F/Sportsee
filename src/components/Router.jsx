import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login.jsx";
import Dashboard from "../../pages/Dashboard.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/:id" element={<Dashboard />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
