# =========================
# Base
# =========================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# =========================
# Dev stage (THIS MUST BE NAMED dev)
# =========================
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

# =========================
# Build stage
# =========================
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# =========================
# Prod stage
# =========================
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]
