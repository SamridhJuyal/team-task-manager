import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import Board from "../components/Board";
import TaskModal from "../components/TaskModal";

export default function ProjectDetails() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    API.get(`/tasks/project/${id}`).then((res) => setTasks(res.data));

    API.get("/projects").then((res) => {
      const p = res.data.find((x) => x._id === id);
      setProject(p);
    });
  }, [id]);

  const createTask = async (form) => {
    const res = await API.post("/tasks", {
      ...form,
      projectId: id,
    });

    setTasks((prev) => [...prev, res.data]);
    setOpen(false);
  };

  const updateStatus = async (taskId, status) => {
    const res = await API.put(`/tasks/${taskId}`, { status });

    setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
  };

  if (!project) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{project.title}</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Task
        </button>
      </div>

      <Board tasks={tasks} setTasks={setTasks} updateStatus={updateStatus} />

      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={createTask}
        members={project.members}
      />
    </Layout>
  );
}
