---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Pagination parameters

Pagination is a method of dividing a large set of results into smaller, more manageable "pages" of data. This guide explains how to use pagination parameters in the Literary Quotes API to control the amount of data returned in each request.

## Introduction to pagination in APIs

Pagination is crucial for APIs that deal with large datasets. It allows clients to request a specific subset of results, reducing bandwidth usage and improving response times.

## How to use the 'limit' and 'page' parameters

The Literary Quotes API uses two parameters for pagination:

1. `limit`: Specifies the number of items per page
2. `page`: Specifies which page of results to return

The basic syntax is:
http://localhost:3000/quotes?limit=<number>&page=<number>
Copy
## Understanding pagination metadata in responses

When you use pagination, the API response includes metadata about the pagination state. This metadata is returned in the headers:

- `X-Total-Count`: The total number of items available
- `X-Page-Size`: The number of items per page (same as the `limit` parameter)
- `X-Page`: The current page number
- `X-Total-Pages`: The total number of pages available

## Examples

Using curl:

```shell
curl "http://localhost:3000/quotes?limit=5&page=2" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

Using Postman:

Create a new GET request to http://localhost:3000/quotes
In the Params tab, add new Query Params:

Key: limit, Value: 5
Key: page, Value: 2


Add the necessary headers (X-Bypass-Auth and Accept)
Send the request

Best practices for implementing pagination

Always specify both limit and page parameters for clarity
Use reasonable page sizes to balance between number of requests and amount of data per request
Implement handling for cases where the requested page doesn't exist
Use the pagination metadata to implement "next" and "previous" page functionality in your application
Consider combining pagination with filtering and sorting for more precise data retrieval

Learn more
To further enhance your use of the Literary Quotes API, check out these related guides:

Query parameters overview
Fields parameters
Filtering parameters
Sorting parameters