# Literary Quotes API

> [!NOTE]
> This repository contains documentation for a mock API that was created as part of an API documentation course. The API is imaginary, but the API specifications, documentation, and examples are real and can be tested.

The Literary Quotes REST API makes it easy to integrate a curated database of literary quotes into your applications.

To get started with the API, see the [Literary Quotes API documentation](https://bumblebeeelegy.github.io/literary-quotes-api/).

---

> [!NOTE]
> This section is for anyone in the API documentation course who wants to visit this repo later. This is still a work in progress. :)

## My documentation process

My SME (Ben) did an excellent job designing a concept for this API along with the quote objects for the JSON database. There were a lot of interesting possibilities and he was supportive of my idea to expand the initial concept so I could spend time digging into things I hadn't worked on before.

When we started the assignment to design an API for another person to document, I found it really interesting to spend time focusing on that side of the API process. It proved to be a very valuable exercise to gain more insight into APIs, and so I decided to make that part of my project as well. I've outlined some of the areas I focused on and how they helped with my documentation process.

### Adding to the API

I used Ben's original API design as the foundation to guide decisions, then I:

- **Added another endpoint** (`/quotes/random`)
  - **WHY**: Because it seemed like a natural extension of the API. It was Ben's idea to add another endpoint for additional functionality and interest, without losing the original intent of the API service. The carefully curated database is the key selling point of the API service and allowing clients to change that content would lessen it's value. Using the original `quote` resource to create another endpoint that also only supported GET requests made sense, so, the `quotes/random` endpoint was born.<br>

    The random element also allowed for some additional challenges, both in the documentation and thinking through the design process to give it functionality that made it unique but still worked in a complementary way. The limitations of the default json-server capabilities weren't conducive to testing this, so I decided to try to figure it out. For fun. Because, why not? :)

- **Added a `category` field to the quote object**
  - **WHY**: I appreciated the thoughtful decisions behind the quote object and the different fields, which provided information about the author of the quote, the work the quote came from, the genre, publication date, quote length, source link, and the quote itself. One of the included quotes in the database was from a nonfiction work, while others were fiction, so I added the `category` field to the quote object because it was both helpful information and a useful sorting option.
 
- **Expanded the demo JSON database** ([literary-quotes-db.json](https://github.com/BumbleBeeElegy/literary-quotes-api/blob/main/api/literary-quotes-db.json))
  - **WHY**: The query parameters is where the meat of this API really is. They provide the bulk of the functional capabilities, so I wanted to have a larger database for more robust testing. I used the existing JSON database, the created a few dozen more items. This expanded the filtering and sorting test pool since it added more authors, works, genres, and so on.

- **Wrote an OpenAPI specification** ([literary-quotes-api.yml](https://github.com/BumbleBeeElegy/literary-quotes-api/blob/main/api/literary-quotes-api.yml))
  - **WHY**: I've only worked on two APIs prior to this, and both times the YAML specifications were my only resource besides the SMEs. I'm familiar enough with YAML specs now (after spending plenty of time stumbling around), but I wanted to gain a better understanding of both YAML specifiations and API design. So, I decided to try creating the specification file. This is also where I really starting thinking about the intent, logic, and behaviour of the API, and it helped inform my documentation decisions.
  
- **Customized the backend for the json-server** ([server.js](https://github.com/BumbleBeeElegy/literary-quotes-api/blob/main/api/server.js))
  - **WHY**: The hands-on testing part is almost always where I start refining (or completely rethinking) how I want to shape the documentation. Testing helps me cement my understanding of the logic behind a thing and to see things from the point of view of the user. Howerver, I found the default json-server consfiuration wasn't able to handle a lot of the testing scenarios I wanted to try.

    I mostly knew how I wanted things to work and what I wanted to document by this point, and had drafted the reference material, but I still wanted to try out some scenarios to confirm some behaviour and to help me shape the guide and tutorial documentation. I also wanted to be able to use this project as a reference in the future, and creating a more robust testing environment that could do the things the API was meant to do makes it a more valuable resource.<br>
  
    I looked into how to customize json-server and started out with some custom routes. That helped with some scenarios but things still weren't as functional as I wanted. Then I discovered [server.js](https://serverjs.io/) – a server for Node.js that you can also use with json-server and the JSON database through a customized Javascript file. This part of the project was a beast and definitely out of scope, and I wouldn't recommend it just for fun (though it was equal parts fun and frustrating). But once I started down that path, I was determined to get it working and to have a testing environment that could be used with all of the documentation. And I got there in the end!

## Tools I used to help me

I'm fortunate to have a couple of API specification files I've worked closely with for reference documentation, so I used those as a starting point. But I am not a developer. I have very little experience with Javascript, and this certainly wasn't the usual environment where the SMEs are developers and can provide technical reviews.

Instead, I used a combination of three different AI technologies – GitHub CoPilot, Chat GPT, and Claude 3 – along with a lot of good, old-fashioned research. Regarding the AI tools, buyer beware. These tools are really great at some things, but they also struggle with logic and reasoning and can get stuck, lead you astray, confidently provide solutions that are absolutely not right, remove important content from the resources you provide (for no reason), and do something else entirely from what you asked. Troubleshooting sessions can be especially frustating where you can easily find yourself going in circles.

It takes time and effort to get the desired results, especially where you're working in area that's harder for you to verify. And you need to be fastidious with testing and confirming that the information is correct. But they can be really valuable tools at time. I was able to learn a lot more about creating API specs and creating middleware in Javascript in a much shorter time than I would have been able to on my own. And I was able to find other resources I needed more quickly because I was able to get a better idea of what I should look for. Part of this comes from creating really detailed prompts, where you need to put a lot of thought and effort into describing exactly what you need, which really helps solidify it in your own mind.
