## Available endpoints

### GET /quotes

This endpoint retrieves a list of quotes from the database. You can use various query parameters to filter, sort, and paginate the results.

Key features:
- Filter quotes by author, work, genre, and more
- Sort quotes by different fields
- Paginate results for efficient data retrieval

For a detailed description of the quote resource, see the [quote resource documentation](./reference/quotes.md).

For comprehensive information on using this endpoint, including all available query parameters and response formats, refer to the [Get all quotes documentation](./reference/get-all-quotes.md).

Additional filtering options:
- [Get quotes by author](./reference/get-quotes-by-author.md)
- [Get quotes by work](./reference/get-quotes-by-work.md)
- [Get quotes by genre](./reference/get-quotes-by-genre.md)

### GET /quotes/random

This endpoint retrieves a random quote from the database. You can use query parameters to filter the pool of quotes from which the random selection is made.

Key features:
- Fetch a single random quote
- Filter the random selection by author, genre, or keywords

For a detailed description of the quote resource, see the [Quote resource documentation](./reference/quotes.md).

For comprehensive information on using this endpoint, including all available query parameters and response formats, refer to the [Get a random quote documentation](./reference/get-random-quote.md).

## Learn more

To dive deeper into using the Literary Quotes API, explore these additional resources:

- [Authorization guide](authorization.md)
- [Query parameters tutorial](query-parameters-tutorial.md)
- [Rate limits](rate-limits.md)
- [Error handling](error-handling.md)
