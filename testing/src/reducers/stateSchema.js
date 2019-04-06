// JSON Schema generated using: https://jsonschema.net/

// Our redux state looks like this:
// {
//     "comments": [
//         "Comment 1",
//         "Comment 2"],
//     "isAuthenticated": false
// }

export default {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "The Root Schema",
  "required": [
    "comments",
    "isAuthenticated"
  ],
  "properties": {
    "comments": {
      "$id": "#/properties/comments",
      "type": "array",
      "title": "The Comments Schema",
      "items": {
        "$id": "#/properties/comments/items",
        "type": "string",
        "title": "The Items Schema",
        "default": "",
        "examples": [
          "Comment 1",
          "Comment 2"
        ],
        "pattern": "^(.*)$"
      }
    },
    "isAuthenticated": {
      "$id": "#/properties/isAuthenticated",
      "type": "boolean",
      "title": "The Isauthenticated Schema",
      "default": false,
      "examples": [
        false
      ]
    }
  }
}