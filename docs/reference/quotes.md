# `quotes` resource

The `quotes` resource provides access to a curated database of literary quotes. This resource supports fetching quotes with various filters and pagination options.
<!--TODO: Add links to filter + pagination guides.-->

## Method

`GET`

## URL

`https://literary-quotes.com/api/v1/quotes`

## Resource properties

### JSON example

```json
{
  "id": 1,
  "author": "Ralph Waldo Emerson",
  "author_id": 1,
  "work": "The Essays of Ralph Waldo Emerson",
  "work_id": 1,
  "genre": "Essays",
  "publish_date": "1841",
  "quote_length": 119,
  "source": "https://www.gutenberg.org/ebooks/2945",
  "quote": "Life is a train of moods like a string of beads; and as we pass through them they prove to be many-colored lenses which paint the world their own hue, and each shows only what lies in its own focus."
}
```

### Object schema

| Property      | Type   | Required | Description                                                                                 |
|---------------|--------|----------|---------------------------------------------------------------------------------------------|
| id            | int    | Yes      | Unique identifier for the quote.                                                            |
| author        | string | Yes      | The author of the quote.                                                                    |
| author_id     | int    | Yes      | Unique identifier for the author.                                                           |
| work          | string | Yes      | The title of the work from which the quote is taken.                                        |
| work_id       | int    | Yes      | Unique identifier for the work.                                                             |
| genre         | string | Yes      | The genre of the work.                                                                      |
| publish_date  | string | Yes      | The publication date of the work.                                                           |
| quote_length  | int    | Yes      | The length of the quote in characters.                                                      |
| source        | string | Yes      | The source URL where the quote can be found.                                                |
| quote         | string | Yes      | The text of the quote.                                                                      |
## Supported operations

- **GET**: Fetch quotes with optional filters and pagination.

- [Get all quotes](#)
- [Get quotes by author](#)
- [Get quotes by work](#)
- [Get quotes by genre](#)
- [Get quotes by publication date](#)
- [Get quotes by length](#)
