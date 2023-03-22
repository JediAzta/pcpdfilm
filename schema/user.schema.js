module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "User Info",
  "description": "User for sample film company",
  "type": "object",
  "properties": {
    "uname": {
      "description": "username",
      "type": "string"
    },
    "password": {
      "description": "password",
      "type": "string"
    },
    "valid": {
      "description": "date of registration",
      "type": "string"
    },
    "lastname": {
      "description": "User's Last Name",
      "type": "string"
    },
    "firstname": {
      "description": "User's First Name",
      "type": "string"
    },
    "type": {
      "description": "Type of the user (1 - staff; 2 - customer",
      "type": "integer",
      "minimum":1,
      "maximum":2          
    }
  }
}