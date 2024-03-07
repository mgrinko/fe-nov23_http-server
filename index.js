// create simple http server
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const port = process.env.PORT || 3000;

const messages = []

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';

    await new Promise((resolve, reject) => {
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
  
      req.on('end', () => {
        messages.push(body);
        resolve();
      });
    });
  }

  const data = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');

  const html = data
    .replace('{{SERVER_URL}}', process.env.SERVER_URL || '')
    .replace('{{MESSAGES}}', messages.map(m => `<p>${m}</p>`).join(''));

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
});

server.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
