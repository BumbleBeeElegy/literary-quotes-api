---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Fields parameters

The `fields` parameter allows you to specify which fields should be included in the API response. This can help reduce the amount of data transferred and processed, improving performance and efficiency.

By default, the Literary Quotes API returns all available fields for each quote. However, you may not always need all this information. The `fields` parameter lets you request only the specific fields you need.

## How to use the 'fields' parameter

To use the `fields` parameter, add it to your query string with a comma-separated list of the fields you want to include:

`http://localhost:3000/quotes?fields=author,quote,work`

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

- [Query parameters](query-parameters.md)
- [Filtering parameters](filtering-parameters.md)
- [Sorting parameters](sorting-parameters.md)
- [Pagination parameters](pagination-parameters.md)
