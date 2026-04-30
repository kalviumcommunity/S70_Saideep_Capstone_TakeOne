# Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies including dev dependencies
RUN npm ci

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Only copy over the production dependencies and necessary files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /usr/src/app/config ./config
COPY --from=builder /usr/src/app/jobs ./jobs
COPY --from=builder /usr/src/app/middleware ./middleware
COPY --from=builder /usr/src/app/models ./models
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/utils ./utils
COPY --from=builder /usr/src/app/passport.js ./
COPY --from=builder /usr/src/app/server_modern.js ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Security: Run as non-root user
USER node

# Start the application using modern server entry point
CMD ["node", "server_modern.js"]
