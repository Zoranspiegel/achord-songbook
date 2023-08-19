const { Router } = require('express');
const ctr = require('../controllers');

const router = Router();

router.get('/', ctr.logUser);

module.exports = router;
