import { Link } from "react-router";

const priorityStyles = {
  High: "bg-coral/15 text-coral",
  Medium: "bg-teal/15 text-teal",
  Low: "bg-mist text-ink",
};

const statuses = ["To Do", "In Progress", "Done"];
const priorities = ["High", "Medium", "Low"];

export default function TaskCard({
  task,
  onMoveTask,
  onUpdateTask,
  onDeleteTask,
}) {
  return (
    <article className="rounded-xl border border-sand bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-ink">
          <Link to={`/task/${task.id}`}>{task.title}</Link>
        </h3>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            priorityStyles[task.priority] ?? "bg-mist text-ink"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mb-4 text-sm leading-6 text-ink/70">{task.description}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sand pt-3">
        <label className="sr-only" htmlFor={`status-${task.id}`}>
          Status for {task.title}
        </label>
        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) => onMoveTask(task.id, event.target.value)}
          className="rounded-lg border border-sand bg-canvas px-2.5 py-2 text-xs text-ink"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor={`priority-${task.id}`}>
          Priority for {task.title}
        </label>
        <select
          id={`priority-${task.id}`}
          value={task.priority}
          onChange={(event) =>
            onUpdateTask(task.id, { priority: event.target.value })
          }
          className="rounded-lg border border-sand bg-white px-2.5 py-2 text-xs text-ink"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          className="rounded-lg px-2.5 py-2 text-xs font-medium text-coral hover:bg-coral/10"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
