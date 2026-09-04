# Thakare Clothing — Dockerized E-Commerce App

A full-stack MERN e-commerce platform (storefront + admin panel + REST API),
containerized with Docker and deployed on AWS EC2 using Docker Compose.

Built as part of **Capstone Project 2: Docker, AWS and Real-World DevOps
Deployment**.

## Architecture

```
                    ┌─────────────┐
   Browser ───────► │  frontend    │  nginx, port 5173 — customer store
   Browser ───────► │  admin       │  nginx, port 5174 — admin panel
                    └──────┬───────┘
                           │ REST API calls
                    ┌──────▼───────┐
                    │  backend     │  Node/Express, port 4000
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  mongodb     │  port 27017 (internal only)
                    │  + volume    │
                    └──────────────┘
   All four containers run on a shared Docker bridge network (app-network).
```

## Tech stack

- **Frontend & Admin**: React + Vite + Tailwind CSS, served via nginx
- **Backend**: Node.js + Express, JWT auth, Cloudinary for image uploads
- **Database**: MongoDB (containerized, with a persistent volume)
- **Payments**: Stripe / Razorpay integration
- **Infra**: Docker, Docker Compose, AWS EC2

## Project structure

```
├── backend/          # Express API — products, users, cart, orders
├── frontend/          # Customer-facing storefront (React)
├── admin/             # Admin panel (React) — manage products/orders
├── docker-compose.yml # Orchestrates all 4 services
└── DEPLOYMENT.md      # Full AWS EC2 deployment walkthrough
```

## Running locally

1. Copy the env templates and fill in real values:
   ```
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp admin/.env.example admin/.env
   ```
2. Build and start all services:
   ```
   docker compose up -d --build
   ```
3. Visit:
   - Storefront: http://localhost:5173
   - Admin panel: http://localhost:5174
   - API: http://localhost:4000

## Deploying to AWS EC2

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full step-by-step guide —
EC2 provisioning, security groups, installing Docker, and deploying with
Docker Compose.

## Health checks & resilience

- Every service defines a Docker `HEALTHCHECK` — check status with
  `docker compose ps`.
- All services use `restart: unless-stopped`, so they recover automatically
  after a crash or an instance reboot.
- Logs per service: `docker compose logs -f <service-name>`.

## Screenshots

_Screenshots of the deployed app running on AWS EC2 are in the
[`screenshots/`](./screenshots) folder._
