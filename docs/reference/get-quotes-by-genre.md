# Get quotes by genre

Fetch quotes filtered by genre. Supports pagination and sorting options.

## Method

- **GET**

## URL

`/api/v1/quotes?genre={genre}`

## Query parameters

| Parameter | Type   | Required | Description                                                   |
|-----------|--------|----------|---------------------------------------------------------------|
| genre     | string | Yes      | Genre to filter quotes by.                                    |
| page      | int    | No       | Page number for pagination. Defaults to 1.                    |
| limit     | int    | No       | Number of results per page. Defaults to 10.                   |
| orderby   | string | No       | Attribute to order results by (e.g., author, work, genre).    |
| sort      | string | No       | Sort order: `asc` (ascending) or `desc` (descending). Defaults to `asc`. |

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

<!--TODO: Add the accept json header.-->

### Request Body

The GET request doesn't include a body.

### Example request

```bash
curl -X GET "https://literary-quotes.com/api/v1/quotes?genre=Essays&page=1&limit=5&orderby=author&sort=asc" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ="
```

## Response

**`200`** Returns an array of Quotes objects.
**`400`**
**`401`**
**`403`**
**`404`**
**`500`**

A `200` response returns a `quote` object or an array of `quote` objects that contain the quote(s) specified in the request.

### Example response

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
