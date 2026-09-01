const { getDefaultConfig } = require('expo/metro-config');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = getDefaultConfig(__dirname);

const API_TARGET =
  process.env.EXPO_PUBLIC_API_PROXY_TARGET ?? 'https://iesdata.iliauni.edu.ge:2026';

const apiProxy = createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  secure: false,
  pathRewrite: (path) => path.replace(/^\/ies-api/, '/api'),
});

config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url?.startsWith('/ies-api')) {
        return apiProxy(req, res, next);
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
