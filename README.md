# Kanban Task Board

A simple task board built with React and Vite. Organize tasks by status, set priorities, and keep your board saved in the browser.

**GitHub repository:** [week8-react](https://github.com/umutoni-dinah/week8-react)
**Live demo:** [Open the task board](https://week8-react-nu.vercel.app)
## Features

- Add, edit, move, and delete tasks
- Filter tasks by search text and priority
- View completed tasks in the archive
- Save board changes in local storage
- Navigate between the board and task detail pages

## Built with

- React
- Vite
- Tailwind CSS
- React Router

## Getting started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Routes

- `/` — Task board
- `/task/:id` — Edit a task
- `/archive` — Completed tasks

The project uses local storage for persistence and does not use an external API or the React Context API.