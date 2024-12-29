# Article Server

## Technologies Used:

- **TypeScript**
- **Node.js**
- **Mongo DB**
- **Docker**
- **Docker Compose**

## Database:

![ERD](./pic/erd.png)

## Getting Started:

### Assigment Checkers:

To run the application and validate assignments, use:

- `docker-compose up`
  This command will build and start the application in a Docker container using the default docker-compose.yml.

### Develop:

To start the application in development mode, use the following command:

- `docker-compose -f docker-compose.dev.yml up`
  This uses the docker-compose.dev.yml file, which is typically configured for hot-reloading and development optimizations.

## libraries:

- **dotenv**
- **express**
- **mongoose**
- **morgan**
