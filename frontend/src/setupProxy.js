const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://8000-rainbow6890-chatgptinte-mqnjwdai10q.ws-eu104.gitpod.io/',
      changeOrigin: true,
    })
  );
};