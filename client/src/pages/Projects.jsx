import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const createProject = async () => {
    if (!title.trim()) return;
    const res = await API.post("/projects", { title });
    setProjects((prev) => [...prev, res.data]);
    setTitle("");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Projects</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border rounded-md px-3 py-2 w-64"
          placeholder="New project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createProject}
          className="bg-indigo-600 text-white px-4 rounded-md"
        >
          Create
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/projects/${p._id}`)}
            className="bg-white border rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {p.members.length} members
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
