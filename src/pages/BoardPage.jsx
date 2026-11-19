import { useState } from "react";
import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import useTaskFilter from "../hooks/useTaskFilter";
import { Link } from "react-router";

const columns = ["To Do", "In Progress", "Done"];

const emptyTask = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
};

export default function BoardPage({
  tasks,
  addTask,
  moveTask,
  updateTask,
  deleteTask,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("All");
  const [newTask, setNewTask] = useState(emptyTask);
  const filteredTasks = useTaskFilter(tasks, searchTerm, priority);

  function handleSubmit(event) {
    event.preventDefault();
    if (!newTask.title.trim()) return;

    addTask({
      ...newTask,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
    });
    setNewTask(emptyTask);
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setNewTask((currentTask) => ({ ...currentTask, [name]: value }));
  }

  return (
    <main className="min-h-screen bg-canvas px-6 py-10 text-ink">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-teal">
            Your workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Task board
          </h1>
          <p className="mt-2 text-ink/70">
            A clear space to keep your work moving.
          </p>
        </header>

        <nav className="mb-4">
          <Link to="/archive" className="font-medium text-teal hover:underline">
            View completed tasks →
          </Link>
        </nav>
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-3 rounded-2xl border border-sand bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          <input
            name="title"
            value={newTask.title}
            onChange={handleFieldChange}
            placeholder="Task title"
            aria-label="New task title"
            required
            className="rounded-xl border border-sand bg-canvas px-4 py-3 text-sm outline-none focus:border-teal"
          />
          <input
            name="description"
            value={newTask.description}
            onChange={handleFieldChange}
            placeholder="Description"
            aria-label="New task description"
            className="rounded-xl border border-sand bg-canvas px-4 py-3 text-sm outline-none focus:border-teal"
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleFieldChange}
            aria-label="New task status"
            className="rounded-xl border border-sand bg-canvas px-4 py-3 text-sm"
          >
            {columns.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleFieldChange}
            aria-label="New task priority"
            className="rounded-xl border border-sand bg-canvas px-4 py-3 text-sm"
          >
            {["High", "Medium", "Low"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-teal px-4 py-3 text-sm font-semibold text-white hover:bg-teal/90"
          >
            Add task
          </button>
        </form>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          priority={priority}
          onPriorityChange={setPriority}
        />

        <div className="flex flex-col gap-5 lg:flex-row">
          {columns.map((title) => (
            <Column
              key={title}
              title={title}
              tasks={filteredTasks.filter((task) => task.status === title)}
              onMoveTask={moveTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
