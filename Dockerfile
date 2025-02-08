# Use an official Node.js image as the base
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the server will run on
EXPOSE 8080

# Run the command to build the Eleventy site
RUN npx @11ty/eleventy

# Run the command to start the server
CMD ["npx", "serve", "-p", "8080", "_site"]
