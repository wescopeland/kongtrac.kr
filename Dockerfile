# Multi-stage build for smaller image
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
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/server.js ./
# Copy any other server files needed

EXPOSE 8080
CMD ["npm", "start"]
