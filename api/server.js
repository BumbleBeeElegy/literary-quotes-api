const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('literary-quotes-db.json');
const middlewares = jsonServer.defaults();

// Apply default json-server middlewares
server.use(middlewares);

// Basic Authorization middleware

// Checks for the presence of a valid Basic Auth header (This only checks for a Base6-encoded username:password. It doesn't validate the credentials.)
server.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      code: 401,
      error: 'unauthorized',
      details: 'Authentication failed. Make sure your request includes the Authorization header and that you\'re using the correct Base64-encoded username and password.'
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

  if (!credentials.includes(':')) {
    return res.status(401).json({
      code: 401,
      error: 'invalid_credential_format',
      details: 'Invalid credential format. Make sure your credentials are in "username:password" format before you encode them.'
    });
  }

  next();
});

// Rate limiting middleware

// Limits total requests to 10 per minute across all users
const WINDOW_MS = 60 * 1000; // 60 seconds
const MAX_REQUESTS = 10;
let requestCount = 0;
let windowStart = Date.now();

server.use((req, res, next) => {
  const now = Date.now();

  if (now - windowStart > WINDOW_MS) {
    // Reset the window if it has expired
    requestCount = 0;
    windowStart = now;
  }

  requestCount++;

  if (requestCount > MAX_REQUESTS) {
    return res.status(429).json({
      code: 429,
      error: 'too_many_requests',
      details: 'You have exceeded the maximum number of requests. The limit will reset in 60 seconds and you can try again.'
    });
  }

  next();
});

// Case insensitivity middleware

// Makes all query parameters case-insensitive
server.use((req, res, next) => {
  req.query = Object.keys(req.query).reduce((acc, key) => {
    acc[key.toLowerCase()] = req.query[key].toLowerCase();
    return acc;
  }, {});
  next();
});

// Syntax validation middleware
server.use((req, res, next) => {
  const query = req.url.split('?')[1];
  if (query) {
    const params = query.split('&');
    for (const param of params) {
      if (!param.includes('=')) {
        return res.status(400).json({
          code: 400,
          error: 'bad_request',
          details: 'The request could not be understood. This could be due to incorrect syntax or a missing key or value in the query parameters. Check your query string for errors.'
        });
      }
      const [key, value] = param.split('=');
      if (!key || !value) {
        return res.status(400).json({
          code: 400,
          error: 'bad_request',
          details: 'The request could not be understood. This could be due to incorrect syntax or a missing key or value in the query parameters. Check your query string for errors.'
        });
      }
      if (!key.match(/^[a-zA-Z_]+$/)) {
        return res.status(400).json({
          code: 400,
          error: 'bad_request',
          details: 'The request could not be understood. This could be due to incorrect syntax or a missing key or value in the query parameters. Check your query string for errors.'
        });
      }
    }
  }
  next();
});

// Apply pagination headers
server.use((req, res, next) => {
  const quotes = router.db.get('quotes').value();
  const totalItems = quotes.length;
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const totalPages = Math.ceil(totalItems / limit);

  res.header('X-Page-Size', limit);
  res.header('X-Page', page);
  res.header('X-Total-Count', totalItems);
  res.header('X-Total-Pages', totalPages);

  next();
});

// Helper function to validate query parameters
function validateQueryParams(allowedParams, req) {
  return Object.keys(req.query).every(param => allowedParams.includes(param.toLowerCase()));
}

// `/quotes` endpoint

// Defines allowed parameters
server.get('/quotes', (req, res, next) => {
  const allowedParams = ['id', 'author', 'author_like', 'author_id', 'work', 'work_like', 'work_id', 'category', 'genre', 'publish_date', 'quote_length', 'quote_length_gte', 'quote_length_lte', 'quote_like', 'sort', 'order', 'page', 'limit', 'fields'];

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'invalid_query_parameter',
      details: `Invalid query parameter. Make sure your query parameters are correct. Allowed parameters are ${allowedParams.join(', ')}.`
    });
  }

   // Get all quotes
  let quotes = router.db.get('quotes').value();

  // Specifies the default sorting and ordering
  let sortField = 'id';
  let sortOrder = 'asc';
  let limit = parseInt(req.query.limit) || 5;
  let page = parseInt(req.query.page) || 1;

  // Apply operations in the order they appear in the query string
  const operations = Object.keys(req.query);

  operations.forEach(op => {
    switch (op.toLowerCase()) {
      case 'limit':
        const limit = parseInt(req.query.limit);
        quotes = quotes.slice(0, limit);
        break;
      case 'page':
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.limit) || 5; // Default page size is 5
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        quotes = quotes.slice(start, end);
        break;
      case 'sort':
        sortField = req.query.sort.toLowerCase();
        break;
      case 'order':
        sortOrder = req.query.order.toLowerCase();
        break;
      case 'id':
        quotes = quotes.filter(q => q.id === parseInt(req.query.id));
        break;
      case 'author':
        quotes = quotes.filter(q => q.author.toLowerCase() === req.query.author);
        break;
      case 'author_like':
        quotes = quotes.filter(q => q.author.toLowerCase().includes(req.query.author_like));
        break;
      case 'author_id':
        quotes = quotes.filter(q => q.author_id === parseInt(req.query.author_id));
        break;
      case 'work':
        quotes = quotes.filter(q => q.work.toLowerCase() === req.query.work);
        break;
      case 'work_like':
        const workKeywords = req.query.work_like.split(',');
        quotes = quotes.filter(q => workKeywords.some(keyword => q.work.toLowerCase().includes(keyword.trim())));
        break;
      case 'work_id':
        quotes = quotes.filter(q => q.work_id === parseInt(req.query.work_id));
        break;
      case 'category':
        quotes = quotes.filter(q => q.category.toLowerCase() === req.query.category);
        break;
      case 'genre':
        quotes = quotes.filter(q => q.genre.some(g => g.toLowerCase() === req.query.genre));
        break;
      case 'publish_date':
        quotes = quotes.filter(q => q.publish_date === req.query.publish_date);
        break;
      case 'quote_length':
        quotes = quotes.filter(q => q.quote_length === parseInt(req.query.quote_length));
        break;
      case 'quote_length_gte':
        quotes = quotes.filter(q => q.quote_length >= parseInt(req.query.quote_length_gte));
        break;
      case 'quote_length_lte':
        quotes = quotes.filter(q => q.quote_length <= parseInt(req.query.quote_length_lte));
        break;
      case 'quote_like':
        const quoteKeywords = req.query.quote_like.split(',');
        quotes = quotes.filter(q => quoteKeywords.some(keyword => q.quote.toLowerCase().includes(keyword.trim())));
        break;
      case 'sort':
        sortField = req.query.sort.toLowerCase();
        break;
      case 'order':
        sortOrder = req.query.order.toLowerCase();
        break;
      case 'limit':
        limit = parseInt(req.query.limit);
        break;
      case 'page':
        page = parseInt(req.query.page);
        break;
    }
  });

  // Apply final sorting and ordering
  quotes = quotes.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const totalItems = quotes.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  quotes = quotes.slice(startIndex, endIndex);


  // Apply field selection if specified
  if (req.query.fields) {
    const fields = req.query.fields.split(',');
    quotes = quotes.map(quote => {
      const selectedFields = {};
      fields.forEach(field => {
        if (quote.hasOwnProperty(field)) {
          selectedFields[field] = quote[field];
        }
      });
      return selectedFields;
    });
  }

  // Handle case where no quotes match the criteria
  if (quotes.length === 0) {
    return res.status(404).json({
      code: 404,
      error: 'not_found',
      details: 'No quotes match the provided parameters. The resource might not exist or is unavailable.'
    });
  }

  // Prepare the response
  const response = {
    data: quotes
  };

  // Add pagination object to the body only if the page parameter is used
  if (req.query.page) {
    response.pagination = {
      current_page: page,
      page_size: limit,
      total_count: totalItems,
      total_pages: totalPages
    };
  }

  res.status(200).json(response);
});


// `/quotes/random` endpoint

// Handles GET requests for a random quote, with optional filtering
server.get('/quotes/random', (req, res) => {
  const allowedParams = ['author', 'category', 'genre', 'quote_like'];

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'invalid_query_parameter',
      details: `Invalid query parameter. Make sure your query parameters are correct. Allowed parameters are ${allowedParams.join(', ')}.`
    });
  }

  // Get all quotes
  let quotes = router.db.get('quotes').value();

  // Apply filters based on query parameters
  if (req.query.author) quotes = quotes.filter(q => q.author.toLowerCase() === req.query.author);
  if (req.query.category) quotes = quotes.filter(q => q.category.toLowerCase() === req.query.category);
  if (req.query.genre) quotes = quotes.filter(q => q.genre.map(g => g.toLowerCase()).includes(req.query.genre));
  if (req.query.quote_like) {
    const quoteKeywords = req.query.quote_like.split(',');
    quotes = quotes.filter(q => quoteKeywords.some(keyword => q.quote.toLowerCase().includes(keyword.trim())));
  }

  // Handle case where no quotes match the criteria
  if (quotes.length === 0) {
    return res.status(404).json({
      code: 404,
      error: 'not_found',
      details: 'No quotes match the provided parameters. The resource might not exist or is unavailable.'
    });
  }

  // Select and return a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// Error handling middleware

// Catches any errors that weren't handled in the request processing
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    error: 'internal_server_error',
    details: 'An unexpected error occurred. Please try again later. If the problem persists, contact Support.'
  });
});

// Apply the router
server.use(router);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
