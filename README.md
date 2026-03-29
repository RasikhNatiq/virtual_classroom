This is a Next.js App Router project for a virtual classroom attendance system.

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

## Notes

- Authentication and classroom data are persisted using browser localStorage only.
- With localStorage-only architecture, data does not sync automatically between different browsers/devices.
