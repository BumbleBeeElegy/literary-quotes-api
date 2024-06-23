const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Custom route for fetching a random quote
server.get('/quotes/random', (req, res) => {
  const quotes = router.db.get('quotes').value(); // Get all quotes
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]; // Select a random quote
  res.jsonp(randomQuote);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
