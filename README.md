# Netguru

[![Node.js CI](https://github.com/J3ykob/Netguru/actions/workflows/node.js.yml/badge.svg)](https://github.com/J3ykob/Netguru/actions/workflows/node.js.yml)

## API Documentation

### User authorization
## **`POST /auth`**
Used to obtain the jwt token, which is an authentication method used by this API. JWT must be supplid with every request to protected endpoints: `/movies` in the `Autorization` header

#### Request schema

```
   body: {
      username: String, // user's username used to login
      password: String  // user's password used to login
   }
```

#### Example response
```
   token: {
      [TOKEN]   // token with encoded user's data
   } 
```

#### Error messages

`invalid username or password` the user's data was not found in the database, try checking the spelling of either username or password

## Movies endpoint
## **`POST /movies`**

Upload a new movie to the movies database. Provide movie title in the request's body, and the API will automatically find it on the OMDB and add any additional information.


#### Request schema
```
   headers: {
      Authorization: Bearer [TOKEN] // token obtained on login
   }
   
   
   body: {
      title: String // title of the movie we want to add to our database
   }
```
#### Example response
```
   {
      "id": 123,
     "title": "Mission: Impossible - Ghost Protocol",
     "year": "2011",
     "genre": "Action, Adventure, Thriller",
     "director": "Brad Bird",
     "createdAt": "2022-01-17T11:41:24.795Z",
     "_id": "XqF1rIUbp9iBM3j2"
   }
```

#### Error messages

`invalid token` provided token is invalid or expired, try re-logging to the application to get a new token

`missing authorization header` authorization header was not found in the request

`You have reached your limit of 5 movies` user's role doesn't allow to upload more than 5 movies per month, try upgrading the account from 'basic' to 'premium'

`You already have this movie` movie with this title is already in the database, try changing the title or be more specific

`Movie not found` movie was not found in the OMDB databse, try searching up a different movie


## **`GET /movies`**

Used to get all the movies uploaded by the currently logged-in user.


#### Request schema
```
   headers: {
      Authorization: Bearer [TOKEN] // token obtained on login
   }
```
#### Example response
```
   [
       {
           "id": 123,
           "title": "Elko",
           "year": "2012",
           "genre": "Short, Drama",
           "director": "Alexander Yan",
           "createdAt": "2022-01-17T11:52:10.004Z",
           "_id": "Mbfb8rquFttfp3b1"
       },
       {
           "id": 123,
           "title": "Mission: Impossible - Ghost Protocol",
           "year": "2011",
           "genre": "Action, Adventure, Thriller",
           "director": "Brad Bird",
           "createdAt": "2022-01-17T11:41:24.795Z",
           "_id": "XqF1rIUbp9iBM3j2"
       },
    ]
```

#### Error messages
`invalid token` -||-

`missing authorization header` -||-


## Run the API service locally

1. Clone this repository
2. Run from root dir

```
npm install
```

```
JWT_SECRET=secret APP_PORT=8080 docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```


## Technology stack
- Node.js
- Express.js
- NeDB (simulating MongoDB)
- Jest.io
- Axios
