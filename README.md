<div align="center">
  <h1>MedAxis</h1>
  <p><strong>AI-Powered Hospital Operations Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Socket.IO-Realtime-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Socket.IO" />
    <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/Polar-Billing-6E59A5?style=flat-square" alt="Polar" />
    <img src="https://img.shields.io/badge/Inngest-Background%20Jobs-111827?style=flat-square" alt="Inngest" />
  </p>

  <p>
    A full-stack hospital management system with role-based dashboards, real-time notifications, AI-assisted triage, and integrated billing — built for administrators, doctors, nurses, and patients.
  </p>

  <p>
    <a href="https://your-live-demo-url.com"><strong>🌐 Live Demo</strong></a> &nbsp;·&nbsp;
    <a href="https://your-demo-video-url.com"><strong>🎥 Demo Video</strong></a>
  </p>
</div>

---

## Overview

MedAxis is a healthcare operations platform that keeps every stakeholder — admins, doctors, nurses, and patients — on the same page through a shared, real-time operational layer.

- **Role-based dashboards** — dedicated views per user role
- **AI-assisted workflows** — Gemini handles triage and radiology analysis via Inngest background jobs
- **Real-time sync** — Socket.IO pushes updates instantly across dashboards
- **Integrated billing** — Polar-backed invoice generation and checkout
- **Session & audit trail** — full activity logs and notification inbox

---

## Features

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Role-Based Auth</strong></td>
      <td>Secure login with Better Auth; protected routes on both client and server</td>
    </tr>
    <tr>
      <td><strong>Admin Dashboard</strong></td>
      <td>User management, activity logs, billing overview, and analytics</td>
    </tr>
    <tr>
      <td><strong>Doctor & Nurse Views</strong></td>
      <td>Patient management, lab result review, admission triggers</td>
    </tr>
    <tr>
      <td><strong>Patient Portal</strong></td>
      <td>View records, invoices, and pay via Polar checkout</td>
    </tr>
    <tr>
      <td><strong>AI Triage</strong></td>
      <td>Gemini automatically assigns doctor and nurse on patient admission</td>
    </tr>
    <tr>
      <td><strong>X-Ray Analysis</strong></td>
      <td>Gemini analyzes uploaded radiology images and stores results</td>
    </tr>
    <tr>
      <td><strong>Lab Result Workflow</strong></td>
      <td>Create, update, and review lab results with AI annotations</td>
    </tr>
    <tr>
      <td><strong>Real-Time Notifications</strong></td>
      <td>Socket.IO delivers live updates without page refresh</td>
    </tr>
    <tr>
      <td><strong>Background Jobs</strong></td>
      <td>Inngest handles AI tasks and billing charges asynchronously</td>
    </tr>
    <tr>
      <td><strong>File Uploads</strong></td>
      <td>Secure media uploads via UploadThing</td>
    </tr>
  </tbody>
</table>

---

## Tech Stack

### Frontend

<table>
  <thead>
    <tr>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>React 19 + TypeScript</td>
      <td>Component-driven UI with full type safety</td>
    </tr>
    <tr>
      <td>React Router</td>
      <td>Nested layouts and protected route composition</td>
    </tr>
    <tr>
      <td>Tailwind CSS + shadcn/ui</td>
      <td>Design system and accessible UI primitives</td>
    </tr>
    <tr>
      <td>TanStack Query</td>
      <td>Server state, caching, and refetching</td>
    </tr>
    <tr>
      <td>Socket.IO Client</td>
      <td>Real-time event subscriptions</td>
    </tr>
  </tbody>
</table>

### Backend & Services

<table>
  <thead>
    <tr>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Node.js + Express</td>
      <td>REST API and socket server</td>
    </tr>
    <tr>
      <td>MongoDB + Mongoose</td>
      <td>Primary database</td>
    </tr>
    <tr>
      <td>Better Auth</td>
      <td>Authentication, sessions, and role metadata</td>
    </tr>
    <tr>
      <td>Inngest</td>
      <td>Event-driven background jobs</td>
    </tr>
    <tr>
      <td>Gemini AI</td>
      <td>AI triage and radiology analysis</td>
    </tr>
    <tr>
      <td>Polar</td>
      <td>Billing, checkout, and payment portal</td>
    </tr>
    <tr>
      <td>UploadThing</td>
      <td>Authorized file uploads and deletion</td>
    </tr>
  </tbody>
</table>

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or managed)
- Accounts for: [Polar](https://polar.sh), [Inngest](https://inngest.com), [Gemini](https://ai.google.dev), [UploadThing](https://uploadthing.com), [Better Auth](https://better-auth.com)

### Installation

```bash
git clone https://github.com/your-username/medaxis.git
cd medaxis
```

```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && bun install
```

### Environment Variables

Create a `.env` file inside `server/`:

```env
MONGO_URL=mongodb://127.0.0.1:27017/medaxis
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
BETTER_AUTH_URL=http://localhost:5000
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret
POLAR_PRODUCT_ID=your_polar_product_id
GEMINI_KEY=your_gemini_api_key
```

### Running Locally

```bash
# Terminal 1 — Client
cd client && npm run dev

# Terminal 2 — Server (starts API + Inngest + ngrok)
cd server && bun run dev
```

---

## Project Structure

```
medaxis/
├── client/
│   └── app/
│       ├── components/       # UI, dashboard, auth, navigation
│       ├── hooks/            # Custom React hooks
│       ├── lib/              # API client and utilities
│       └── routes/           # Pages and protected layouts
└── server/
    └── src/
        ├── controllers/      # Request handlers
        ├── routes/           # REST endpoints
        ├── models/           # Mongoose schemas
        ├── inngest/          # Background job functions
        ├── middleware/       # Auth and role guards
        └── lib/              # Auth, socket, upload setup
```

---

## User Roles

<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>Access</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Administrator</strong></td>
      <td>Full system — users, billing, logs, analytics</td>
    </tr>
    <tr>
      <td><strong>Doctor</strong></td>
      <td>Patient management, labs, admissions, invoices</td>
    </tr>
    <tr>
      <td><strong>Nurse</strong></td>
      <td>Patient assignments, status updates, notifications</td>
    </tr>
    <tr>
      <td><strong>Patient</strong></td>
      <td>Own records, invoices, Polar checkout</td>
    </tr>
    <tr>
      <td><strong>Lab Tech</strong></td>
      <td>Create and update lab results</td>
    </tr>
  </tbody>
</table>

---

## AI Workflows

Both AI features run as Inngest background jobs, keeping the request cycle fast:

- **Admission Triage** — on `patient/admitted`, Gemini picks the best available doctor and nurse, updates the patient record, and fires a real-time notification
- **X-Ray Analysis** — on `labResult/created`, Gemini fetches and analyzes the uploaded image, stores the result, and notifies the assigned team

---

## API Overview

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/api/users</code></td>
      <td>Paginated user list</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/users/update/:id</code></td>
      <td>Update user profile</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/users/:id/admit</code></td>
      <td>Trigger admission workflow</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/lab-results</code></td>
      <td>Create a lab result</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/api/lab-results/:id</code></td>
      <td>Update lab result</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/invoices</code></td>
      <td>Paginated invoice list</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/invoices/:id/checkout</code></td>
      <td>Create Polar checkout</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/notifications</code></td>
      <td>Notification inbox</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/api/inngest</code></td>
      <td>Inngest event handler</td>
    </tr>
  </tbody>
</table>

---

## Deployment

Recommended: deploy the client to **Vercel** and the server to any Node-compatible platform (Railway, Render, etc.).

1. Set all environment variables in your hosting platform
2. Point `FRONTEND_URL` to your deployed client URL
3. Configure Polar webhooks to hit your deployed server
4. Ensure HTTPS is enabled for WebSocket support

---

## What's Next

- [ ] Appointment booking and scheduling with calendar views for doctors and nurses
- [ ] LiveKit-powered telemedicine rooms for video consultations
- [ ] Pharmacy module — prescription management and inventory fulfillment
- [ ] OCR ingestion for scanned referrals and external medical reports
- [ ] AI chat assistant for clinicians during active sessions
- [ ] AI-generated patient summaries from longitudinal records
- [ ] Advanced analytics — bed occupancy, revenue trends, staff utilization
- [ ] Patient self-service queue tracking and appointment booking
- [ ] Environment-driven client API config (replacing hardcoded localhost URLs)
- [ ] Automated test suite + CI pipeline (typecheck, build, integration, E2E)

---

<div align="center">

### 🏥 Building the future of intelligent healthcare operations.

Made with ❤️ using React, Node.js, MongoDB, Gemini AI, Socket.IO, Inngest & Polar.

If you found this project interesting, consider giving it a ⭐ on GitHub.

</div>