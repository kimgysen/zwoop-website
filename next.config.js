/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withTM = require('next-transpile-modules')([
    '@chakra-ui/css-reset',
    '@chakra-ui/layout',
]);

const config = {
  publicRuntimeConfig: {
    apiHost: 'localhost',
    apiPort: 8080,
    apiUser: 'zwoop',
    apiPassword: 'zwoop'
  },
  env: {
    BASE_URL: process.env.BASE_URL
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/home',
      //   permanent: true
      // }
    ]
  }
};

module.exports = withPlugins([withTM], config);
