# Use an official Node.js image as the base
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Clone repository
RUN git clone https://github.com/FeydakinJedi/eleventy-blog . 

# Install the dependencies
RUN npm install -g @11ty/elevent

# # Copy the rest of the application code to the working directory
# COPY . .

# Expose the port that the server will run on
EXPOSE 8080

# Set the default command to serve the blog
# CMD ["npm", "start"]
CMD ["npx", "@11ty/eleventy", "--serve"]
