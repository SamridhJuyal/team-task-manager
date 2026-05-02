import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Team() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedProject");
    return saved ? JSON.parse(saved) : null;
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    API.get("/projects").then((res) => {
      setProjects(res.data);

      const saved = localStorage.getItem("selectedProject");
      if (saved) {
        const parsed = JSON.parse(saved);
        const updated = res.data.find((p) => p._id === parsed._id);
        if (updated) setSelected(updated);
      }
    });
  }, []);

  const handleSelect = (id) => {
    const proj = projects.find((p) => p._id === id);
    setSelected(proj);
    localStorage.setItem("selectedProject", JSON.stringify(proj));
  };

  const addMember = async () => {
    if (!form.name || !form.email || !selected) return;

    try {
      const res = await API.post(`/projects/${selected._id}/add-member`, {
        name: form.name,
        email: form.email,
      });

      setSelected(res.data);
      localStorage.setItem("selectedProject", JSON.stringify(res.data));

      setForm({ name: "", email: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const changeRole = async (userId, role) => {
    await API.put(`/projects/${selected._id}/update-role`, {
      userId,
      role,
    });

    setSelected((prev) => {
      const updated = {
        ...prev,
        members: prev.members.map((m) =>
          m._id === userId ? { ...m, role } : m,
        ),
      };
      localStorage.setItem("selectedProject", JSON.stringify(updated));
      return updated;
    });
  };

  const removeMember = async (userId) => {
    await API.delete(`/projects/${selected._id}/remove-member`, {
      data: { userId },
    });

    setSelected((prev) => {
      const updated = {
        ...prev,
        members: prev.members.filter((m) => m._id !== userId),
      };
      localStorage.setItem("selectedProject", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Team Management</h1>

      {/* Project Selector */}
      <div className="mb-6">
        <select
          className="border px-3 py-2 rounded-md"
          value={selected?._id || ""}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Member */}
      {selected && (
        <div className="bg-white p-4 rounded-xl border shadow-sm mb-6 flex flex-wrap gap-3">
          <input
            placeholder="Name"
            className="border px-3 py-2 rounded-md"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="border px-3 py-2 rounded-md"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <button
            onClick={addMember}
            className="bg-indigo-600 text-white px-4 rounded-md"
          >
            Add Member
          </button>
        </div>
      )}

      {/* Members List */}
      {selected && (
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="px-4 py-3 border-b font-medium">
            Members of {selected.title}
          </div>

          {selected.members.map((m) => (
            <div
              key={m._id}
              className="flex justify-between items-center px-4 py-3 border-b"
            >
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-500">{m.email}</p>
              </div>

              <div className="flex gap-2 items-center">
                <select
                  value={m.role || "member"}
                  onChange={(e) => changeRole(m._id, e.target.value)}
                  className="border px-2 py-1 rounded-md"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={() => removeMember(m._id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
