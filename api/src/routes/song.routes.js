const { Router } = require('express');
const ctr = require('../controllers');
const mdw = require('../middlewares');

const router = Router();

router.post('/', mdw.jwtVerify, ctr.createSong);

router.get('/', mdw.jwtVerify, ctr.getUserSongs);

module.exports = router;
