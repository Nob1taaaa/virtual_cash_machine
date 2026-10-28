# Virtual Cash Machine

A browser-based ATM simulator built with React, TypeScript, and Vite. It walks through the full ATM flow: PIN login, balance checks, deposits, withdrawals, quick cash, transaction history, and printable receipts.

## Features

- **PIN login** with an on-screen keypad
- **Balance** view and **deposit** / **withdrawal** flows
- **Quick cash** presets for common amounts
- **Transaction history** for the session
- **Receipts** generated for each transaction
- Sound effects and a confetti celebration on successful actions

## Tech stack

- [React](https://react.dev) with [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for development and builds
- [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) components

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Then open the URL Vite prints, usually <http://localhost:8080>.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── components/   ATM screens (PIN login, quick cash, transaction history) and UI primitives
├── pages/        Route pages
├── utils/        Receipt generation and sound effects
└── hooks/        Shared React hooks
```
