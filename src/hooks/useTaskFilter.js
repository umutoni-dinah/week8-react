import { useMemo } from "react"

export default function useTaskFilter(tasks, searchTerm, priority) {
  return useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)

      const matchesPriority =
        priority === "All" || task.priority === priority

      return matchesSearch && matchesPriority
    })
  }, [tasks, searchTerm, priority])
}