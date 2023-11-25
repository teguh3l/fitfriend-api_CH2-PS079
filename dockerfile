# Use the official Node.js image as the base image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 8080

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Start MongoDB
CMD service mongodb start && npm start
