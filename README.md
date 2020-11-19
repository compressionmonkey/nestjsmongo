## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Usage 
To be able to use any api or action, an authentication token is required. To gain an authentication token, login or register your account.

```bash
# login 
http://localhost:3000/login
Request Body{
  username: "",
  password: ""
}

# this should return a forbidden request for users who don't exist while if a given user exist, the following should be returned
{
    "id": 13,
    "username": "kelden",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoia2VsZGVuIiwiaWF0IjoxNTk5ODA5MjIwLCJleHAiOjE2MDA0MTQwMjB9.FTHiLepXQ7zld1Tj5oPtPCxbVmJZ2TTSyplF61wc_7o"
} 
# for registering a new user
http://localhost:3000/register
Request Body{
  username: "",
  password: "",
  confirm_password: "",
  email: ""
}
# this should return a forbidden request for users who already exist while if a given account does not exist, the following should be returned
{
    "id": 19,
    "username": "abcd",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJuYW1lIjoiYWJjZCIsImlhdCI6MTU5OTgwOTcwMiwiZXhwIjoxNjAwNDE0NTAyfQ.IwHt1YcDPsAJWTUOAKN-ygCeBeAxbCY9Z8cK1vjUqR0"
}
```

While in db, it should start to look like this:
<a href="https://ibb.co/HHh42FX"><img src="https://i.ibb.co/71kCzYb/c.jpg" alt="c" border="0"></a> 

If you notice an encrypted password and confirmed_password, this is done so to improve security. Any request from front end must be encrypted accordingly.

Once logged in, we need to pass the following headers to be able to execute an action or api:
```bash
header{
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoia2VsZGVuIiwiaWF0IjoxNTk5NjQwMjQ3LCJleHAiOjE2MDAyNDUwNDd9.5xQPzsx3iyJipHLZ1bIzuOdobmLRIfewuBV91FEZUHI"
}
# The word Bearer is required while token can differ accordingly to user logged in or registered. If right details are not passed in, user will not be allowed to perform any actions. 
```

For a request to be made from front end, axios or fetch can be used. If front end only requires to send text or json to backend, then fetch can be used. For any API calls that may require images/videos i.e formdata, axios provides better support and handling.