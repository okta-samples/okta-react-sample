# Using Base Alpine based Node Image 
FROM node:alpine

# Setting the working directory for the application
WORKDIR /app

# Install dependencies
COPY package.*json ./
RUN npm install

# Copy applications from current directory (except items in .dockerignore) to the current WORKDIR (/app)
COPY . .

# Build the application
RUN npm run build

# Install serve package
RUN npm install -g serve

# Serve the application
CMD ["serve", "-s", "dist", "-l", "3000"]
