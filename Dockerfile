# Build stage
FROM node:12.11.1 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:12.11.1-alpine
WORKDIR /usr/src/app
ENV PORT 8080

# Copy package files and install production deps only
COPY package*.json ./
RUN npm ci

# Copy built Angular app
COPY --from=builder /usr/src/app/dist ./dist

# Copy server files
COPY server.js ./
COPY server ./server

EXPOSE 8080
CMD ["npm", "start"]