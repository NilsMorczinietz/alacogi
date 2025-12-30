# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy other necessary files if needed
COPY --from=builder /app/nest-cli.json ./nest-cli.json

EXPOSE 3000

# Start the application
CMD ["node", "dist/src/main.js"]
