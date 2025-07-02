# Single stage - include everything
FROM node:12.11.1

# Set environment variables
ENV PORT 8080

# Create working directory
WORKDIR /usr/src/app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files
COPY package*.json ./

# Install ALL dependencies (both production and dev)
RUN npm install

# Copy all source files
COPY . .

# Build the Angular app
RUN npm run build

# Expose port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]