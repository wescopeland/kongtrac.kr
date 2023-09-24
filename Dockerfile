# Use the specified Node.js version
FROM node:12.11.1

# Set environment variables (adjust as needed)
ENV PORT 8080

# Create a directory to hold the application code inside the image
WORKDIR /usr/src/app

# Install Angular CLI globally in the image to use its commands
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Build the project (with Angular CLI)
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run the start script
CMD [ "npm", "start" ]
