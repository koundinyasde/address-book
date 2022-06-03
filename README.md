# ADDRESS-BOOK

## Getting started

### Prerequisites

1. Git [Installation guidelines](https://support.atlassian.com/bitbucket-cloud/docs/install-and-set-up-git/)
2. Node: any 12.x version starting with v12.0.0 or greater [Installation package](https://nodejs.org/dist/v12.22.3/)
3. MongoDb [Installation package](https://www.mongodb.com/docs/manual/installation/)
    - Refer this to start the mongodb server
4. A clone of the project on your local machine

### Installation

1. `cd address-book` to go into the project root
2.  `npm install` to install the npm dependencies

### Running locally

1. `npm start` to start the hot-reloading development server
2. Api endpoints
    - Refer app.js in parent folder for base path
    - Refer routes folder for all the existing Endpoints
3. Hit your favorite end point from the [postman](https://www.postman.com/downloads/)

### You can use below payload for test apis which require payload

```
{
    "first_name": "chandra",
    "last_name": "test 3",
    "email": "chandra@gmail.com",
    "mobile": 9999999999,
    "place": "hyderabad",
    "age": 20,
    "company": "DXC Technologies"
}
```