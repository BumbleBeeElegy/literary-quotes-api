# Quickstart

## Prerequisites

Before you start using the Literary Quotes API, ensure you have the following:

1. **Username and Password**: Your unique credentials for authentication.
2. **HTTP Client**: Tools such as `curl`, Postman, or any HTTP client library in your programming language of choice.
3. **Knowledge**: Basic understanding of REST APIs and HTTP methods.

## Step 1: Base64 Encode Your Credentials

The Literary Quotes API uses Basic authentication, which requires the username and password to be base64 encoded. Here's how you can do it:

### Using Online Tools

1. Go to a base64 encoding website, such as [base64encode.org](https://www.base64encode.org/).
2. Enter your username and password in the format `username:password`.
3. Click "Encode" and copy the resulting string.

### Using Command Line Tools

**Linux/Mac:**

```sh
echo -n 'username:password' | base64
```

**Windows (PowerShell):**

```powershell
[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("username:password"))
```

## Step 2: Make a Basic Request

Use your base64 encoded credentials to make a simple request to fetch quotes.

### Using `curl`

**Example:**

```sh
curl -H "Authorization: Basic <base64-encoded-credentials>" -X GET "https://literary-quotes.com/api/v1/quotes"
```

**Detailed Steps:**

1. Open your terminal.
2. Replace `<base64-encoded-credentials>` with the base64 encoded string.
3. Run the command to see the response.

### Using Postman

1. Open Postman and create a new request.
2. Set the request method to `GET`.
3. Enter the URL: `https://literary-quotes.com/api/v1/quotes`.
4. Go to the `Authorization` tab, select `Basic Auth`, and enter your username and password.
5. Click `Send` to make the request and view the response.

## Step 3: Integrate into Your Application

Use the retrieved quotes in your application. Below are examples in different programming languages.

### Python

```python
import requests
from requests.auth import HTTPBasicAuth

response = requests.get(
    "https://literary-quotes.com/api/v1/quotes",
    auth=HTTPBasicAuth('username', 'password')
)

if response.status_code == 200:
    quotes = response.json().get("quotes")
    for quote in quotes:
        print(f"{quote['author']}: {quote['quote']}")
else:
    print("Failed to fetch quotes:", response.status_code)
```

### PowerShell

```powershell
$headers = @{
    Authorization = "Basic <base64-encoded-credentials>"
}

$response = Invoke-RestMethod -Uri "https://literary-quotes.com/api/v1/quotes" -Headers $headers -Method Get

$response.quotes | ForEach-Object { "$($_.author): $($_.quote)" }
```

### Ruby

```ruby
require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("https://literary-quotes.com/api/v1/quotes")
request = Net::HTTP::Get.new(uri)
request["Authorization"] = "Basic <base64-encoded-credentials>"

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
  http.request(request)
end

if response.code == "200"
  quotes = JSON.parse(response.body)["quotes"]
  quotes.each do |quote|
    puts "#{quote['author']}: #{quote['quote']}"
  end
else
  puts "Failed to fetch quotes: #{response.code}"
end
```

### Go

```go
package main

import (
    "encoding/base64"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    username := "username"
    password := "password"
    auth := base64.StdEncoding.EncodeToString([]byte(username + ":" + password))

    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://literary-quotes.com/api/v1/quotes", nil)
    req.Header.Add("Authorization", "Basic "+auth)

    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Failed to fetch quotes:", err)
        return
    }
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

### JavaScript (Node.js)

```javascript
const https = require('https');

const username = 'username';
const password = 'password';
const auth = Buffer.from(`${username}:${password}`).toString('base64');

const options = {
  hostname: 'literary-quotes.com',
  port: 443,
  path: '/api/v1/quotes',
  method: 'GET',
  headers: {
    'Authorization': `Basic ${auth}`
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const quotes = JSON.parse(data).quotes;
    quotes.forEach((quote) => {
      console.log(`${quote.author}: ${quote.quote}`);
    });
  });
});

req.on('error', (e) => {
  console.error(`Failed to fetch quotes: ${e.message}`);
});

req.end();
```

### PHP

```php
<?php
$username = 'username';
$password = 'password';
$auth = base64_encode("$username:$password");

$opts = array(
  'http' => array(
    'method' => "GET",
    'header' => "Authorization: Basic $auth"
  )
);

$context = stream_context_create($opts);
$response = file_get_contents('https://literary-quotes.com/api/v1/quotes', false, $context);

if ($response !== FALSE) {
    $quotes = json_decode($response, true)['quotes'];
    foreach ($quotes as $quote) {
        echo "{$quote['author']}: {$quote['quote']}\n";
    }
} else {
    echo "Failed to fetch quotes.";
}
?>
```
