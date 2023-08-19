const { Router } = require('express');
const ctr = require('../controllers');

const router = Router();

router.post('/login', ctr.logUser);

module.exports = router;
