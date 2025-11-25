# Stage 1: Build the React app
FROM node:20 AS build

# Set working directory
WORKDIR /usr/src/app

# Add node_modules/.bin to PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install --force

# Copy the rest of the app and build
COPY . ./
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build to Nginx folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
