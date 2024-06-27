# Response codes and errors

The Literary Quotes API uses standard HTTP response codes to indicate the success or failure of a request. Response codes are returned in the HTTP response headers.

A successful request returns an array of Quote objects, or a RandomQuote object. When an error occurs, the API returns a JSON response with details about the error.

The API uses the following HTTP response codes and error messages:

| Code | Error | Details |
|------|-------|---------|
| [`200`](#200-ok) | `OK` | Indicates the request was successful and the response body contains the requested data. |
| [`400`](#400-bad-request) | `bad_request` | The request could not be understood and may have incorrect parameters. Make sure your query parameters are correct. |
| [`401`](#401-unauthorized) | `unauthorized` | Authentication failed. Make sure your request includes the Authorization header and that you're using the correct Base64-encoded username and password. |
| [`404`](#404-not-found) | `not_found` | No quotes match the provided parameters. The resource might not exist or it might be unavailable. |
| [`429`](#429-too-many-requests) | `too_many_requests` | You have exceeded the maximum number of requests. The limit will reset in 60 seconds and you can try again. |
| [`500`](#500-internal-server-error) | `internal_server_error` | An unexpected error occurred. Please try again later. If the problem persists, contact Support.|

### 200 OK

The request was successful and the server responded with the requested quote or array of quotes.

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status_code": 200,
  "data": {
      "id": 1,
      "author": "Virginia Woolf",
      "author_id": 18,
      "work": "A Room of One's Own",
      "work_id": 69197,
      "category": "Nonfiction",
      "genre": ["Essays", "Feminism"],
      "publish_date": "1929-10-24",
      "quote_length": 120,
      "source": "https://www.gutenberg.org/ebooks/69197",
      "quote": "Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind."
  }
}
```

### 400 Bad Request

The request was malformed or contained invalid [parameters](../guides/query-paramaters.md).

**Example JSON Response**:

```http
HTTP/1.1 429 Bad Request
Content-Type: application/json
{
  "code": 400,
  "error": "bad_request",
  "details": "The request could not be understood and may have missing or incorrect content or parameters. Make sure your query parameters are correct."
}
```

different one specially showing parameters that can be used:

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'bad_request',
      details: `Invalid query parameter. Allowed parameters are: ${allowedParams.join(', ')}`
    });


### 401 Unauthorized

[Authentication](../guides/authorization.md) failed due to invalid or missing credentials.

**Example JSON Response**:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
{
  "code": 401,
  "error": "unauthorized",
  "details": "Authentication failed. Make sure your request includes the Authorization header and that your username and password are correct and Base64 encoded."
}
```

### 404 Not found

The requested resource or [endpoint](../guides/endpoints.md) does not exist.

**Example response**:

```http
HTTP/1.1 404 Not found
Content-Type: application/json
{
  "code": 404,
  "error": "not_found",
  "details": "No quotes match the provided query parameters. The resource might not exist or it might be unavailable."
}
```

### 429 Too Many Requests

The [rate limit](../guides/rate-limits.md) has been exceeded.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json
{
  "code": 429,
  "error": "too_many_requests",
  "details": "You have exceeded the maximum number of requests. Please wait for 60 seconds before making another request."
}
```

### 500 Internal Server Error

The server encountered an unexpected condition that prevented it from fulfilling the request.

**Example JSON Response**:

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
{
  "code": 500,
  "error": "internal_server_error",
  "details": "An unexpected error occurred. Please try again later. If the problem persists, contact support."
}
```
