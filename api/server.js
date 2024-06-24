const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('literary-quotes-db.json');
const middlewares = jsonServer.defaults();

// Apply default json-server middlewares
server.use(middlewares);

// Basic Authorization middleware

// Checks for the presence of a valid Basic Auth header (this does not validate the credentials)
server.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      code: 401,
      error: 'unauthorized',
      details: 'Authentication failed. Make sure your request includes the Authorization header with Base64-encoded credentials.'
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

  if (!credentials.includes(':')) {
    return res.status(401).json({
      code: 401,
      error: 'unauthorized',
      details: 'Invalid credentials format. Use "username:password" format.'
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
      details: 'The server has received too many requests. Please wait a moment and try again.'
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

// Helper function to validate query parameters
function validateQueryParams(allowedParams, req) {
  return Object.keys(req.query).every(param => allowedParams.includes(param.toLowerCase()));
}

// `/quotes` endpoint

// Defines behaviour for allowed parameters, filtering, pagination, and sorting
server.get('/quotes', (req, res, next) => {
  const allowedParams = ['id', 'author', 'author_like', 'author_id', 'work', 'work_like', 'work_id', 'category', 'genre', 'publish_date', 'quote_length', 'quote_length_gte', 'quote_length_lte', 'quote_like', 'sort', 'order', 'page', 'limit'];

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'bad_request',
      details: `Invalid query parameter. Allowed parameters are: ${allowedParams.join(', ')}`
    });
  }

  // Pagination setup
  let { page = 1, limit = 5, sort = 'id', order = 'asc' } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  // Get all quotes
  let quotes = router.db.get('quotes').value();

  // Apply filters based on query parameters
  if (req.query.author) quotes = quotes.filter(q => q.author.toLowerCase() === req.query.author);
  if (req.query.author_like) quotes = quotes.filter(q => q.author.toLowerCase().includes(req.query.author_like));
  if (req.query.author_id) quotes = quotes.filter(q => q.author_id === parseInt(req.query.author_id));
  if (req.query.work) quotes = quotes.filter(q => q.work.toLowerCase() === req.query.work);
  if (req.query.work_like) {
    const workKeywords = req.query.work_like.split(',');
    quotes = quotes.filter(q => workKeywords.some(keyword => q.work.toLowerCase().includes(keyword.trim())));
  }
  if (req.query.work_id) quotes = quotes.filter(q => q.work_id === parseInt(req.query.work_id));
  if (req.query.category) quotes = quotes.filter(q => q.category.toLowerCase() === req.query.category);
  if (req.query.genre) quotes = quotes.filter(q => q.genre.map(g => g.toLowerCase()).includes(req.query.genre));
  if (req.query.publish_date) quotes = quotes.filter(q => q.publish_date === req.query.publish_date);
  if (req.query.quote_length) quotes = quotes.filter(q => q.quote_length === parseInt(req.query.quote_length));
  if (req.query.quote_length_gte) quotes = quotes.filter(q => q.quote_length >= parseInt(req.query.quote_length_gte));
  if (req.query.quote_length_lte) quotes = quotes.filter(q => q.quote_length <= parseInt(req.query.quote_length_lte));
  if (req.query.quote_like) {
    const quoteKeywords = req.query.quote_like.split(',');
    quotes = quotes.filter(q => quoteKeywords.some(keyword => q.quote.toLowerCase().includes(keyword.trim())));
  }

  // Sort quotes
  quotes = quotes.sort((a, b) => {
    if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
    if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const totalCount = quotes.length;
  const totalPages = Math.ceil(totalCount / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedQuotes = quotes.slice(start, end);

  // Send response
  res.json({
    quotes: paginatedQuotes,
    pagination: {
      current_page: page,
      page_size: limit,
      total_count: totalCount,
      total_pages: totalPages
    }
  });
});

// /quotes/random endpoint
// Handles GET requests for a random quote, with optional filtering
server.get('/quotes/random', (req, res) => {
  const allowedParams = ['author', 'category', 'genre', 'quote_like'];

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'bad_request',
      details: `Invalid query parameter. Allowed parameters are: ${allowedParams.join(', ')}`
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
      details: 'No quotes match the provided parameters. The resource might not exist or it might be unavailable.'
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
