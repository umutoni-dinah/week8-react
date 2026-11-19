import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"

export default function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((item) => item.id === id)

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
  })

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
      })
    }
  }, [task])

  if (!task) {
    return (
      <main className="min-h-screen bg-canvas p-8 text-ink">
        <p className="mb-4">Task not found.</p>
        <Link to="/" className="font-medium text-teal underline">
          Back to board
        </Link>
      </main>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    updateTask(task.id, {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
    })
    navigate("/")
  }

  function handleDelete() {
    deleteTask(task.id)
    navigate("/")
  }

  return (
    <main className="min-h-screen bg-canvas px-6 py-10 text-ink">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="mb-6 inline-block font-medium text-teal">
          ← Back to board
        </Link>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-sand bg-white p-6 shadow-sm"
        >
          <h1 className="text-2xl font-bold">Edit task</h1>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-sand bg-canvas px-4 py-3 outline-none focus:border-teal"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-xl border border-sand bg-canvas px-4 py-3 outline-none focus:border-teal"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Status</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-sand bg-canvas px-4 py-3"
            >
              {["To Do", "In Progress", "Done"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-teal px-5 py-3 font-semibold text-white hover:bg-teal/90"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl border border-coral/40 px-5 py-3 font-semibold text-coral hover:bg-coral/10"
            >
              Delete task
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}