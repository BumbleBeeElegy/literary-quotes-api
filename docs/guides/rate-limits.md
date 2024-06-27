---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: guide
---

# Rate limits

Rate limiting is a technique used to control the amount of incoming and outgoing traffic to or from a network. This guide explains how rate limiting works in the Literary Quotes API, how to track your usage, and best practices for working within these limits.

## Introduction to API rate limiting

Rate limiting helps ensure fair usage of the API and prevents any single client from overwhelming the server with too many requests. It's crucial for maintaining the stability and availability of the service for all users.

## Rate limit implementation in the Literary Quotes API

The Literary Quotes API implements a simple rate limiting strategy:

- 10 requests per minute across all users

Once this limit is reached, subsequent requests will receive a 429 Too Many Requests error until the next minute begins.

## How to track your usage

The API provides headers in each response to help you track your rate limit usage:

- `X-RateLimit-Limit`: The maximum number of requests allowed per minute
- `X-RateLimit-Remaining`: The number of requests remaining in the current minute
- `X-RateLimit-Reset`: The time at which the current rate limit window resets, in UTC epoch seconds

## Handling rate limit errors

If you exceed the rate limit, you'll receive a 429 Too Many Requests response. The response will include a `Retry-After` header indicating the number of seconds you should wait before making another request.

Example rate limit error response:

```json
{
  "code": 429,
  "error": "too_many_requests",
  "details": "You have exceeded the maximum number of requests. The limit will reset in 60 seconds and you can try again."
}
```

## Best practices for working within rate limits

- Implement exponential backoff: If you receive a rate limit error, wait for an increasing amount of time before retrying.
- Cache responses: Store API responses locally when possible to reduce the number of API calls.
- Use bulk operations: When available, use endpoints that allow you to perform multiple operations in a single request.
- Monitor your usage: Keep track of the rate limit headers in your responses to avoid hitting the limits.
- Optimize your requests: Use query parameters effectively to get the data you need in fewer requests.

### Examples

Checking rate limit headers using curl:

```shell
curl -I "http://localhost:3000/quotes" \
  -H "X-Bypass-Auth: true" \
  -H "Accept: application/json"
```

This will return the headers, including the rate limit information.

### Learn more
To further enhance your use of the Literary Quotes API, check out these related guides:

Error handling
Query parameters
Response bodies