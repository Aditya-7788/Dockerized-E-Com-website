FROM node:20-alpine

WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy app source
COPY . .

ENV PORT=4000
EXPOSE 4000

# Basic container health check hitting the root route ("API Working")
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:4000/ || exit 1

CMD ["node", "server.js"]
