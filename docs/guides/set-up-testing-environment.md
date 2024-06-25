---
layout: page
allowTitleToDifferFromFilename: Literary Quotes API
type: tutorial
---

# Set up a testing environment

To explore the Literary Quotes API and test queries without affecting production data, you can set up a local testing environment. Testing the API involves using the json-server with some custom configurations and a database file, to make calls to the mock API with curl or Postman.

**Estimated time to complete**: 20-30 minutes, depending on the current setup of your development system.

## Requirements:

- A [GitHub](https://github.com/) account.
- A macOS, Linux, or Windows development system with a current version of the operating system.
- Your preferred terminal application.
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for the command line or a Git client like [GitHub Desktop](https://desktop.github.com/).

## Step 1: Set up a local copy of the GitHub repository

Create your own fork of the Literary Quotes API repository, then make a local clone of the repository on the computer you'll use to test the API.

1. Open GitHub's documentation on how to [fork a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
2. At the top of the article, select your platform: Mac, Windows or Linux. Then choose your preferred method: GitHub CLI, GitHub Desktop, or a web browser.
3. Follow the steps to fork the repository and create a local clone. Use the [Literary Quotes API](https://github.com/BumbleBeeElegy/literary-quotes-api/) repository in place of any references to the Spoon-Knife repository.

You can optionally follow the next steps to configure Git to sync your fork (`Your-GitHub-Account/literary-quotes-api`) with the upstream repository (`BumbleBeeElegy/literary-quotes-api`). This allows you to propose changes to the upstream repository or to bring in any changes that were made upstream after you forked the repository.

## Step 2: Install the tools and dependencies

### 1. Install Node.js

First, check if Node.js is already installed. Open your preferred terminal application (for example, Terminal, Git Bash, or PowerShell) and run the following command:

```shell
node --version
```

Node.js 12 or later is required to use the [json-server](#2-install-json-server) installed in th next step.

If Node isn't installed or you need to update your version, [download the official packages](https://nodejs.org/en/download) from the Node.js website or install it using your preferred [package manager](https://nodejs.org/en/download/package-manager/).


### 2. Install and configure json-server

The Literary Quotes API repository contains files and node modules specific to the mock API endpoints and parameters. To use json-server with the API, you'll need to install it in the `/api` directory of the cloned repository, even if you already have json-server installed globally.

1. In your terminal app, navigate to the directory where you cloned the` literary-quotes-api` repository:

   ```shell
   cd <your path to the directory>/literary-quotes-api
   ```

2. Then navigate to the `api` directory within the `literary-quotes-api` repository. This directory contains the required configuration files for testing:

   ```shell
   cd api
   ```

3. From the `literary-quotes-api/api` directory, use the following command to install the latest [stable version* of json-server](https://github.com/typicode/json-server/tree/v0):

    ```shell
    npm install json-server@0.17.4
    ```

     * Note: The beta version of json-server isn't compatible with the API. It's okay if the beta installed globally or in another directory, as long as you install the stable version in the `/api` directory,

4. Use the following command to install the dependencies from `package.json`  and add json-server to the repository's `node_modules`:

    ```shell
    npm install
    ```

### 3. Verify curl is installed

Curl comes pre-installed on macOS and Linux and on Windows 10 version 1803 or later. If you're using a current operating system, curl should already be installed. To verify it's installed, run the following command:

On macOS and Linux:

```shell
curl --version
```

On Windows (PowerShell):

```shell
curl.exe --version
```

If curl isn't installed, you can download it from [curl's official website](https://curl.se/download.html).

### 4. (Optional) Install the Postman app and collection

All testing examples in the API documentation use curl, but some guides also include steps for testing in Postman. You can import the Postman collection for the API into the Postman app.

1. If you don't already have a Postman account, you can [sign up for a free account](https://www.postman.com/postman-account/) on Postman's website.
2. [Download the Postman app](https://www.postman.com/downloads/) and sign in to your account in the app.
3. [Follow the steps from Postman's guide](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/) to import the Postman collection for the API. The collection is located in the following directory of the cloned repository: `/literary-quotes-api/postman`.

## Step 3: Set up your local testing environment

After you've forked and cloned the repository and installed the necessary tools and dependencies, you can set up your local testing environment.

1. In your terminal app, navigate to the main `literary-quotes-api` directory in your GitHub workspace:

   ```shell
   cd <your GitHub workspace>/literary-quotes-api
   ```

2. (Optional) If you want to separate testing activities from your main development work, create a test branch. For example:

   ```shell
   git checkout -b api-test
   ```

3. Navigate to the `api` directory, which contains the required database and server files for testing:

   ```shell
   cd api
   ```

4. Start the json-server.

    On macOS and Linux:

    ```shell
    sh start-server.sh
    ```

    On Windows:

    ```shell
    start-server.bat
    ```

    This command runs `node server.js`, which uses json-server as a node module with the custom settings defined in the `server.js` file.

    You should see an output that indicates the server is running at http://localhost:3000.

5. With the json-server running, open a new terminal window or tab and make a test call to the service:

   ```shell
   curl http://localhost:3000/quotes/1
   ```

   You should see a response that contains the following JSON quote object:

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

    If you see the expected quote, your testing environment is set up correctly. You can now proceed to test the examples in the rest of the API documentation.

    When you're done testing, press `Ctrl + C` for `Command-C` in the terminal to stop the json-server.

## Troubleshooting

If you don't see the example JSON object when you run the curl command, or if you experience problems with any of the other steps, try the following troubleshooting steps.

### Check for common issues

- Make sure all commands are typed correctly.
- Check that you're in the correct directory for the forked GitHub repository: `<your path to the directory>/literary-quotes-api/api`.
- Make sure all required software components and dependencies are installed correctly.

### Check for conflicting processes using port 3000

If you see an error that port 3000 is already in use or you're otherwise not able to run the server, use the following command to check for any processes using that port:

On macOS and Linux:

```bash
lsof -i :3000
```

On Windows (PowerShell):

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

This command lists all processes using port 3000. If there's an output, it means the port is in use.

Note the Process ID (PID) for the conflicting process, then terminate the process with the following command, replacing `<PID>` with the actual Process ID:

On macOS and Linux

```shell
kill -9 <PID>
```

On Windows:

```shell
Stop-Process -Id <PID> -Force
```

If the issue persists, check the error messages for guidance or [contact Support](mailto:support+api@example.com) for help.
