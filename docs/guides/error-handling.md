---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Error handling

Proper error handling is crucial for creating robust applications that interact with APIs. This guide explains the types of errors you might encounter when using the Literary Quotes API, how to interpret error messages, and best practices for handling errors in your application.

## Introduction to API error handling

When an API request fails, the server returns an HTTP status code in the 4xx or 5xx range, along with a JSON response body containing more details about the error. Understanding these errors helps you debug issues and create a better user experience.

## Common error types in the Literary Quotes API

1. `400 Bad Request`: Invalid query parameters or malformed request
2. `401 Unauthorized`: Authentication failure
3. `404 Not Found`: Requested resource doesn't exist
4. `429 Too Many Requests`: Rate limit exceeded
5. `500 Internal Server Error`: Unexpected server error

## How to interpret error messages

Error responses from the Literary Quotes API follow this structure:

```json
{
  "code": 400,
  "error": "bad_request",
  "details": "The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors."
}

code: The HTTP status code
error: A machine-readable error identifier
details: A human-readable description of the error

Best practices for handling errors in your application

Always check the HTTP status code of the response before processing the body
Implement error handling for all API calls
Log errors for debugging purposes
Provide user-friendly error messages in your application
Implement retry logic with exponential backoff for transient errors (e.g., rate limiting)
Handle different types of errors appropriately (e.g., authentication errors vs. server errors)

Examples of error scenarios and how to handle them
Authentication error
jsonCopy{
  "code": 401,
  "error": "unauthorized",
  "details": "Authentication failed. Make sure your request includes the Authorization header and that you're using the correct Base64-encoded username and password."
}
How to handle: Check if the user's credentials are correct and properly encoded. If using the X-Bypass-Auth header, ensure it's set correctly.
Rate limiting error
jsonCopy{
  "code": 429,
  "error": "too_many_requests",
  "details": "You have exceeded the maximum number of requests. The limit will reset in 60 seconds and you can try again."
}
How to handle: Implement a retry mechanism with exponential backoff. Use the Retry-After header to determine how long to wait before retrying.
Invalid query parameter
jsonCopy{
  "code": 400,
  "error": "bad_request",
  "details": "Invalid query parameter. Allowed parameters are: author, work, category, genre, publish_date, quote_length, sort, order, limit, page"
}
How to handle: Check your query parameters for typos or invalid values. Refer to the API documentation for correct parameter usage.
Learn more
To further enhance your understanding of working with the Literary Quotes API, explore these related guides:

Response bodies
Rate limits
Query parameters