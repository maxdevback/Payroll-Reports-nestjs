### Overview

It's a simple application that has authorization and authentication via session cookie. There is an admin (one) and there are regular users. The first user who registers will be the admin. The regular can create payrolls that contain his information and qualifications and his salary. The admin can approve these payrolls. If they are approved, then they are included in the sample. There is a sample, user can specify his data and get all payrolls with similar data.

## Installation

```bash
$ npm install
```

## Running the app

fill th env file in root directory

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## EndPoints

#

// Get auth Data
GET http://localhost:3000/user/auth

#

// Register
POST http://localhost:3000/user/register
Content-Type: application/json

```
{
  email: string,
  username: string,
  password: string
}
```

#

// Login
POST http://localhost:3000/user/login
Content-Type: application/json

```
{
username: string,
password: string
}
```

#

// Logout
DELETE http://localhost:3000/user/logout

#

// Delete user by id
DELETE http://localhost:3000/user/1

#

// Patch user by password and new fields
PATCH http://localhost:3000/user
Content-Type: application/json

```
{
username?: string,
email?: string,
newPassword?: string,
password: string
}
```

#

//Create payroll
POST http://localhost:3000/payroll
Content-Type: application/json

```
{
  sector_of_economics: number,

  position: string,

  country: string,

  salary_in_year: number,

  age: number,

  experience_in_years: number
}
```

#

// Approve. Only admin
PATCH http://localhost:3000/payroll/approve/2

#

// Get by Id
GET http://localhost:3000/payroll/1

#

// Get all by query
GET http://localhost:3000/payroll

//Query

```
{
  sector_of_economics: string,
  position: string,
  country: string,
  age: number
  experience_in_years: number
}
```

#

// Delete payroll
DELETE http://localhost:3000/payroll/2

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
