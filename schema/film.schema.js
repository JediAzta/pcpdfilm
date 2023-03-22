module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/film",
  "title": "Film",
  "description": "Film Data for Sample Film Company",
  "type": "object",
  "properties": {
    "title": {
      "description": "Film Title",
      "type": "string"
    },
    "year": {
      "description": "Film release year",
      "type": "string"
    },
    "runtime": {
      "description": "Film Runtime in minutes",
      "type": "integer",
      "minimum": 0
    },
    "language": {
      "description": "Language available",
      "type": "string"
    },
    "genre": {
      "description": "Film Genre",
      "type": "string"
    },
    "director": {
      "description": "Film Director(s)",
      "type": "string"
    },
    "poster": {
      "description": "Film Poster",
      "type": "uri"
    }
  }, "required": ["title", "year", "runtime", "language", "genre", "director", "poster"]
}