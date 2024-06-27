---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---
# Response bodies

Understanding the structure and content of API response bodies is crucial for effectively working with the Literary Quotes API. This guide explains the format of response bodies, how to interpret them, and best practices for handling them in your applications.

## Introduction to API response bodies

The response body contains the data returned by the API in response to a request. In the Literary Quotes API, response bodies are always in JSON format.

## Structure of response bodies in the Literary Quotes API

The response body structure depends on the endpoint and the parameters used in the request. However, there are two main types of responses:

1. Single quote response
2. Multiple quotes response

### Single quote response

Used when requesting a specific quote or a random quote:

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

### Multiple quotes response

Used when requesting a list of quotes:

```json
  "items": [
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
    },
    // Additional quotes...
  ],
  "pagination": {
    "current_page": 1,
    "page_size": 5,
    "total_count": 47,
    "total_pages": 10
  }
}
```

## Interpreting different response types

Success responses: Contains the requested data with a 200 OK status code.
Error responses: Contains error details with an appropriate error status code (4xx or 5xx).

Handling and parsing response bodies

Always check the HTTP status code before attempting to parse the response body.
Use appropriate JSON parsing methods in your programming language to convert the response body into a usable data structure.
For multiple quotes responses, iterate through the items array to access individual quotes.
Use the pagination object in multiple quotes responses to implement pagination in your application.

Examples of different response bodies
Error response
jsonCopy{
  "code": 400,
  "error": "bad_request",
  "details": "Invalid query parameter. Make sure your query parameters are correct."
}
Empty response (no matching quotes)
jsonCopy{
  "items": [],
  "pagination": {
    "current_page": 1,
    "page_size": 5,
    "total_count": 0,
    "total_pages": 0
  }
}
Learn more
To further enhance your understanding of working with the Literary Quotes API, explore these related guides:

Error handling
Query parameters
Rate limits