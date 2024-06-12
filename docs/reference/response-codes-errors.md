# Response codes and errors

When a client request is successful or an error occurs, the response header will contain a standard HTTP status code and message. The response body will also contain the HTTP status code and message along with a description.

## API responses and examples

The Literary Quotes API uses the following HTTP response codes and error messages:

| Status Code | Message                | Description                                                                                   |
|-------------|------------------------|-----------------------------------------------------------------------------------------------|
| [200](placeholder-link)         | OK                     | The request was successful and the server responded with the requested data.                  |
| [400](placeholder-link)          | Bad Request            | The server could not understand the request due to invalid syntax.                            |
| [401](placeholder-link)          | Unauthorized           | Authentication is required and has failed or has not yet been provided.                       |
| [403](placeholder-link)          | Forbidden              | The server understood the request but refuses to authorize it.                                |
| [404](placeholder-link)          | Not Found              | The requested resource could not be found on the server.                                      |
| [500](placeholder-link)          | Internal Server Error  | The server encountered an unexpected condition that prevented it from fulfilling the request. |
| [503](placeholder-link)          | Service Unavailable    | The server is not ready to handle the request, typically due to maintenance or overload.      |

Below are common HTTP status codes used in the Literary Quotes API, including JSON examples and explanations of what could cause these responses.

### 200 OK

**Description**: The request was successful, and the server responded with the requested data.

**Example JSON Response**:

```json
{
  "status_code": 200,
  "data": {
    "id": 1,
    "author": "Ralph Waldo Emerson",
    "work": "The Essays of Ralph Waldo Emerson",
    "genre": "Essays",
    "publish_date": "1841",
    "quote": "Life is a train of moods like a string of beads..."
  }
}
```

**Causes**:
- A valid request to fetch quotes or specific quote data was made.

### 400 Bad Request

**Description**: The server could not understand the request due to invalid syntax.

**Example JSON Response**:

```json
{
  "status_code": 400,
  "message": "Bad Request",
  "description": "The request could not be understood or was missing required parameters."
}
```

**Causes**:
- Missing required query parameters.
- Malformed JSON in the request body.
- Invalid query parameter values (e.g., non-numeric value for a numeric field).

### 401 Unauthorized

**Description**: Authentication is required and has failed or has not yet been provided.

**Example JSON Response**:

```json
{
  "status_code": 401,
  "message": "Unauthorized",
  "description": "Authentication failed. Please check your username and password."
}
```

**Causes**:
- Incorrect or missing authentication credentials.
- Credentials not base64-encoded properly.

### 403 Forbidden

**Description**: The server understood the request but refuses to authorize it.

**Example JSON Response**:

```json
{
  "status_code": 403,
  "message": "Forbidden",
  "description": "You do not have permission to access this resource."
}
```

**Causes**:
- The user does not have the necessary permissions for the resource.
- The account may be suspended or restricted.

### 404 Not Found

**Description**: The requested resource could not be found on the server.

**Example JSON Response**:

```json
{
  "status_code": 404,
  "message": "Not Found",
  "description": "The requested resource was not found."
}
```

**Causes**:
- The resource ID does not exist.
- The endpoint is incorrect.

### 500 Internal Server Error

**Description**: The server encountered an unexpected condition that prevented it from fulfilling the request.

**Example JSON Response**:

```json
{
  "status_code": 500,
  "message": "Internal Server Error",
  "description": "An unexpected error occurred on the server."
}
```

**Causes**:
- An unhandled exception on the server.
- A problem with the server configuration or resource availability.

### 503 Service Unavailable

**Description**: The server is not ready to handle the request, typically due to maintenance or overload.

**Example JSON Response**:

```json
{
  "status_code": 503,
  "message": "Service Unavailable",
  "description": "The server is currently unable to handle the request due to temporary overload or scheduled maintenance."
}
```

**Causes**:
- The server is down for maintenance.
- The server is temporarily overloaded.
