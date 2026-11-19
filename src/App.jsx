import { useEffect, useState } from "react"
import { initialTasks } from "./data/initialTasks"
import useLocalStorage from "./hooks/useLocalStorage"
import BoardPage from "./pages/BoardPage"
import { Route, Routes } from "react-router"
import TaskDetailPage from "./pages/TaskDetailPage"
import ArchivePage from "./pages/ArchivePage"

export default function App() {
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", null)
  const [isLoading, setIsLoading] = useState(tasks === null)

  useEffect(() => {
    if (tasks !== null) return

    const timer = setTimeout(() => {
      setTasks(initialTasks)
      setIsLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [tasks, setTasks])

  function addTask(newTask) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { ...newTask, id: Date.now().toString() },
    ])
  }

  function moveTask(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  function updateTask(taskId, updates) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-canvas text-ink">
        <p className="text-lg font-medium">Loading your board...</p>
      </main>
    )
  }

 return (
  <Routes>
    <Route
      path="/"
      element={
        <BoardPage
          tasks={tasks}
          addTask={addTask}
          moveTask={moveTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      }
    />
    <Route
  path="/task/:id"
  element={
    <TaskDetailPage
      tasks={tasks}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  }
/>
<Route path="/archive" element={<ArchivePage tasks={tasks} />} />
  </Routes>
)
}