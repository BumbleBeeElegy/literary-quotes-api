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
