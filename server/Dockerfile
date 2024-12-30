# Base image
FROM node:20-alpine AS development

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json tsconfig.json jest.config.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY ./src ./src

RUN npm run build

CMD ["npm", "run", "dev"]

# Stage 2: Create a production image
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=development /usr/src/app/package*.json tsconfig.* ./
COPY --from=development /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm install --production
CMD ["npm", "run", "start"]


