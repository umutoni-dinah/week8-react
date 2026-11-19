import { useEffect, useState } from "react"

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key)
      return savedValue ? JSON.parse(savedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (value === null) return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Could not save to local storage:", error)
    }
  }, [key, value])

  return [value, setValue]
}