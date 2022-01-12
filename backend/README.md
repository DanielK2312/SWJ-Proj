# Society of Women Journalist - Capstone II Project

## Table of Contents

- [Features](#technology)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## Technology

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [validator](https://github.com/validatorjs/validator.js)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **API documentation**: with [Insomnia](https://insomnia.rest/)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [node](https://nodejs.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **CI**: continuous integration with [Travis CI](https://travis-ci.org)
- **Docker support**
- **Code quality**: with [Codacy](https://www.codacy.com)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)


## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Docker:

```bash
# run docker container in development mode
npm run docker:dev

# run docker container in production mode
npm run docker:prod

```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

```

## Project Structure

```
src\
 |--config\         # Environment variables, logging, and JWT configuration
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--app.js          # Express app
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/auth/signup` - register\
`POST /api/auth/login` - login\
`POST /api/auth/prune` - remove all user account [DANGER]

**Person routes**:\
`POST /api/secure/persons` - create a person\
`GET /api/secure/persons` - get all persons\
`GET /api/secure/persons/:personID` - get person\
`PATCH /api/secure/persons/:personID` - update person\
`DELETE /api/secure/persons/:personID` - delete person