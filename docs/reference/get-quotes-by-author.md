# Get quotes by author

Fetch quotes filtered by the author. You can use the `author`, `author_like`, and `author_id` query parameters. Supports sorting and pagination options.

## Method

**GET**

## URL

- `http://localhost:3000/quotes`

#### Query parameters

| Parameter     | Type    | Description |
|---------------|---------|-------------|
| `author`      | string  | Filter quotes by the work's title |
| `author_like` | string  | Filter quotes by one or more keywords in the work's title |
| `author_id`   | integer | Filter quotes by the work's ID. |
| `_order`      | string  | Property to order results by (for example: author, work, genre). |
| `_sort`       | string  | Sort order: `asc` (ascending) or `desc` (descending). Defaults to `asc`. |
| `offset`      | integer | Page number for pagination. Defaults to 1. |
| `limit`       | integer | Number of results per page. Defaults to 5. |

<!--TODO: Include information about query syntax.-->

### Pagination and sorting parameters

#### `orderby`

- **Description**: Specifies the attribute by which to order the results. Permissible attributes include `author`, `work`, `genre`, `publish_date`, and `quote_length`.
- **Default**: `author`

#### `sort`

- **Description**: Specifies the sort order of the results. Permissible values are `asc` (ascending) and `desc` (descending).
- **Default**: `asc`

## Requests

### Request headers

| Header Name      | Description                                    |
|------------------|------------------------------------------------|
| Authorization    | Basic base64-encoded username:password.        |

<!--TODO: Include accept json header.-->

### Request body

The GET request doesn't include a body.

### Example request

```bash
curl -X GET "https://literary-quotes.com/api/v1/quotes?author=Ralph%20Waldo%20Emerson&page=1&limit=5&orderby=work&sort=asc" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ="
```

## Response

**`200`** Returns an array of Quote objects.
**`400`**
**`401`**
**`403`**
**`404`**
**`500`**

A `200` response returns a Quote object or an array of Quote objects that contain the quote(s) specified in the request.

<!--TODO: Revisit YAML file. Maybe a QuoteItems/QuotesData object should be added if I'm wanting to return more than just the array of objects (like pagination info, etc.). Do some testing in Postman with different options.-->

### Example response

<!--TODO: Vary the example responses. Add info about how to return specific fields instead of the entire quote object each time?-->

```json
{
  "status_code": 200,
  "data": [
    {
      "id": 1,
      "author": "Ralph Waldo Emerson",
      "work": "The Essays of Ralph Waldo Emerson",
      "genre": "Essays",
      "publish_date": "1841",
      "quote_length": 119,
      "source": "https://www.gutenberg.org/ebooks/2945",
      "quote": "Life is a train of moods like a string of beads..."
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

### Return status

| Status Code | Message                | Description                                                                                   |
|-------------|------------------------|-----------------------------------------------------------------------------------------------|
| 200         | OK                     | The request was successful and the server responded with the requested data.                  |
| 400         | Bad Request            | The server could not understand the request due to invalid syntax.                            |
| 401         | Unauthorized           | Authentication is required and has failed or has not yet been provided.                       |
| 403         | Forbidden              | The server understood the request but refuses to authorize it.                                |
| 404         | Not Found              | The requested resource could not be found on the server.                                      |
| 500         | Internal Server Error  | The server encountered an unexpected condition that prevented it from fulfilling the request. |
