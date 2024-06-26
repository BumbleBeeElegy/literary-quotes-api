---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
topics: Authentication, API, 
---

# Authorization

The Literary Quotes API 



- authentication for accessing the `/quotes` and `/quotes/random` endpoints. 

headers
- optional: can use Basic Auth header, with a username and password in username:password format and Base64-encoded; basic auth is the default option with the api; good for testing various authentication things, messages, errors
- X-Bypass-Auth (true) can be used in header to bypass default auth; quicker testing; local, no sensitive data, it's a mock api so it's okat
- 
- Authentication is performed using Basic Auth. To authenticate, include the `Authorization` header in your request with the value `Basic <credentials>`, where `<credentials>` is the Base64-encoded string of your username and password in the format `username:password`.

Example:
```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

For all other endpoints, authentication is not required.


show how authorization works with both curl and Postman


The Literary Quotes API uses [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) to secure access to its resources. With Basic Auth, you send your username and password encoded in Base64 format in the `Authorization` header of every request.

Here's how to set the `Authorization` header:

1. Combine your username and password into a single string, separated by a colon: `username:password`

2. Encode the string in Base64 format. You can do this in a terminal:

   ```bash
   echo -n 'username:password' | base64
   ```

   Or in Python:

   ```python
   import base64
   creds = base64.b64encode('username:password'.encode('ascii')).decode('ascii')  
   ```

3. Prefix the encoded string with `Basic` and include it in your request headers:

   ```
   Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
   ```

   (Replace `dXNlcm5hbWU6cGFzc3dvcmQ=` with your actual encoded credentials.)

For example, using cURL:

```bash
curl -X GET 'https://api.example.com/v1/quotes' \
-H 'Accept: application/json' \
-H 'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ='
```

Always encode your credentials on the server when building a web app, never in client-side JavaScript which would expose your credentials!

If authentication fails, you'll receive a `401 Unauthorized` or 401 invalid credential format response. Double check your credentials and encoding if this happens.

need postman examples


## Authorization

### Introduction

Authorization ensures that only authenticated users with the right permissions can access certain resources. The Literary Quotes API uses Basic Authentication for authorization.

### How It Works

Basic Authentication requires users to include a base64-encoded string containing their username and password in the request headers. This string is sent with each API request to verify the user's identity.

### Including Authorization in Requests

#### Example in cURL

```bash
curl -X GET "https://literary-quotes.com/api/v1/quotes" -H "Authorization: Basic dXNlcjpwYXNzd29yZA=="
```

## Authentication

### Introduction

Authentication is crucial to ensure that only authorized users can access the Literary Quotes API. This API uses Basic Authentication, which requires a username and password to be base64-encoded and included in the request headers.

### Steps to Authenticate

1. **Obtain your credentials**: Ensure you have your username and password provided by the API service.
2. **Encode your credentials**: Use base64 encoding to convert your username and password into a single encoded string.

   For example, if your username is `user` and your password is `password`, you encode `user:password` into base64.

3. **Include the encoded credentials in the request header**: The encoded string must be included in the `Authorization` header of your API request.

### Encoding Credentials

Here's how you can encode your credentials in various programming languages:

#### Python

```python
import base64

username = "user"
password = "password"
credentials = f"{username}:{password}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()

headers = {
    "Authorization": f"Basic {encoded_credentials}"
}
```

#### JavaScript

```javascript
const username = "user";
const password = "password";
const credentials = btoa(`${username}:${password}`);

const headers = {
    "Authorization": `Basic ${credentials}`
};
```

#### cURL

```bash
curl -u user:password "https://literary-quotes.com/api/v1/quotes"
```

### Sample Request

Using the encoded credentials, here’s how you can make an authenticated request using cURL:

```bash
curl -X GET "https://literary-quotes.com/api/v1/quotes" -H "Authorization: Basic dXNlcjpwYXNzd29yZA=="
```

### Conclusion

By following these steps, you can ensure that your API requests are authenticated, allowing you to access the resources provided by the Literary Quotes API.



