#  Mindmap Frontend

This is a React + Vite frontend for visualizing mindmaps. It fetches data dynamically from the mindmap-backend API and stores it in Zustand for rendering. Designed as part of a full-stack mindmap editor/viewer.

---

## Features

-  **Fetch mindmap data** from `mindmap-backend`
-  **Store nodes & links** in Zustand global state
-  **Display JSON dump** in UI for validation
-  Minimal React + Tailwind setup (ready for UI expansion)
-  Hot Module Reloading via Vite

---

## Backend API Dependency

This frontend expects the backend to expose the following endpoint:
`
GET http://localhost:3000/full_map.json
`

The backend parses `.itmz` files and serves them as JSON.

---

##  Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Start development server
```
npm run dev
```

Visit http://localhost:5173

## Tech Stack
- React (with Hooks)

- Zustand – lightweight state management

- Tailwind CSS – utility-first styling

- Vite – fast dev/build tooling

- ESLint – linting with recommended rules


## Project Structure (Simplified)
```
mindmap-frontend/
├── public/
├── src/
│   ├── components/
│   │   └── Canvas.jsx         # Main mindmap viewer
│   ├── state/
│   │   └── useMindmapStore.js # Zustand store for nodes/links
│   ├── utils/
│   │   └── apiClient.js       # Fetch from backend API
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Notes
Future versions will support drag & drop of .itmz files to load maps locally without backend.

For now, ensure the backend server is running at http://localhost:3000.