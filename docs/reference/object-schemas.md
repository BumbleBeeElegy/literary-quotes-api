# Quick reference: Object schemas

## Quote Object

| Property       | Type       | Required | Description |
|----------------|------------|----------|-------------|
| `id`           | integer    | Yes      | The unique identifier for the quote. |
| `author`       | string     | Yes      | The name of the author. |
| `author_id`    | integer    | Yes      | The unique identifier for the author. |
| `work`         | string     | Yes      | The title of the literary work. |
| `work_id`      | integer    | Yes      | The unique identifier for the literary work. |
| `category`     | string     | Yes      | The category of the literary work. Possible values:<br>• Fiction<br>• Nonfiction |
| `genre`        | array      | Yes      | The genre(s) of the literary work. Each item is a string. Possible values include one or more of:<br>• Adventure<br>• Biography<br>• Children's<br>• Dystopian<br>• Essays<br>• Fantasy<br>• Feminism<br>• Historical<br>• History<br>• Horror<br>• Humanities | • Humour<br>• Literary<br>• Modernist<br>• Mystery<br>• Romance<br>• Science<br>• Science Fiction<br>• Self-help<br>• Spirituality<br>• Women's |
| `publish_date` | string     | Yes      | The publication date of the literary work. This can represent:<br>• full dates (YYYY-MM-DD)<br>• years (YYYY)<br>• 1- to 3-digit BCE years (for example, 800 BCE)<br>• 1- to 3-digit CE years (for example, 300 CE or 300). |
| `quote_length` | integer    | Yes      | The character length of the quote. |
| `source`       | string     | Yes      | The URL of the online asset the quote was sourced from. |
| `quote`        | string     | Yes      | The text of the quote. |

Example JSON response:

```json
{
  "id": 1,
  "author": "Virginia Woolf",
  "author_id": 18,
  "work": "A Room of One's Own",
  "work_id": 69197,
  "category": "Nonfiction",
  "genre": ["Essays", "Feminism"],
  "publish_date": "1929-10-24",
  "quote_length": 120,
  "source": "https://www.gutenberg.org/ebooks/69197",
  "quote": "Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind."
}
```

## Pagination Object

| Property      | Type    | Required | Description |
|---------------|---------|----------|-------------|
| `current_page`| integer | No       | The current page number. |
| `page_size`   | integer | No       | The number of items per page. |
| `total_count` | integer | No       | The total number of items. |
| `total_pages` | integer | No       | The total number of pages. |

Example JSON response:

```json
{
  "current_page": 1,
  "page_size": 10,
  "total_count": 100,
  "total_pages": 10
}
```

## Error Object

| Property   | Type    | Description |
|------------|---------|-------------|
| `code`     | integer | The HTTP response status code for the error. |
| `error`    | string  | A machine-parsable string representing the error. |
| `details`  | string  | A human-readable explanation of the error. |

Example JSON response:

```json
{
  "code": 400,
  "error": "bad_request",
  "details": "The request could not be understood and may have missing or incorrect content or parameters. Make sure your query parameters are correct."
}
```
