import { useState } from "react";
import { createTask } from "../../services/taskService";

function AddTaskModal({ isOpen, onClose, onTaskCreated }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "work",
    priority: "medium",
    dueDate: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createTask(form);

      onTaskCreated();
      onClose();

      setForm({
        title: "",
        description: "",
        category: "work",
        priority: "medium",
        dueDate: ""
      });

    } catch (error) {
      console.error("Task creation failed", error);
    }
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-6 w-[420px] shadow-lg">

        <h2 className="text-lg font-semibold mb-4">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="grid grid-cols-2 gap-3">

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

          </div>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTaskModal;