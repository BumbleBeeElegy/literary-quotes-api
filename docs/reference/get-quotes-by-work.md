# Get quotes by work

Fetch quotes filtered by the literary work. You can use the `work`, `work_like`, or `work_id` query parameters. Supports sorting and pagination options.

## Method

- **GET**

## URL

- `http://localhost:3000/quotes`

## Query parameters

| Parameter   | Type    | Description |
|-------------|---------|-------------|
| `work`      | string  | Filter quotes by the work's title |
| `work_like` | string  | Filter quotes by one or more keywords in the work's title |
| `work_id`   | integer | Filter quotes by the work's ID. |
| `_order`      | string  | Property to order results by (for example: author, work, genre). |
| `_sort`       | string  | Sort order: `asc` (ascending) or `desc` (descending). Defaults to `asc`. |
| `offset`      | integer | Page number for pagination. Defaults to 1. |
| `limit`       | integer | Number of results per page. Defaults to 5. |

**Examples:**

- `GET /quotes?work=To Kill A Mockingbird`
- `GET /quotes?work_like=Mockingbird`
- `GET /quotes?work_id=28520`

## Requests

### Request headers

| Header Name      | Content          |
|------------------|------------------|
| `Authorization`  | `Basic <your_base64_encrypted_credentials>`. |
| `Accept`         | `application/json` |

### Request body

The GET request doesn't include a body.

### Example requests

Get quotes by the title of the work:

```bash
curl -X GET ""http://localhost:3000/quotes?work=To+Kill+a+Mockingbird" -H "Authorization: Basic dXNlcjpwYXNz" -H "Accept: application/json"
```

Get quotes by a keyword in the title of the work:

```bash
curl -X GET ""http://localhost:3000/quotes?work_like=Mockingbird" \
-H "Authorization: Basic dXNlcjpwYXNz" \
-H "Accept: application/json"
```

Get quotes by the work ID:

```bash
curl -X GET "http://localhost:3000/quotes?work_id=28520" \
-H "Authorization: Basic dXNlcjpwYXNz" \
-H "Accept: application/json"
```

## Response

A `200` response returns a `quote` object or an array of `quote` objects that contain the quote(s) specified in the request.

### Example response

```json
[
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
  }
]
```

### Return status

| Code  | Status / Error | Details |
|-------|----------------|---------|
| `200` | `OK` | Indicates the request was successful and the response body contains the requested data. |
| `400` | `bad_request` | The request could not be understood and may have incorrect parameters. Make sure your query parameters are correct. |
| `401` | `unauthorized` | Authentication failed. Make sure your request includes the Authorization header and that you're using the correct Base64-encoded username and password. |
| `404` | `not_found` | No quotes match the provided parameters. The resource might not exist or it might be unavailable. |
| `429` | `too_many_requests` | You have exceeded the maximum number of requests. The limit will reset in 60 seconds and you can try again. |
| `500` | `internal_server_error`  | An unexpected error occurred. Please try again later. If the problem persists, contact Support.|
