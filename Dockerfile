# ====== Base Stage ======
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only when package.json or yarn.lock changes
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build the project
RUN yarn build


# ====== Production Stage ======
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
