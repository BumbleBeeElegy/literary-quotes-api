---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Query parameters

Query parameters are a powerful way to customize API requests, allowing you to filter, sort, and paginate results. This guide introduces the concept of query parameters and how they're used in the Literary Quotes API.

## Introduction to query parameters

Query parameters are key-value pairs added to the end of a URL to modify the request. They start with a question mark (`?`) and are separated by ampersands (`&`).

## How query parameters work in URLs

A typical URL with query parameters looks like this:

```
http://localhost:3000/quotes?author=Jane+Austen&limit=5
```

In this example:
- `author=Jane+Austen` filters quotes by the author
- `limit=5` limits the response to 5 quotes

## Types of query parameters in the Literary Quotes API

The Literary Quotes API supports several types of query parameters:

1. [Fields parameters](./fields-parameters.md): Select specific fields to include in the response
2. [Filtering parameters](./filtering-parameters.md): Narrow down results based on specific criteria
3. [Sorting parameters](./sorting-parameters.md): Order results by a particular field
4. [Pagination parameters](./pagination-parameters.md): Control the number of results per page and navigate through pages

## Basic examples of using query parameters

1. Get quotes by a specific author:
`http://localhost:3000/quotes?author=Mark+Twain`

2. Limit the number of results:
`http://localhost:3000/quotes?limit=10`

3. Combine multiple parameters:
`http://localhost:3000/quotes?author=Jane+Austen&sort=publish_date&order=desc&limit=5`

## Learn more

For a detailed guide on how to effectively use query parameters, including how to combine different types, see the [Query parameters tutorial](./query-parameters-tutorial.md).

To learn more about different paramater types, see the following guides:

- [Fields parameters](./fields-parameters.md)
- [Filtering parameters](./filtering-parameters.md)
- [Sorting parameters](./sorting-parameters.md)
- [Pagination parameters](./pagination-parameters.md)

---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Fields parameters

The fields parameter allows you to specify which fields should be included in the API response. This can help reduce the amount of data transferred and processed, improving performance and efficiency.

## Introduction to fields parameters

By default, the Literary Quotes API returns all available fields for each quote. However, you may not always need all this information. The fields parameter lets you request only the specific fields you need.

## How to use the 'fields' parameter

To use the fields parameter, add it to your query string with a comma-separated list of the fields you want to include:
http://localhost:3000/quotes?fields=author,quote,work
Copy
## Available fields in the Literary Quotes API

The following fields are available:

- id
- author
- author_id
- work
- work_id
- category
- genre
- publish_date
- quote_length
- source
- quote

## Examples

Using curl:

```shell
curl "http://localhost:3000/quotes?fields=author,quote,work" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

Using Postman:

1. Create a new GET request to `http://localhost:3000/quotes`.
2. In the Params tab, add a new Query Param:
      - Key: fields
      - Value: author,quote,work
3. Add the necessary headers (X-Bypass-Auth and Accept).
4. Send the request.

## Best practices for using fields parameters

1. Only request the fields you need to minimize data transfer and processing time.
2. Be aware that omitting fields may affect your ability to use certain filtering or sorting options.
3. If you're unsure which fields you need, start with a full response and then narrow it down.
4. Remember that the `id` field is always included, even if not explicitly requested.

## Learn more

- [Query parameters](./guides/query-paramters.md)
- [Fields parameters](./guides/fields-parameters.md)
- [Filtering parameters](./guides/filtering-parameters.md)
- [Sorting parameters](./guides/sorting-parameters.md)
- [Pagination parameters](./guides/pagination-parameters.md)
