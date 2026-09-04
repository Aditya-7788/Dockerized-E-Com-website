# Deploying Thakare Clothing to AWS EC2 with Docker Compose

This guide covers containerizing the app locally, provisioning an EC2 instance,
and deploying with Docker Compose — matching the Capstone Project 2 rubric.

## Architecture

```
                    ┌─────────────┐
   Browser ───────► │  frontend    │  (nginx, port 5173) — customer store
   Browser ───────► │  admin       │  (nginx, port 5174) — admin panel
                    └──────┬───────┘
                           │ REST calls
                    ┌──────▼───────┐
                    │  backend     │  (Node/Express, port 4000)
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  mongodb     │  (port 27017, internal only)
                    │  + volume    │
                    └──────────────┘
   All four containers share the "app-network" bridge network.
```

## Part 1 — Test locally first

1. Copy the env templates and fill in real values:
   ```
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp admin/.env.example admin/.env
   ```
2. Build and start everything:
   ```
   docker compose up -d --build
   ```
3. Check status and health:
   ```
   docker compose ps
   docker compose logs -f backend
   ```
4. Visit `http://localhost:5173` (store), `http://localhost:5174` (admin),
   `http://localhost:4000` (API — should show "API Working").
5. Restart-resilience check (rubric requirement):
   ```
   docker compose restart backend
   docker compose ps        # should show it healthy again shortly after
   ```

## Part 2 — Provision the EC2 instance

1. **Launch instance**: EC2 console → Launch instance.
   - AMI: Ubuntu Server 22.04 LTS
   - Instance type: `t2.medium` or larger (t2.micro tends to OOM during `npm install`/`vite build` for 3 services)
   - Key pair: create/download a `.pem` key for SSH
   - Storage: 20+ GB gp3

2. **Security group** — open only what's needed:
   | Type       | Port | Source            | Purpose                  |
   |------------|------|--------------------|---------------------------|
   | SSH        | 22   | Your IP only       | Admin access              |
   | Custom TCP | 5173 | 0.0.0.0/0          | Storefront                |
   | Custom TCP | 5174 | 0.0.0.0/0          | Admin panel               |
   | Custom TCP | 4000 | 0.0.0.0/0          | Backend API               |

   Do **not** open port 27017 (Mongo) — it only needs to be reachable
   inside the Docker network, never from the internet.

3. **Connect**:
   ```
   ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
   ```

## Part 3 — Install Docker on the instance

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg

# Docker's official install script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Let ubuntu user run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Docker Compose plugin
sudo apt install -y docker-compose-plugin

docker --version
docker compose version
```

## Part 4 — Deploy the app

1. **Get the code onto the instance** — either `git clone` your repo, or `scp`
   the project folder:
   ```bash
   git clone https://github.com/<your-username>/thakare-clothing.git
   cd thakare-clothing
   ```

2. **Recreate the `.env` files on the server** (never committed to git —
   copy/paste real values, or `scp` them over separately):
   ```bash
   nano backend/.env
   nano frontend/.env
   nano admin/.env
   ```

3. **Important**: `VITE_BACKEND_URL` is compiled into the frontend/admin
   JS bundle at build time. Set it to your EC2 public IP before building:
   ```
   VITE_BACKEND_URL="http://<EC2_PUBLIC_IP>:4000"
   ```
   Then update `docker-compose.yml`'s `build.args.VITE_BACKEND_URL` for
   `frontend` and `admin` to the same value (or export it as an env var
   and reference `${VITE_BACKEND_URL}` in compose — either works).

4. **Build and run**:
   ```bash
   docker compose up -d --build
   ```

5. **Verify**:
   ```bash
   docker compose ps
   curl http://localhost:4000/
   ```
   Then from your own machine, visit:
   - `http://<EC2_PUBLIC_IP>:5173` — storefront
   - `http://<EC2_PUBLIC_IP>:5174` — admin panel

## Part 5 — Health checks & logging (rubric requirement)

- All four services have `HEALTHCHECK`/`healthcheck:` blocks — check with:
  ```bash
  docker compose ps
  docker inspect --format='{{json .State.Health}}' thakare-backend
  ```
- Centralized logs per service:
  ```bash
  docker compose logs -f backend
  docker compose logs -f mongodb
  docker compose logs --tail=100 frontend
  ```
- Restart policy is `unless-stopped` on every service, so a reboot of the
  EC2 instance or a container crash brings everything back automatically.
  Test it:
  ```bash
  sudo reboot
  # after it comes back up:
  ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
  docker compose ps
  ```

## Part 6 — Screenshots to capture for submission

- `docker compose ps` showing all 4 containers `Up (healthy)`
- The storefront and admin panel loaded in a browser via the EC2 public IP
- `docker compose logs backend` showing "DB Connected" and "Server started on PORT : 4000"
- The EC2 security group inbound rules page

## Troubleshooting

- **Backend can't reach Mongo**: confirm `MONGODB_URI=mongodb://mongodb:27017/thakare-ecom`
  (service name `mongodb`, not `localhost` — containers resolve each other by service name).
- **Frontend loads but API calls fail (CORS/network error in browser console)**:
  usually means `VITE_BACKEND_URL` was baked in with `localhost` instead of
  the EC2 public IP — rebuild the image after fixing the `.env`/build arg.
- **Out of memory during build on a small instance**: build images with
  `docker compose build` one service at a time, or temporarily add swap:
  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  ```
