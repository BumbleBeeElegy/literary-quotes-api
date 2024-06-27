---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Request headers

HTTP headers allow the client and the server to pass additional information with the request or the response. This guide covers the headers used in the Literary Quotes API.

## Introduction to HTTP headers

Headers are key-value pairs sent at the start of HTTP requests and responses. They define the operating parameters of an HTTP transaction.

## Required headers for the Literary Quotes API

1. **Authorization**
   - Required unless using X-Bypass-Auth
   - Format: `Authorization: Basic <base64_encoded_credentials>`
   - Example: `Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`

2. **Accept**
   - Specifies the expected response format
   - Value: `application/json`

## Optional headers

1. **X-Bypass-Auth**
   - Used to bypass authentication for testing.
   - Value: `true`

## How to set headers in curl and Postman

Using curl:

```shell
curl "http://localhost:3000/quotes" \
  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
  -H "Accept: application/json"
```

Using Postman:

1. In the request, go to the Headers tab
2. Add a new header with Key: Authorization, Value: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
3. Add another header with Key: Accept, Value: application/json

## Common header-related issues and solutions

1. Authorization failures:
    - Ensure the Authorization header is correctly formatted.
    - Check that the credentials are properly Base64 encoded.

2. Incorrect response format:
    - Verify that the Accept header is set to `application/json`.

3. Rate limiting issues:
    Check for` X-RateLimit-*` headers in the response to monitor your usage.

## Learn more

- [Authorization](./guides/authorization.md)
- [Rate limits](./guides/rate-limits.md)
- [Error handling](./guides/error-handling.md)
