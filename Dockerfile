# Multi-stage build untuk production optimization
FROM node:24.13.0-alpine AS dependencies

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Build stage
FROM node:24.13.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install semua dependencies (termasuk dev)
RUN npm ci

# Copy source code
COPY . .

# Build aplikasi
RUN npm run build

# Production stage
FROM node:24.13.0-alpine AS production

WORKDIR /app

# Set environment
ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./

# Copy node_modules dari dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy .next dan public dari builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { if (res.statusCode !== 200) throw new Error(res.statusCode) })"

# Start aplikasi
CMD ["npm", "start"]
