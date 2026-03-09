import { useState } from "react";
import { createTask } from "../../services/taskService";
import { success, error } from "../../utils/toast";

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

      success("Task created successfully");

      onTaskCreated();
      onClose();

      setForm({
        title: "",
        description: "",
        category: "work",
        priority: "medium",
        dueDate: ""
      });

    } catch (err) {

      console.error(err);
      error("Task creation failed");

    }
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-lg font-semibold">
            Add New Task
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Title */}

          <div>

            <label className="text-sm text-gray-600 mb-1 block">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-gray-50 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Description */}

          <div>

            <label className="text-sm text-gray-600 mb-1 block">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Optional description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 bg-gray-50 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Category + Priority */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-gray-600 mb-1 block">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-gray-50 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
              </select>

            </div>

            <div>

              <label className="text-sm text-gray-600 mb-1 block">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-gray-50 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

            </div>

          </div>

          {/* Due Date */}

          <div>

            <label className="text-sm text-gray-600 mb-1 block">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-gray-50 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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