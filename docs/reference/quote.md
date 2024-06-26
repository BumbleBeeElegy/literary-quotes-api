---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: reference
---

# Quote resource

The `quote` resource contains the curated quote with information about the associated literary work, including the author, category, genre(s), publication date, quote length, and source.

## Endpoints

| Verb    | Path    | Method |
|---------|---------|--------|
| **GET** | `http://localhost:3000/quotes` | Fetch a list of quotes from the database. |
| **GET** | `http://localhost:3000/quotes/random` | Fetch a random quote from the database. |

## Resource properties

An example `quote` resource:

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

### Object schema

| Property       | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `id`           | integer | No       | The unique identifier for the quote. |
| `author`       | string  | No       | The name of the author. |
| `author_id`    | integer | No       | The unique identifier for the author. |
| `work`         | string  | No       | The title of the literary work. |
| `work_id`      | integer | No       | The unique identifier for the literary work. |
| `category`     | string  | No       | The category of the literary work. Possible values:<br><ul style="column-count:2"><li>Fiction</li><li>Nonfiction</li> |
| `genre`        | array   | No       | The genre(s) of the literary work. Each item is a string. Possible values include one or more of:<br><ul style="column-count:2"><li>Adventure</li><li>Biography</li><li>Children's</li><li>Dystopian</li><li>Essays</li><li>Fantasy</li><li>Feminism</><li>Historical</li><li>Horror</li><li>Humanities</li><li>Humour</li><li>Literary</li><li>Modernist</li><li>Mystery</><li>Romance</li><li>Science</li><li>Sci-Fi</li><li>Self-help</li><li>Spirituality</li><li>Women's</></ul> |
| `publish_date` | string  | No       | The publication date of the literary work. This can represent:<br><ul><li>full dates (YYYY-MM-DD)</li>years (YYYY)</li><li>1- to 3-digit BCE years (for example, 800 BCE)</li>1- to 3-digit CE years (for example, 300 CE or 300)</li> |
| `quote_length` | integer | No       | The character length of the quote. |
| source         | string  | No       | The URL of the online asset the quote was sourced from. |
| `quote`        | string  | No       | The text of the quote. |

## Supported operations

- [GET all quotes](./get-all-quotes.md)
- [GET quotes by ID](./get-quotes-by-id.md)
- [GET quotes by author](./get-quotes-by-author.md)
- [GET quotes by work](./get-quotes-by-work.md)
- [GET quotes by category](./get-quotes-by-category.md)
- [GET quotes by genre](./get-quotes-by-genre.md)
- [GET quotes by publication date](./get-quotes-by-publish-date.md)
- [GET quotes by length](./get-quotes-by-length.md)
- [GET a random quote](./get-random-quote.md)
