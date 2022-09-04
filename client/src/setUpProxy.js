const { createProxyMiddleware } = require('http-proxy-middleware');
// npm i http-proxy-middleware --save
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};
