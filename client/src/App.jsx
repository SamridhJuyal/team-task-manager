import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />

        {/* Private */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects"
          element={token ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/:id"
          element={token ? <ProjectDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/team"
          element={token ? <Team /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
