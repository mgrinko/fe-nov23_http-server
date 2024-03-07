// create simple http server
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
