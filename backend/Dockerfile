# Use Node 20 (LTS)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose backend port
EXPOSE 5500

# Start the backend server
CMD ["npm", "start"]
