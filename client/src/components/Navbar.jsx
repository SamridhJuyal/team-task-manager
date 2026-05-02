import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-indigo-600">Task Manager</h1>

        <div className="flex items-center gap-4 text-sm">
          {!token ? (
            <>
              <Link className="text-gray-600 hover:text-indigo-600" to="/login">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/team">Team</Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
