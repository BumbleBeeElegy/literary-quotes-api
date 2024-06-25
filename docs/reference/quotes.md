---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: reference
---

# Quote resource

The `quote` resource contains information about the curated quote, including the literary work the quote comes from, as well as the author, category, genre(s), publication date, quote length, and source.

## Method

- `GET`

## Endpoints

- `http://localhost:3000/quotes`
- `http://localhost:3000/quotes/random`

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
| `category`     | string  | No       | The category of the literary work. Possible values:<br>• Fiction<br>• Nonfiction |
| `genre`        | array   | No       | The genre(s) of the literary work. Each item is a string. Possible values include one or more of:<br>• Adventure<br>• Biography<br>• Children's<br>• Dystopian<br>• Essays<br>• Fantasy<br>• Feminism<br>• Historical<br>• History<br>• Horror<br>• Humanities | • Humour<br>• Literary<br>• Modernist<br>• Mystery<br>• Romance<br>• Science<br>• Sci-Fi<br>• Self-help<br>• Spirituality<br>• Women's |
| `publish_date` | string  | No       | The publication date of the literary work. This can represent:<br>• full dates (YYYY-MM-DD)<br>• years (YYYY)<br>• 1- to 3-digit BCE years (for example, 800 BCE)<br>• 1- to 3-digit CE years (for example, 300 CE or 300). |
| `quote_length` | integer | No       | The character length of the quote. |
| source         | string  | No       | The URL of the online asset the quote was sourced from. |
| `quote`        | string  | No       | The text of the quote. |

## Supported operations

- [GET all quotes](./get-all-quotes.md)
- [GET quotes by author](./get-quotes-by-author.md)
- [GET quotes by work](./get-quotes-by-work.md)
- [GET quotes by category](./reference/get-quotes-by-category.md)
- [GET quotes by genre](./get-quotes-by-genre.md)
- [GET quotes by publication date](./get-quotes-by-publish-date.md)
- [GET quotes by length](./get-quotes-by-length.md)
- [GET quotes using query parameters](./reference/get-quotes-with-parameters)
- [GET a random quote](./get-random-quote.md)
- [GET a random quote using query parameters](./get-random-quote-with-parameters)
