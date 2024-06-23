# Set up a testing environment

To explore the Literary Quotes API and test queries without affecting production data, you can set up a local testing environment.

Estimated time to complete: 20-30 minutes, depending on the current setup of your development system.

## Requirements:

- A [GitHub](https://github.com/) account.
- A development system (macOS, Linux, or Windows computer) running a current or long-term support (LTS) version of the operating system.
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for the command line or a Git client like [GitHub Desktop](https://desktop.github.com/).

## Step 1: Install the tools

### 1. Install Node.js

First, check if Node.js is already installed. Open your preferred terminal application (for example, Terminal, Git Bash, or PowerShell) and run the following command:

```shell
node --version
```

Node.js 12 or later is required to use the [json-server](#2-install-json-server) to test the API.

If Node isn't installed or you need to update your version, [download official packages](https://nodejs.org/en/download) from the Node.js website or install it using your preferred [package manager](https://nodejs.org/en/download/package-manager/).

### 2. Install json-server

The json-server is used to mock the API endpoints. The latest [stable version of the json-server](https://github.com/typicode/json-server/tree/v0) is recommended for testing with this API.

Install the json-server:

```
npm install -g json-server@0.17.4
```

### 3. Verify curl is installed

Curl comes pre-installed on macOS and Linux and on Windows 10 version 1803 or later. If you're using a current operating system, curl should be installed.

To check if it's installed:

On macOS and Linux:

```bash
curl --version
```

On Windows (PowerShell):

```powershell
curl.exe --version
```

If curl isn't installed, you can download it from [curl's official website](https://curl.se/download.html).

Note: You can use curl to test a lot of the basic functions of the `/quotes` endpoint of API, but the `/quotes/random` endpoint and some examples can only be tested using Postman.

### 4. Install Postman

You can test most of the examples in this documentation using curl, but if you need to test the `/quotes/random` endpoint or any examples that don't support testing with curl, Postman is required.

Download Postman from [Postman's official website](https://www.postman.com/downloads/).

## Step 2: Fork the GitHub repository

1. Navigate to the [Literary Quotes API](https://github.com/BumbleBeeElegy/literary-quotes-api/) repository.
2. Click **Fork** in the top-right corner of the page.
3. Select your GitHub account as the destination for the fork.

For more detailed instructions, refer to GitHub's documentation on how to [fork a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

## Step 3: Set up the testing environment

1. Open a terminal.
2. Navigate to the literary-quotes-api directory in your GitHub workspace:

   ```shell
   cd <your GitHub workspace>/literary-quotes-api
   ```

3. (Optional) Create a test branch if you want to separate testing activities from your main development work.

   ```shell
   git checkout -b api-test
   ```

4. Navigate to the `api` directory, which contains the required database and server files for testing:

   ```shell
   cd api
   ```

5. Start the json-server:

   ```shell
   json-server -w literary-quotes-db.json
   ```

   You should see an output that indicates the server is running at http://localhost:3000.

6. With the json-server running, open a new terminal window or tab and make a test call to the service:

   ```shell
   curl http://localhost:3000/quotes/1
   ```

   You should see a response that contains this JSON quote object:

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

    If you see the expected quote, your testing environment is set up correctly. You can now proceed to test the examples in the API documentation.

    When you're done testing, press `Ctrl + C` for `Command-C` in the terminal to stop the json-server.

If any of the steps didn't work as expected, learn more about how to [troubleshoot issues](#troubleshooting).

## Additional information about testing

### Queries

The test environment has the same endpoints and [query parameter options](../guides/query-parameters.md) as the real API, so you can thoroughly test your queries. Most queries can be tested with both curl and Postman, but some queries can only be tested in Postman. Testing examples in the API document will specify where they can be tested.

### Case sensitivity

JSON is case sensitive. When you make requests through the json-server, make sure any property names or values in the request match the case of the property names or values in the JSON object(s).

### Authorizing requests

Authentication isn't required in the test environment, so you don't need to include the `Authorization` header in your requests, but it will be included in examples. When you switch to a production environment, [authorization](placeholder) is required.

## Troubleshooting

### Common Issues

- Make sure all commands are typed correctly.
- Check that you're in the correct directory for the forked GitHub repository. For the json-server, that is `<your GitHub workspace>/literary-quotes-api/api`.
- Make sure all required software components are installed correctly and up to date.

### Conflicting processes using port 3000

To check for conflicting processes using port 3000, run the following command from the terminal:

On macOS and Linux:

```bash
lsof -i :3000
```

On Windows (PowerShell):

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

This command lists all processes using port 3000. If there's an output, it means the port is in use.

You can terminate the process using its Process ID (PID) from the output of the previous command. Replace `<PID>` with the actual Process ID:

On macOS and Linux

```bash
kill -9 <PID>
```

On Windows (PowerShell):

```
Stop-Process -Id <PID> -Force
```

If the issue persists, check the error messages for guidance or [contact Support](mailto:support+api@example.com) for help.
