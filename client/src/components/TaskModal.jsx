import { useState } from "react";

export default function TaskModal({ open, onClose, onCreate, members }) {
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Create Task</h2>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Assign To</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-indigo-600 text-white px-4 py-1 rounded"
            onClick={() => onCreate(form)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
