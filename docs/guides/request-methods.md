---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Request methods

The Literary Quotes API uses HTTP request methods to perform different operations on resources. Understanding these methods is crucial for effectively interacting with the API.

## Introduction to HTTP request methods

HTTP request methods, also known as HTTP verbs, indicate the desired action to be performed on a resource. The most common methods are GET, POST, PUT, PATCH, and DELETE. However, the Literary Quotes API primarily uses the GET method for retrieving data.

## GET method

The GET method is used to retrieve data from the server. It's a read-only method, meaning it doesn't change any data on the server. In the Literary Quotes API, you'll use GET requests to fetch quotes and related information.

### Usage in the Literary Quotes API

The Literary Quotes API provides two main endpoints, both of which use the GET method:

1. `/quotes`: Retrieves a list of quotes, which can be filtered and sorted using query parameters.
2. `/quotes/random`: Retrieves a single random quote.

### Examples

Here are examples of how to make GET requests to the Literary Quotes API using curl and Postman:

Using curl:

```shell
curl "http://localhost:3000/quotes" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

Using Postman:

1. Create a new GET request
2. Enter the URL: http://localhost:3000/quotes
3. In the Headers tab, add:
    - Key: X-Bypass-Auth, Value: true
    - Key: Accept, Value: application/json
4. Click "Send" to make the request

## Best practices for making requests

- Use GET for retrieving data and never for modifying server state.
- Include appropriate headers with your requests (see the Request headers guide for more information).
- Be mindful of rate limits when making multiple requests (refer to the Rate limits guide).
- Handle potential errors gracefully (see the Error handling guide).

## Learn more

* [Authorization](./guides/authorization.md)
* [Request headers](./guides/request-headers.md)
* [Query parameters](./guides/query-paramters.md)
