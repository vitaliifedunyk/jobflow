# JobFlow — Job Application Tracker

JobFlow is a simple admin-style application for tracking job applications.
It works like a mini personal CRM for managing job search progress.

---

## About

This project was built as part of a frontend portfolio to demonstrate:

- State management without frameworks
- DOM rendering from data
- Array methods (filter, map, sort, find, findIndex)
- Clean project structure
- Feature-based Git commits
- Local data persistence

---

## Features (MVP)

- Create / Edit / Delete applications
- Form validation
- Live search (company + position)
- Filter by status
- Sort by date and salary
- Persistent storage via localStorage
- Export applications to JSON
- Import applications from JSON

---

## Application Model

Each application contains:

- id
- company
- position
- status (Applied / Interview / Offer / Rejected)
- appliedDate
- salary (optional)
- createdAt
- updatedAt

---

## Tech Stack

- JavaScript (ES6+)
- Vite
- Tailwind CSS
- Browser localStorage API

---

## Getting Started

Install dependencies:

    npm install

Run development server:

    npm run dev

---

## Build

    npm run build
    npm run preview

---

## Live Demo

🔗 https://jobflow-nu.vercel.app/

---

## Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Add Application Modal

![Modal](./screenshots/modal.png)

---

## Future Improvements (v2 ideas)

- TypeScript migration
- React / Next.js version
- Backend API with authentication
- Database persistence
- User accounts
- Multi-device synchronization

---

## Author

Built as part of a structured fullstack learning roadmap.
