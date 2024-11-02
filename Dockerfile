# Use a multi-stage build
# Stage 1: Build the application
FROM node:20 AS builder

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the final image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
