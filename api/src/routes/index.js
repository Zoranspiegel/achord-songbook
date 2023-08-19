const { Router } = require('express');
const fs = require('fs');
const router = Router();

fs.readdirSync(__dirname).forEach(file => {
  if (file.split('.').slice(1).join('.') === 'routes.js') {
    const endpoint = `/${file.split('.')[0]}`;
    const route = require(`./${file}`);
    router.use(endpoint, route);
  }
});

module.exports = router;
