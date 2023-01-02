# Stori
Stori Challenge Newsletters

## Description

This project is in charge of create single or massive recipients and create and send newsletter to send recipients in a web app

This project was developed with

-  Node 18 (https://nodejs.org/)
-  ReactJs (https://es.reactjs.org/)
-  Mongodb (https://www.mongodb.com/)
-  Docker (https://www.docker.com/)

## Cloning the app
```bash

$ git clone https://github.com/hectorferrerj/challenge-email.git

```

## Install dependencies

For backend and frontend you should be in the properly path, for example "/frontend" then execute:

```bash

$ npm install

```

# Create an .env at backend path with these params to run local:
```bash
PORT=3008 => comment to connect Docker
DB_HOST='mongodb://127.0.0.1:27017/stori-db' => comment to connect Docker
```

# Run Backend

After install all dependencies, execute in backend route:
```bash

$ npm start

```

# Run Frontend

Once backend is up, execute in frontend route:
```bash

$ npm start

```

# Local
For local go to localhost:3000

## App

You should create a new user to login the information its inside of collections post '/stori/api/user' , after that you will be redirect.
https://api.postman.com/collections/3736213-7d91276d-f5af-4cd0-984b-1a11a3ce2d83?access_key=PMAT-01GNT7PZB2H60P7JXY1EPE13JQ

```bash
http://localhost:3008/stori/api/user
{
      "name": "Eduardo",
      "lastName": "Jimenez",
      "email": "eduardo@mail.com",
      "password": "pass12345",
      "isAdmin": true
}

```

Afterwards, a general menu will be displayed where the recipients must register, then the newsletters and at the end you can send them

# Docker

First validate that the ports 3001 and 3008 are not occupied and PORT of backend env is default on port 3000 then run in each directory
challenge-email/backend

```bash

docker-compose build
docker-compose up

```
challenge-email/frontend
```bash

docker-compose build
docker-compose up

```
