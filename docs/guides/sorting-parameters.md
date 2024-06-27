---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Sorting parameters

Sorting parameters allow you to control the order in which results are returned from the Literary Quotes API. This guide explains how to use these parameters to organize your query results effectively.

## Introduction to sorting in APIs

Sorting is a key feature in APIs that deal with datasets. It allows clients to request data in a specific order, making it easier to analyze or display the information.

## How to use the 'sort' and 'order' parameters

The Literary Quotes API uses two parameters for sorting:

1. `sort`: Specifies the field to sort by
2. `order`: Specifies the sort order (ascending or descending)

The basic syntax is:
http://localhost:3000/quotes?sort=<field>&order=<asc|desc>
Copy
## Available sorting options in the Literary Quotes API

You can sort by any of the following fields:

- `id`
- `author`
- `work`
- `category`
- `publish_date`
- `quote_length`

The `order` parameter accepts two values:

- `asc`: Ascending order (default if not specified)
- `desc`: Descending order

## Examples

Using curl:

```shell
curl "http://localhost:3000/quotes?sort=quote_length&order=desc" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

Using Postman:

Create a new GET request to http://localhost:3000/quotes
In the Params tab, add new Query Params:

Key: sort, Value: quote_length
Key: order, Value: desc


Add the necessary headers (X-Bypass-Auth and Accept)
Send the request

Best practices for sorting

Always specify both sort and order parameters for clarity
Be aware that sorting can affect performance, especially on large datasets
Consider combining sorting with pagination for better control over large result sets
When sorting by author or work, remember that these are sorted alphabetically
Sorting by publish_date will order quotes from oldest to newest (asc) or newest to oldest (desc)

Learn more
To further enhance your use of the Literary Quotes API, check out these related guides:

Query parameters overview
Fields parameters
Filtering parameters
Pagination parameters