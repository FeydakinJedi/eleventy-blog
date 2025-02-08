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

# Install the blog dependencies
RUN npm install @11ty/eleventy
RUN npm install serve

# Build the blog using Eleventy
RUN npx @11ty/eleventy

# Expose the port that the server will run on
EXPOSE 8080

# Set the default command to serve the blog
CMD ["npx", "serve", "-p", "8080", "_site"]
