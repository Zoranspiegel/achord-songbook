const { Router } = require('express');
const ctr = require('../controllers');
const mdw = require('../middlewares');

const router = Router();

router.post('/', mdw.jwtVerify, ctr.findOrCreateArtist);

router.get('/', mdw.jwtVerify, ctr.getArtists);

module.exports = router;
