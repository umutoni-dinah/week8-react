import { Link } from "react-router"

export default function ArchivePage({ tasks }) {
  const completedTasks = tasks.filter((task) => task.status === "Done")

  return (
    <main className="min-h-screen bg-canvas px-6 py-10 text-ink">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="mb-6 inline-block font-medium text-teal">
          ← Back to board
        </Link>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-teal">
            Finished work
          </p>
          <h1 className="text-3xl font-bold">Archive</h1>
          <p className="mt-2 text-ink/70">
            {completedTasks.length} completed{" "}
            {completedTasks.length === 1 ? "task" : "tasks"}
          </p>
        </header>

        {completedTasks.length === 0 ? (
          <p className="rounded-2xl border border-sand bg-white p-6 text-ink/70">
            No completed tasks yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {completedTasks.map((task) => (
              <li key={task.id}>
                <Link
                  to={`/task/${task.id}`}
                  className="block rounded-xl border border-sand bg-white p-5 shadow-sm hover:border-teal"
                >
                  <h2 className="font-semibold text-ink">{task.title}</h2>
                  <p className="mt-1 text-sm text-ink/70">{task.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}