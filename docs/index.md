---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
---

> [!NOTE]
> This repository contains documentation for a mock API that was created as part of an API documentation course. You can set up a [testing environment](placeholder) to verify the content.

Get literary quotes from a curated public domain database built on Project Gutenberg.

<!--TODO: Check all docs to make sure curl examples use double quotes.-->
<!--TODO: Check all docs to make sure new and updated content has been added across all relevant docs.-->
<!--TODO: Check all links once documentation set is complete.-->

## Product overview

* [Introduction to the API](./overview/introduction.md)
* [Use cases](placeholder)
* [Pricing](placeholder)

## Getting started

* [Prerequisites](./guides/prerequisites.md)
* [Quickstart](./guides/quickstart.md)

## API fundamentals

* [Requests](./guides/requests.md)<!--Explain concepts like case sensitivity, testing setup, etc.-->
  * [Endpoints](./guides/endpoints.md)
  * [Request methods](./guides/request-methods.md)
  * [Authorization](./guides/authorization.md)
  * [Request headers](./guides/request-headers.md)
  * [Query parameters](./guides/query-paramters.md)
    * [Fields parameters](./guides/fields-parameters.md)
    * [Filter parameters](./guides/filter-parameters.md)
    * [Sort parameters](./guides/sort-parameters.md)
    * [Pagination parameters](./guides/pagination-parameters.md)
* [Responses](./guides/responses.md)
  * [Response bodies](./guides/response-bodies.md)
  * [Rate limits](./guides/rate-limits.md)
  * [Error handling](./guides/error-handling.md)

## Tutorials

* [Set up a testing environment](./guides/set-up-testing-environment)<!--Add info about server.js file and adjustment to setup steps.-->
* [Use query parameters for filtering, sorting, and pagination](./guides/query-parameters-tutorial)

## Reference

* Resources
  * [Quote resource](./reference/quotes.md)
    * [GET all quotes](./reference/get-all-quotes.md)
    * [GET quotes by ID](./reference/get-quotes-by-id.md)
    * [GET quotes by author](./reference/get-quotes-by-author.md)
    * [GET quotes by work](./reference/get-quotes-by-work.md)
    * [GET quotes by category](./reference/get-quotes-by-category.md)
    * [GET quotes by genre](./reference/get-quotes-by-genre.md)
    * [GET quotes by publication date](./reference/get-quotes-by-date.md)
    * [GET quotes by length](./reference/get-quotes-by-length.md)
    * [GET quotes by keyword](./reference/get-quotes-by-keyword.md)
    * [GET a random quote](./reference/get-random-quote.md)
* [cURL examples](./reference/curl-examples.md)
* [Response codes and errors](./reference/response-codes-errors.md)
* Quick references
  * [Object schemas](./reference/object-schemas.md)
  * [Query parameters](./reference/query-parameters.md)
  * [Status codes](./reference/status-codes.md)

===============


 // Pagination alternative
  const quotes = router.db.get('quotes').value(); // Get all quotes
  const totalCount = quotes.length; // Total count of quotes

  // Extract pagination parameters or set default values
  let page = parseInt(req.query._page) || 1;
  let limit = parseInt(req.query._limit) || 5;

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Adjust page value if it's out of bounds
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  // Calculate start and end indices for slicing
  const start = (page - 1) * limit;
  const end = start + limit;

  // Slice the data to simulate pagination
  const paginatedItems = quotes.slice(start, end);

  // Construct the pagination object
  const pagination = {
    current_page: page,
    page_size: limit,
    total_count: totalCount,
    total_pages: totalPages
  };

  // Return paginated response
  res.jsonp({ data: paginatedItems, pagination });
});


=======

server.get('/quotes', (req, res) => {
  const quotes = router.db.get('quotes').value(); // Get all quotes
  const totalCount = quotes.length; // Total count of quotes

  // Extract limit and offset parameters or set default values
  let limit = parseInt(req.query._limit) || 10;
  let offset = parseInt(req.query._offset) || 0;

  // Calculate total pages (for informational purposes)
  const totalPages = Math.ceil(totalCount / limit);

  // Ensure offset is within bounds
  if (offset < 0) offset = 0;
  if (offset > totalCount) offset = totalCount - (totalCount % limit);

  // Slice the data to simulate pagination with limit and offset
  const paginatedItems = quotes.slice(offset, offset + limit);

  // Construct the pagination object
  const pagination = {
    current_offset: offset,
    page_size: limit,
    total_count: totalCount,
    total_pages: totalPages // Included for convenience, even though we're using offset
  };

  // Return paginated response
  res.jsonp({ data: paginatedItems, pagination });
});

=======

  // Pagination setup
  let { page = 1, limit = 5, sort = 'id', order = 'asc' } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);


=========

```javascript
const totalPages = Math.ceil(totalCount / limit);
const start = (page - 1) * limit;
const end = start + limit;
let paginatedQuotes = quotes.slice(start, end);

// Check for order parameter and apply descending order if needed
const order = req.query.order;
if (order === 'desc') {
  paginatedQuotes = paginatedQuotes.reverse();
}

// Send response
res.json({
  quotes: paginatedQuotes,
  pagination: {
    current_page: page,
    page_size: limit,
    total_count: totalCount,
    total_pages: totalPages
  }
});
```

========

```js
// Get all quotes
const quotes = router.db.get('quotes').value();

// Optionally filter your quotes here based on other query parameters like author

// Extract order parameter or set default value
const order = req.query.order || 'asc';

// Sort quotes if order is specified
let sortedQuotes = quotes;
if (order === 'desc') {
  sortedQuotes = [...quotes].sort((a, b) => b.id - a.id); // Assuming you're ordering by 'id' for descending
} // Add more conditions here for other sort fields like 'author' or 'work'

// Extract pagination parameters or set default values
let page = parseInt(req.query._page) || 1;
let limit = parseInt(req.query._limit) || 5;
const totalCount = sortedQuotes.length;

// Calculate total pages
const totalPages = Math.ceil(totalCount / limit);

// Adjust page value if it's out of bounds
if (page < 1) page = 1;
if (page > totalPages) page = totalPages;

// Calculate start and end indices for slicing
const start = (page - 1) * limit;
const end = start + limit;

// Slice the sorted data to simulate pagination
const paginatedItems = sortedQuotes.slice(start, end);

// Construct the pagination object
const pagination = {
  current_page: page,
  page_size: limit,
  total_count: totalCount,
  total_pages: totalPages
};

// Return paginated and possibly sorted response
res.jsonp({ data: paginatedItems, pagination });
```

## Logic 

Act as a seasoned API developer. Improve the content of the server.js file to determine custom filtering, sorting, and pagination logic for requests to the API that return quote objects from a JSON database. Use the attached files to help inform you of how the API is currently designed and to help you understand the custom logic I want applied to the server.js file.

The current pagination in the server.js file uses the logic that the pagination order is sorting, then pagination, then filters. However, I want the order of the query parameters to dictate the order of filtering, sorting, ordering, and pagination. For example, lets say I have this request: `curl "http://localhost:3000/quotes?author=Jane+Austen&sort=work&order=desc"`. I would want the quotes to first be filtered by author, then sorted by the work title, then those filtered and sorted items to be ordered in descending order according to the work title (in this case, that would be descending alphabetical order.) If I made this request – `curl "http://localhost:3000/quotes?sort=work&author=Jane+Austen&order=desc"`, I would want the quotes to first be sorted by work, then filtered to just the works by Jane Austen, then ordered in descending order based on the author. In this case, there is only one author because I filtered the results to only include Jane Austen. So, there is no order to change because the name is the same. So then I would expect the order to apply to the work titles filter in descending order. If I made this request – `curl "http://localhost:3000/quotes?sort=author&order=desc&work_like=love"`, I would want the quotes to be first sorted by author, then ordered in descending alphabetical order by the author name (since the author parameter is a string containing the author's name), then those results would be filtered to only show works with the word "love" in the title. I would expect the sort by author and order descending to still be applied the same way since the work filter comes after the sort and order parameters. If no order is specified, ascending order is expected. If no sorting is specified, I would expect items to be sorted by id (that could be in ascending or descending order, depending on if an order parameter is used in the query string).

If no filtering is applied, I would expect any pagination parameters to determine the results. For example, if I made this request `curl "http://localhost:3000/quotes?page=2"`, only items from page 2 are returned. No limit parameter is included, so the limit that determines the page number would be the default limit (5 items). So, 5 items from page 2 of the database would be returned. No order is specified, and there is no filter, so default ascending order should be applied to the default item property (`id`) so the response returns the items starting with the item with the ID of 6, followed by item with ID of 7, then items with IDs 8, 9, and 10.

Filtering is used here to refer the query parameters that are the properties found in the quote object: `id`,   `author`, `author id`, `work`, `work_id`, `category`, `genre`, `publish_date`, `quote_length`. Filtering also includes parameters that are related to the properties in the quote object: `author_like`, `fields`, `work_like`, `quote_length_gte`, `quote_length_lte`, `quote_like`. For ordering and sorting, the parameter that order or sort is determined by also determines if the order or sort is alphabetical or by number. If the parameter is a string, than order and sort are alphabetical. If the parameter is an integer, then sort and order is numerical. If it's not clear, the default is the item ID. For the `/quotes` endpoint, no pagination is required if there number of items or less returned in the request is equal to or less than the number of items in a single page. That number is determined by the page parameter, if used, or by the default of 5 items if no page parameter is used. No pagination, sorting, or ordering is needed for the `/quotes/random` endpoint because requests to this endpoint can only return a single item.
