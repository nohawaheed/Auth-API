# Auth API

A REST API built with **NestJS, TypeScript, and PostgreSQL** that provides user registration and login functionality. The API uses bcrypt for password hashing and JSON Web Tokens (JWT) for authentication.

## Features

- **User registration** — Create an account with first name, last name, age, email, and password.
- **User login** — Authenticate using email and password.
- **Password security** — Hash passwords using bcrypt before storing them.
- **JWT authentication** — Generate a JWT after successful login.
- **Input validation** — Validate request data using `class-validator`, `class-transformer`, and NestJS's `ValidationPipe`.
- **API documentation** — Explore and test endpoints through Swagger UI.
- **Database integration** — PostgreSQL hosted on Neon, accessed using Prisma.
- **Frontend integration** — Designed to work with an Angular frontend.

## Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Neon](https://neon.tech/) — Hosted PostgreSQL database
- [Prisma](https://www.prisma.io/) — Database toolkit and ORM
- [Swagger / OpenAPI](https://swagger.io/) — API documentation
- JWT — `@nestjs/jwt`
- bcrypt — Password hashing
- `class-validator` and `class-transformer` — Request validation
- [snapdeploy](https://snapdeploy.dev/) — Planned API deployment platform

## API Documentation

The API uses Swagger UI to document endpoints, request bodies, and responses.

- **Local Swagger UI:** [http://localhost:3000/docs](http://localhost:3000/docs)
- **Production Swagger UI:** [https://authentication-api-c9a13.containers.snapdeploy.app/docs](https://authentication-api-c9a13.containers.snapdeploy.app/docs)

The local documentation is available when the application is running. The production URL will be added after deployment.

## API Endpoints

The local API base URL is:

`http://localhost:3000/api/v1`

| Method | Endpoint         | Description              | Success status |
| ------ | ---------------- | ------------------------ | -------------- |
| GET    | `/`              | API information          | `200 OK`       |
| POST   | `/auth/register` | Register a new user      | `201 Created`  |
| POST   | `/auth/login`    | Log in and receive a JWT | `200 OK`       |

### Register a User

**Endpoint:** `POST /api/v1/auth/register`

Request body:

```json
{
  "first_name": "Noha",
  "last_name": "Waheed",
  "age": 25,
  "email": "noha@example.com",
  "password": "ExamplePass@123"
}
```

Successful response (`201 Created`):

```json
{
  "message": "success"
}
```

Possible errors:

- `400 Bad Request` — Invalid request data.
- `409 Conflict` — Email already registered.

### Log In

**Endpoint:** `POST /api/v1/auth/login`

Request body:

```json
{
  "email": "noha@example.com",
  "password": "ExamplePass@123"
}
```

Successful response (`200 OK`):

```json
{
  "message": "success",
  "token": "your-jwt-token"
}
```

Possible errors:

- `400 Bad Request` — Invalid request data.
- `401 Unauthorized` — Invalid email or password.

### API Information

**Endpoint:** `GET /api/v1`

Returns basic information about the API and a link to its documentation.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- A PostgreSQL database, such as a Neon project
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd auth-api
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the variables required by your application.

```env
DATABASE_URL="your_neon_database_connection_string"
DATABASE_URL_UNPOOLED="your_neon_unpooled_connection_string"
JWT_SECRET="your_secure_jwt_secret"
JWT_EXPIRES_IN="1d"
FRONTEND_URL="http://localhost:4200"
```

**Important:**

- Use the actual variable names expected by your Prisma and JWT configuration.
- Obtain your database connection strings from your Neon dashboard.
- `DATABASE_URL_UNPOOLED` is needed if your configured database workflow uses it.
- Generate a strong, private JWT secret.
- Never commit `.env` or expose credentials in your GitHub repository.

### 4. Prepare Prisma

This project uses Prisma 8 RC and Prisma Contracts, with a custom contract schema at:

`src/prisma/contract.prisma`

The Prisma configuration is defined in `prisma.config.ts`.

The project includes a contract generation script:

```bash
npm run contract:emit
```

This runs:

```bash
prisma contract emit
```

The workflow generates contract artifacts, including:

- `src/prisma/contract.json`
- `src/prisma/contract.d.ts`

Follow the project's configured Prisma workflow to initialize, verify, update, or migrate the database as needed. Use the commands appropriate for the installed Prisma version and project configuration rather than assuming the standard Prisma migration workflow applies.

### 5. Run the Application

Start the development server:

```bash
npm run start:dev
```

The API runs at:

`http://localhost:3000`

With the global API prefix configured, the authentication endpoints are available at:

- `http://localhost:3000/api/v1/auth/register`
- `http://localhost:3000/api/v1/auth/login`

Open [http://localhost:3000/docs](http://localhost:3000/docs) to explore and test the endpoints through Swagger UI.

## Available Scripts

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run start`         | Start the application              |
| `npm run start:dev`     | Start in watch mode                |
| `npm run build`         | Build the application              |
| `npm run start:prod`    | Run the production build           |
| `npm run contract:emit` | Generate Prisma contract artifacts |
| `npm run test`          | Run unit tests                     |
| `npm run test:e2e`      | Run end-to-end tests               |
| `npm run test:cov`      | Run tests with coverage            |

## Database Hosting — Neon

The project uses [Neon](https://neon.tech/) for hosted PostgreSQL.

To configure the database:

1. Create a Neon account.
2. Create a PostgreSQL project.
3. Copy the required connection strings from the Neon dashboard.
4. Add the appropriate connection strings to your local `.env` file.
5. Configure the same required variables in snapdeploy when deploying.

Keep database credentials private. Do not include real connection strings in documentation, source files, or commits.

## Deployment — snapdeploy.dev

The planned deployment setup uses **snapdeploy for the API** and **Neon for the database**.

### Deployment Steps

1. Push the project to GitHub.
2. Import the repository into [snapdeploy](https://snapdeploy.dev/).
3. Configure the environment variables required by the application.
4. Verify that the build and deployment configuration supports NestJS, Prisma 8 RC, and the contract-generation workflow.
5. Deploy the application.
6. Test the root endpoint, registration, login, database connectivity, and Swagger documentation.

Configure the required environment variables in snapdeploy, including:

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED`, if required by the configured workflow
- The JWT secret variable used by the application
- `JWT_EXPIRES_IN`
- `FRONTEND_URL`, set to the deployed frontend's origin

### Production URLs

Add the actual URLs after successful deployment:

- **API base URL:** `https://authentication-api-c9a13.containers.snapdeploy.app/docs/api/v1`
- **Swagger documentation:** `https://authentication-api-c9a13.containers.snapdeploy.app/docs`

Deployment is considered complete only after the deployed endpoints and database connection have been tested successfully.

## Frontend Integration

The API is designed to work with an Angular frontend.

For local development, the frontend typically runs at:

`http://localhost:4200`

Configure `FRONTEND_URL` to match the frontend's origin so the API can accept cross-origin requests.

The login endpoint returns a success message and a JWT. The frontend can use the token according to its authentication flow.

## Security Considerations

- Passwords are hashed before storage.
- Invalid login credentials return an unauthorized response.
- Request data is validated before reaching application logic.
- Environment variables and credentials must remain private.
- Use HTTPS in production.
- Use a strong JWT secret and configure its expiration appropriately.
