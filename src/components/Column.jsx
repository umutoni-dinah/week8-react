import TaskCard from "./TaskCard"

export default function Column({
  title,
  tasks,
  onMoveTask,
  onUpdateTask,
  onDeleteTask,
}) {
  return (
    <section className="min-w-64 flex-1 rounded-2xl bg-sand/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-ink">{title}</h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs text-ink/70">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </section>
  )
}