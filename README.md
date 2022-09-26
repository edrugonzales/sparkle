# SPARKLE PWA

## [Demo of PWA](https://app-sparkle.netlify.app/)

## 🧐

This is the PWA version of the flutter application

## 🤓

Gatsby is commonly used as a static site generator. However, in this project the `/product` route is generated dynamically using the Gatsby createPage API. To stop the client side router serving the 404 page on `/product` requests, there is a [server redirect](.netlify.toml) and a [rather obscure conditional check](./src/pages/404.js).

### 🏗

Clone repository

- `npm install`
- `npm start` to develop
- `npm run build` to build
- `npm run serve` to serve built site
