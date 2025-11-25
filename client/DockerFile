# Use Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json FIRST to take advantage of Docker caching
COPY ./package.json ./ 
COPY ./package-lock.json ./

# Install dependencies
RUN npm install --silent && npm cache clean --force

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
