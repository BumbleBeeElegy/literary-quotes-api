---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Authorization

The Literary Quotes API uses Basic Authentication to secure access to its resources. This guide explains how to authenticate your requests and use the bypass option for testing purposes.

## Introduction to API authorization

Authorization ensures that only authenticated users can access the API's resources. For the Literary Quotes API, we use Basic Authentication, a simple authentication scheme built into the HTTP protocol.

## Basic Authentication in the Literary Quotes API

With Basic Authentication, you send your credentials (username and password) with each request. The API server then validates these credentials before processing the request.

## How to include credentials in requests

To authenticate your requests:

1. Combine your username and password into a single string: `username:password`
2. Encode this string using Base64
3. Add an `Authorization` header to your request with the value `Basic <encoded_string>`

Example using curl:

```shell
curl "http://localhost:3000/quotes" \
  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
  -H "Accept: application/json"
```

In Postman:

1. Go to the Authorization tab.
2. Select "Basic Auth" from the Type dropdown.
3. Enter your username and password.
4. Postman will automatically add the correct Authorization header.

## X-Bypass-Auth header option

For testing purposes, you can bypass authentication by including the X-Bypass-Auth header in your request:

```shell
curl "http://localhost:3000/quotes" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

This option is useful for quick tests and demonstrations but should not be used in production environments.

## Troubleshooting authorization issues

If you encounter authorization errors:

- Check that your credentials are correct
- Make sure the Authorization header is properly formatted
- Verify that the credentials are correctly Base64 encoded

## Learn more

- [Request headers](request-headers.md)
- [Request methods](request-methods.md)
- [Error handling](error-handling.md)
