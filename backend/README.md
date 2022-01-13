# Society of Women Journalist - Capstone II Project

## Table of Contents

- [Society of Women Journalist - Capstone II Project](#society-of-women-journalist---capstone-ii-project)
  - [Table of Contents](#table-of-contents)
  - [Technology](#technology)
  - [Commands](#commands)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)

## Technology

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- **Validation**: request data validation using [validator](https://github.com/validatorjs/validator.js)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **API documentation**: with [Postman](https://www.postman.com/)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [node](https://nodejs.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
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
 |--config\         # Environment variables and logging
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--app.js          # Express app
```

## API Documentation

List of available routes:

**Auth routes**:\
`POST /api/auth/signup` - register\
`POST /api/auth/login` - login\
`POST /api/auth/prune` - remove all user account [DANGER]

**Person routes**:\
`POST /api/persons/create` - create a person\
`GET /api/persons/list` - get all persons\
`GET /api/persons/get/:personID` - get person\
`PATCH /api/persons/edit/:personID` - update person\
`DELETE /api/persons/delete/:personID` - delete person