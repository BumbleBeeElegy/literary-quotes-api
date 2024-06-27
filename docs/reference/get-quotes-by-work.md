---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: reference
---

# Get quotes by work

Fetch a list of quotes filtered by the literary work. You can use the `work`, `work_like`, or `work_id` query parameters. Sorting and pagination options are supported.

## Endpoint

| Verb    | Path and parameters | Method |
|---------|---------------------|--------|
| **GET** | `http://localhost:3000/quotes?work` | Fetch a list of quotes by the work's title. |
| **GET** | `http://localhost:3000/quotes?work_like` | Fetch a list of quotes by a partial match to the work's title. |
| **GET** | `http://localhost:3000/quotes?work_id` | Fetch a list of quotes by the work's unique identifier (ID). |

## Query parameters

All query parameters are optional.

| Parameter   | Type    | Description |
|-------------|---------|-------------|
| `work`      | string  | Filter quotes by the work's title. |
| `work_like` | string  | Filter quotes by one or more keywords in the work's title. |
| `work_id`   | integer | Filter quotes by the work's ID. |
| `fields`    | string  | Comma-separated list of fields to specify which fields to include in the response. If not specified, all fields are returned. |
| `sort`      | string  | The field to sort the results by. The default sort field is `id`. |
| `order`     | string  | The field to order results by ascending (`asc) or descending (`desc`). The default order is ascending. |
| `limit`     | integer | Number of items per page. The default is 5 items per page. |
| `page`      | integer | Page number for pagination. The default is page 1. |

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

Get quotes by the title of the work. Spaces in the work title are encoded with the `+` character:

```shell
curl "http://localhost:3000/quotes?work=To+Kill+a+Mockingbird" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

Get quotes by a keyword in the title of the work:

```shell
curl "http://localhost:3000/quotes?work_like=Mockingbird" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

Get quotes by the work's ID:

```shell
curl "http://localhost:3000/quotes?work_id=28520" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

## Response

A successful response returns a `QuotesResponse` object wrapping a list of quote items and pagination information.

### Example response

```json
{
  "items": [
    {
      "id": 2,
      "author": "Harper Lee",
      "author_id": 2,
      "work": "To Kill a Mockingbird",
      "work_id": 28520,
      "category": "Fiction",
      "genre": "Literary",
      "publish_date": "1960-07-11",
      "quote_length": 86,
      "source": "https://www.gutenberg.org/ebooks/28520",
      "quote": "You never really understand a person until you consider things from his point of view."
    },
    // Additional quotes...
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total_pages": 2,
    "total_quotes": 10
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
