const priorities = ["All", "High", "Medium", "Low"]

export default function FilterBar({
  searchTerm,
  onSearchChange,
  priority,
  onPriorityChange,
}) {
  return (
    <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-sand bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex-1">
        <span className="sr-only">Search tasks</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-sand bg-canvas px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/50 focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </label>

      <div className="flex flex-wrap gap-2" aria-label="Filter by priority">
        {priorities.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onPriorityChange(option)}
            aria-pressed={priority === option}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              priority === option
                ? "bg-teal text-white"
                : "bg-mist text-ink hover:bg-teal/15"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  )
}