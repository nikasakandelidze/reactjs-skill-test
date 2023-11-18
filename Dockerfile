# Step 1: Build the React application

# Use an official Node.js runtime as a parent image
FROM node:16 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app using Nginx

# Use an official Nginx runtime as a parent image for serving the built app
FROM nginx:alpine

# Copy built assets from the build stage to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
