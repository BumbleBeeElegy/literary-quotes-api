const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('literary-quotes-db.json');
const middlewares = jsonServer.defaults();

// Apply default json-server middlewares
server.use(middlewares);

// Basic Authorization middleware

// Custom logic to allow for required authorization with basic auth header and base64-encrypted credentials or to bypass the auth check with a custom header
server.use((req, res, next) => {

  // Check for the bypass header first
  if (req.headers['x-bypass-auth'] === 'true') {
    return next(); // Skip the rest of the middleware
  }

  // Check for the basic auth header
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
          details: 'The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.'
        });
      }
      const [key, value] = param.split('=');
      if (!key || !value) {
        return res.status(400).json({
          code: 400,
          error: 'bad_request',
          details: 'The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.'
        });
      }
      if (!key.match(/^[a-zA-Z_]+$/)) {
        return res.status(400).json({
          code: 400,
          error: 'bad_request',
          details: 'The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.'
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
  const allowedCategories = ['Fiction', 'Nonfiction'];
  const allowedGenres = ['Adventure', 'Biography', 'Children\'s', 'Dystopian', 'Essays', 'Fantasy', 'Feminism', 'Historical', 'Horror', 'Humanities', 'Humor', 'Literary', 'Modernist', 'Mystery', 'Philosophy', 'Romance', 'Science', 'Sci-Fi', 'Self-help', 'Spirituality', 'Women\'s'];
  const allowedFields = ['id', 'author', 'author_id', 'work', 'work_id', 'category', 'genre', 'publish_date', 'quote_length', 'quote'];

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'invalid_query_parameter',
      details: `Invalid query parameter. Make sure your query parameters are correct.`
    });
  }

  try {
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
          limit = parseInt(req.query.limit);
          break;
        case 'page':
          page = parseInt(req.query.page);
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
            if (!allowedCategories.map(c => c.toLowerCase()).includes(req.query.category.toLowerCase())) {
              return res.status(400).json({
                code: 400,
                error: 'bad_request',
                details: `The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.`
              });
            }
            quotes = quotes.filter(q => q.category.toLowerCase() === req.query.category.toLowerCase());
            break;
        case 'genre':
          if (!allowedGenres.map(g => g.toLowerCase()).includes(req.query.genre.toLowerCase())) {
            return res.status(400).json({
              code: 400,
              error: 'bad_request',
              details: `The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.`
            });
          }
          quotes = quotes.filter(q => q.genre.some(g => g.toLowerCase() === req.query.genre.toLowerCase()));
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
      }
    });

    // Apply final sorting and ordering
    quotes = quotes.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Calculate pagination info before applying limit and page
    const totalItems = quotes.length;
    const totalPages = Math.ceil(totalItems / limit);
    const hasMultiplePages = totalPages > 1;

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    quotes = quotes.slice(startIndex, endIndex);

    // Apply field selection if specified
    if (req.query.fields) {
      const fields = req.query.fields.split(',');
      const invalidFields = fields.filter(field => !allowedFields.includes(field));
      if (invalidFields.length > 0) {
        return res.status(400).json({
          code: 400,
          error: 'bad_request',
          details: `The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.`
        });
      }
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
      items: quotes
    };

  // Include pagination object if there are multiple pages or if 'page' parameter is used
  if (hasMultiplePages || req.query.page) {
    response.pagination = {
      current_page: page,
      page_size: limit,
      total_count: totalItems,
      total_pages: totalPages
    };
  }

    console.log('Sending response:', response);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


// `/quotes/random` endpoint

// Handles GET requests for a random quote, with optional filtering
server.get('/quotes/random', (req, res) => {
  const allowedParams = ['author', 'category', 'genre', 'quote_like', 'fields'];
  const allowedCategories = ['Fiction', 'Nonfiction'];
  const allowedGenres = ['Adventure', 'Biography', 'Children\'s', 'Dystopian', 'Essays', 'Fantasy', 'Feminism', 'Historical', 'Horror', 'Humanities', 'Humor', 'Literary', 'Modernist', 'Mystery', 'Philosophy', 'Romance', 'Science', 'Sci-Fi', 'Self-help', 'Spirituality', 'Women\'s'];
  const allowedFields = ['id', 'author', 'author_id', 'work', 'work_id', 'category', 'genre', 'publish_date', 'quote_length', 'quote'];

  if (!validateQueryParams(allowedParams, req)) {
    return res.status(400).json({
      code: 400,
      error: 'bad_request',
      details: `The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.`
    });
  }

  // Get all quotes
  let quotes = router.db.get('quotes').value();

  // Apply filters based on query parameters
  if (req.query.author) quotes = quotes.filter(q => q.author.toLowerCase() === req.query.author);
  if (req.query.category) {
  if (!allowedCategories.map(c => c.toLowerCase()).includes(req.query.category.toLowerCase())) {
    return res.status(400).json({
      code: 400,
      error: 'bad_request',
      details: `The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.`
    });
  }
  quotes = quotes.filter(q => q.category.toLowerCase() === req.query.category.toLowerCase());
  }
  if (req.query.genre) {
    if (!allowedGenres.map(g => g.toLowerCase()).includes(req.query.genre.toLowerCase())) {
      return res.status(400).json({
        code: 400,
        error: 'bad_request',
        details: `The request could not be understood. This could be due to incorrect syntax or an invalid parameter. Check your query string for errors.`
      });
    }
    quotes = quotes.filter(q => q.genre.some(g => g.toLowerCase() === req.query.genre.toLowerCase()));
  }
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

  // Select a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Apply field selection if specified
  if (req.query.fields) {
    const fields = req.query.fields.split(',').filter(field => allowedFields.includes(field));
    const selectedFields = {};
    fields.forEach(field => {
      if (randomQuote.hasOwnProperty(field)) {
        selectedFields[field] = randomQuote[field];
      }
    });
    return res.json(selectedFields);
  }

  // If no field selection, return the full random quote
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
