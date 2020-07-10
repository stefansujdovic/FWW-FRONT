const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


// const sitemapOptions = {
//   root: __dirname + '/static/sitemap/',
//   headers: {
//     'Content-Type': 'text/xml;charset=UTF-8'
//   }
// };

const robotsOptions = {
  root: __dirname + '/static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8',
  }
}

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  // serve sitemap
  // server.get('/sitemap.xml', (req, res) => res.status(200).sendFile('sitemap.xml', sitemapOptions));

  server.get('/robots.txt', (req, res) => (
    res.status(200).sendFile('robots.txt', robotsOptions)
  ));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Read on http://localhost:3000');
  });
});