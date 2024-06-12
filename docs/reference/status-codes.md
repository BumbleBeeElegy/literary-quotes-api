# Quick Reference: Status codes and error messages

| Status Code | Message                | Description                                                                                   |
|-------------|------------------------|-----------------------------------------------------------------------------------------------|
| 200         | OK                     | The request was successful and the server responded with the requested data.                  |
| 400         | Bad Request            | The server could not understand the request due to invalid syntax.                            |
| 401         | Unauthorized           | Authentication is required and has failed or has not yet been provided.                       |
| 403         | Forbidden              | The server understood the request but refuses to authorize it.                                |
| 404         | Not Found              | The requested resource could not be found on the server.                                      |
| 500         | Internal Server Error  | The server encountered an unexpected condition that prevented it from fulfilling the request. |
| 503         | Service Unavailable    | The server is not ready to handle the request, typically due to maintenance or overload.      |

## Description of Common Errors

- **400 Bad Request**: This error occurs when the server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
- **401 Unauthorized**: This indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
- **403 Forbidden**: This error signifies that the client's identity is known to the server, but the client is not authorized to perform the requested operation.
- **404 Not Found**: This status code is returned when the server cannot find the requested resource. The resource might not exist, or it might be unavailable.
- **500 Internal Server Error**: A generic error message when the server encounters an unexpected condition that prevents it from fulfilling the request.
- **503 Service Unavailable**: The server is currently unable to handle the request due to temporary overload or scheduled maintenance.
