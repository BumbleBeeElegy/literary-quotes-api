---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: reference
---

# Get all quotes

Fetch a list of all the quotes in the database. Sorting and pagination options are supported.

## Endpoint

| Verb    | Path  | Method |
|---------|-------|--------|
| **GET** | `http://localhost:3000/quotes` | Fetch a list of all quotes from the database. |

## Query parameters

All query parameters are optional.

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `fields`  | string  | Comma-separated list of fields to specify which fields to include for the list of quotes in the response. If not specified, all fields are returned. |
| `sort`    | string  | The field to sort the results by. The default sort field is `id`. |
| `order`   | string  | The field to order results by ascending (`asc) or descending (`desc`). The default order is ascending. |
| `limit`   | integer | Number of items per page. The default is 5 items per page. |
| `page`    | integer | Page number for pagination. The default is page 1. |

## Requests

### Request headers

| Header Name     | Value           | Required        | Description     |
|-----------------|-----------------|-----------------|-----------------|
| `Authorization` | `Basic <your_credentials>` | No | Allows you to test authentication-related behaviour and errors. Required by default but can be bypassed. |
| `X-Bypass-Auth` | Value: `true`. | No | Allows you to bypass authorization. |
| `Accept`        | `application/json` | No | Indicates what kind of response the client can accept from the server. |

### Request body

None.

### Example requests

Get a list of all available quotes:

```shell
curl "http://localhost:3000/quotes" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

The default pagination limit is set to 5 items. Fetch the next page of items:

```shell
curl "http://localhost:3000/quotes?page=2" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

Use the `limit` parameter to specific how many items you want on a page:

```shell
curl "http://localhost:3000/quotes?limit=10" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

Get a list of all available quotes, but return only the `author`, `work`, and `quotes` fields for each quote:

```shell
curl "http://localhost:3000/quotes?fields=author,work,quote" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

## Responses

A successful response returns a `QuotesResponse` object wrapping a list of quote items and pagination information.

```json
{
  "items": [
    {
      "id": 1,
      "author": "Virginia Woolf",
      "author_id": 18,
      "work": "A Room of One's Own",
      "work_id": 69197,
      "category": "Nonfiction",
      "genre": [
        "Essays",
        "Feminism"
      ],
      "publish_date": "1929-10-24",
      "quote_length": 120,
      "source": "https://www.gutenberg.org/ebooks/69197",
      "quote": "Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind."
    },
      // Additional quotes...
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total_pages": 10,
    "total_quotes": 50
  }
}
```

### Response status

| Code  | Status | Error | Details |
|-------|----------------|---------|
| `200` | `OK` | Indicates the request was successful and the response body contains the requested data. |
| `400` | `bad_request` | The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors. |
| `401` | `unauthorized` | Authentication failed. Make sure your request includes the Authorization header and that you're using the correct Base64-encoded username:password. |
| `401` | `invalid_credentials` | Invalid credential format. Make sure your credentials are in "username:password" format before you encode them. |
| `404` | `not_found` | No quotes match the provided parameters. The resource might not exist or is unavailable. |
| `429` | `too_many_requests` | You have exceeded the maximum number of requests. The limit will reset in 60 seconds and you can try again. |
| `500` | `internal_server_error`  | An unexpected error occurred. Please try again later. If the problem persists, contact Support.|
