# My Fancy ToDo Server
My Todos App is an application to manage your todos. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
- 'POST /register'
- 'POST /login'
- 'POST /login'
- 'POST /todos'
- 'GET /todos'
- 'GET /todos/:id'
- 'PUT /todos/:id'
- 'PATCH /todos/:id'
- 'DELETE /todos/:id'

### POST /register

> Create new user

_Request Body_
```json
{
    "email": "string" ,
    "password": "string"
}
```

_Response (201 - create)_
```json
{
    "id": 1,
    "email": "string" ,
    "password": "string",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (500 - Internal Server Error)_

---

### POST /login

> Create new user

_Request Body_
```json
{
    "email": "string" ,
    "password": "string"
}
```

_Response (200 - create)_
```json
{
    "id": 1,
    "email": "string" ,
    "password": "string",
    "access_token": "string",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Wrong email/password"
}
```
_Response (500 - Internal Server Error)_

---
### POST /todos

> Create new todo

_Request Body_
```json
{
    "title": "wake up" ,
    "description": "wake up at 05.00 a.m",
    "status": false,
    "due_date": "1 nov 2020",
}
```
_Request Headers_
access_token (string)

_Response (201 - create)_
```json
{
    "id": 1,
    "title": "wake up" ,
    "description": "wake up at 05.00 a.m",
    "status": false,
    "due_date": "2020-10-31T17:00:00.000Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
_Response (500 - Internal Server Error)_

---
### GET /todos

> get all todos

_Request Headers_
access_token (string)

_Response (200)_
```json
[
    {
        "id": 1,
        "title": "wake up" ,
        "description": "wake up at 05.00 a.m",
        "status": false,
        "due_date": "2020-10-31T17:00:00.000Z",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
    }
]
```

_Response (500 - Internal Server Error)_

---
### GET /todos/:id

> find todo by Id

_Request Headers_
access_token (string)

_Request Params_
```json
{
    "id": 1
}
```
_Response (200)_
```json
{
  "id": 1,
  "title": "wake up" ,
  "description": "wake up at 05.00 a.m",
  "status": false,
  "due_date": "2020-10-31T17:00:00.000Z",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_

---
### PUT /todos/:id

> update/replace todo

_Request Headers_
access_token (string)

_Request Params_
```json
{
    "id": 1
}
```
_Request Body_
```json
{
    "title": "have a lunch" ,
    "description": "vegetable",
    "status": false,
    "due_date": "1 nov 2020",
}
```

_Response (200)_
```json
{
    "id": 1,
    "title": "have a lunch" ,
    "description": "vegetable",
    "status": false,
    "due_date": "2020-10-31T17:00:00.000Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_


### PATCH /todos/:id

_Request Headers_
access_token (string)

> update/modify todo

_Request Params_
```json
{
    "id": 1
}
_Request Body_
```json
{
    "status": true,
}
```
_Response (200)_
```json
{
  "status": true,
}
```
_Response (400 - Bad request)_
```json
{
  "message": "Validation errors"
}
```
_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_


### DELETE /todos/:id

> Delete Todo

_Request Headers_
access_token (string)


_Request Params_
```json
{
    "id": 1
}
```
_Response (200)_
```json
{
  "message": "todo success to deleted"
}
```


_Response (404 - Not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_