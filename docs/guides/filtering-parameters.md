---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Filtering parameters

Filtering parameters allow you to narrow down the results returned by the Literary Quotes API based on specific criteria. This guide explains how to use these parameters effectively.

## Introduction to filtering in APIs

Filtering is a crucial feature in APIs that deal with large datasets. It allows clients to request only the data they need, reducing bandwidth usage and processing time.

## Available filtering parameters in the Literary Quotes API

The Literary Quotes API offers several filtering parameters:

- `author`: Filter by exact author name
- `author_like`: Filter by partial author name
- `author_id`: Filter by author ID
- `work`: Filter by exact work title
- `work_like`: Filter by partial work title
- `work_id`: Filter by work ID
- `category`: Filter by category (Fiction or Nonfiction)
- `genre`: Filter by genre
- `publish_date`: Filter by publication date
- `quote_length`: Filter by exact quote length
- `quote_length_gte`: Filter by minimum quote length
- `quote_length_lte`: Filter by maximum quote length
- `quote_like`: Filter by partial quote text

## How to use multiple filters

You can combine multiple filters in a single request by separating them with `&`:
http://localhost:3000/quotes?author=Jane+Austen&genre=Romance
Copy
## Examples

Using curl:

```shell
curl "http://localhost:3000/quotes?author=Mark+Twain&quote_length_gte=50" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

Using Postman:

Create a new GET request to http://localhost:3000/quotes
In the Params tab, add new Query Params:

Key: author, Value: Mark Twain
Key: quote_length_gte, Value: 50


Add the necessary headers (X-Bypass-Auth and Accept)
Send the request

Best practices for effective filtering

Start with broad filters and narrow down as needed
Combine filters to get more specific results
Be aware that some filters may significantly reduce the number of results
Use *_like parameters for partial matching when exact values are unknown
Consider using sorting and pagination with your filters for better control over results

Learn more
To further enhance your use of the Literary Quotes API, check out these related guides:

Query parameters overview
Fields parameters
Sorting parameters
Pagination parameters