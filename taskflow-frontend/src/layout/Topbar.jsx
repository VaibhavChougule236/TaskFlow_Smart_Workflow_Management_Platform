function Topbar() {

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">

      <input
        type="text"
        placeholder="Search tasks..."
        className="border rounded px-3 py-2 w-64"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        + Add Task
      </button>

    </header>
  );
}

export default Topbar;