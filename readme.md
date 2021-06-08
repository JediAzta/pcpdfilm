# Film API 
For student project exercise

### Endpoint List
- [/infofilm/:title](#infofilm) - Retrieve the Film information from Public Datatbase
- [/imfilm](#imfilm) - Import the Film information to the database
- [/film/:fid](#film) - Query the film information
- [/list](#list) - List all film information
- [/auth](#auth) - User Login
- [/apply](#apply) - Create new user (Currently Not available)
- [/update](#update) - Update user password (Currently Not available)

### Version History

* 1.0.0 - First Release 
* 1.0.1 - Minor Update
* 1.0.2 - Readme is ready
* 1.0.3 - Readme is updated
* 1.0.4 - Debug Login API 
---

## Endpoint Description
### **infofilm**
Endpoint: **/infofilm/:title**

Method:  **GET**

Parameter: [:title] - Film Title (Full Name)

Description: Retrieve the Film information from Public Datatbase (Non-English characters are not accepted)

Returns: **JSON**

Samples: 
```javascript
{
    "title":"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    "year":"1964",
    "released":"29 Jan 1964",
    "runtime":"95 min",
    "language":"English, Russian",
    "genre":"Comedy",
    "director":"Stanley Kubrick",
    "poster":"https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
}
```

---

### **imfilm**
Endpoint: **/imfilm**

Method:  **POST**

Request Body Sample: 
```javascript
{
    "s": "sasdqw34fgsef",
    "film":{
        "title":"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        "year":"1964",
        "released":"29 Jan 1964",
        "runtime":95,
        "language":"English, Russian",
        "genre":"Comedy",
        "director":"Stanley Kubrick",
        "poster":"https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    }
}
```
- s: The token by the login information
- film: The detail information of the film to be stored in the database

Description: Retrieve the Film information from Public Datatbase (Non-English characters are not accepted)

Returns: **JSON**

Samples: 
```javascript
{
    "status":201,
    "description":""
}
```
or 

* Status **500** if there is any syntax error
* Status **403** if the token is not valid for insert data

---

### **film**
Endpoint: **/film/:fid**

Method:  **GET**

Parameter: [:fid] - Film ID from the database (Object ID (_id), refer to [list](#list))

Description: Retrieve the Film information from the Shop's Datatbase 

Returns: **JSON**

Samples: 
```javascript
[{
        "_id": "sadffaser5t234qasga",
        "title":"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        "year":"1964",
        "released":"29 Jan 1964",
        "runtime":95,
        "language":"English, Russian",
        "genre":"Comedy",
        "director":"Stanley Kubrick",
        "poster":"https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },...]
```
or Status 500 if there is any syntax error


---

### **list**
Endpoint: **/list**

Method:  **GET**

Description: Retrieve All Film information from the Shop's Datatbase 

Returns: **JSON**

Samples: 
```javascript
[{
        "title":"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        "year":"1964",
        "released":"29 Jan 1964",
        "runtime":95,
        "language":"English, Russian",
        "genre":"Comedy",
        "director":"Stanley Kubrick",
        "poster":"https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },...]
```
or Status 500 if there is any syntax error

---

### **auth**
Endpoint: **/auth**

Method:  **POST**

Request Body Sample: 
```javascript
{
    "user": "Username",
    "pwd": "1234567890"
}
```

Description: Login to the shop, return with a token 

Returns: **JSON**

Samples: 
```javascript
{
    "key": "sadswe2314d",
    "role": 0
}
```
role: 1 - staff; 2 - customer

or 
* Status 500 if there is any syntax error
* Status 401 if the username or password is incorrect

---

### **apply**
Endpoint: **/apply**

Method:  **POST**

Request Body Sample: 
```javascript
```

Description: (Not implemented yet) Create a new user

Returns: **JSON**

Samples: 
```javascript
```


* Status 501 

---

### **update**
Endpoint: **/update**

Method:  **PUT**

Request Body Sample: 
```javascript
```

Description: (Not implemented yet) Update user information

Returns: **JSON**

Samples: 
```javascript
```


* Status 501 

