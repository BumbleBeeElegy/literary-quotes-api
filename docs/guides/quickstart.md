---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: quick_start
---

# Quickstart

## Requirements

Before you start using the Literary Quotes API, make sure you went through the tutorial to [set up a testing environment](set-up-testing-environment.md).


## Step 1: Make a basic API request

Use your base64-encoded credentials to make a simple request to fetch quotes. or use the x-bypass-auth header to bypass authorization.

### Using `curl`


1. Open your terminal.
2. Add the authorization header to use your credentials. Replace `<your_encrypted_credentials>` with the Bae64-encoded string.

  Or use the X-Bypass-Auth header with a `true` value to bypass authorization.

  The Accept header is optional for testing the API, but it's good practice to include it.

<!--? should there be a note here or somewhere about the fact that curl requests can be made on a single line, but for better readability we're using separate lines here; but can still copy/paste and run the request in that form-->

**Using authorization:**

```shell
curl "http://localhost:3000/quotes" \
  -H "Authorization: Basic <your_encrypted_credentials>" \
  -H "Accept: application/json"
```

**Bypassing authorization:**

```shell
curl "http://localhost:3000/quotes" \
  -H X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

3. Run the command to see the response.

Examine the response, which will include an array of quote objects and pagination details.

Default page size is 5 items, so you should see the first five items from the database


### Using Postman

1. Open Postman and create a new request.
2. Set the request method to `GET`.
3. Enter the URL: `http://localhost:3000/quotes`.
4. Go to the `Authorization` tab, select `Basic Auth`, and enter your username and password.
5. Click `Send` to make the request and view the response.

Examine the response, which will include an array of quote objects and pagination details.

Default page size is 5 items, so you should see the first five items from the database


## Step 2: Refine your requests with query parameters

need this in both curl and postman steps:

   - Experiment with different query parameters to filter, sort, and paginate the quotes according to your needs.
   - Refer to the API reference documentation for details on available query parameters and their usage.

- need a couple of examples here of some typical requests with query parameter; start query request with `?`
  - filter by a single field like `author`

and add more wth `&` to combine parameters like `/quotes?category=Fiction&genre=Fantasy`

mention how order of operations is important – order of parameters in query string dictates order in which they're applied; wont always matter because some combinations of params will have the same results in different order  depending on params, but sometimes it will matter
  - add example here (not order and page together because those are still a bit quirky in server file); maybe ??

## step 3: Paginate, sort, order 

curl and postman steps for this:

   - Experiment with different query parameters to filter, sort, and paginate the quotes according to your needs.

need a couple of examples

   - Refer to the API reference documentation for details on available query parameters and their usage or guide to go in more depth


## step 4 handle response code and errors

  - Check the HTTP status code of the API response to determine the success or failure of your request.
  - (need to include info for both curl and Postman on how to check headers)
   - If the request is successful (status code 200), parse the JSON response body to access the quote data.
   - If an error occurs (status code 4xx or 5xx), handle it gracefully by checking the error details in the response body.

go to error handing guide for more detailed info


## next steps 

- Use the knowledge gained from the quickstart to integrate the Literary Quotes API into your own application.
   - Make API requests from your application code to fetch quotes, display them to users, or perform further processing.

Remember to comply with the rate limits and usage guidelines mentioned in the API documentation to ensure fair usage of the API resources.

## learn more


- links to other articles in this Api for  more, like query param tutorial, error handling guide, etc.


