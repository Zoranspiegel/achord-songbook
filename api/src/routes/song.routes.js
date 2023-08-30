const { Router } = require('express');
const ctr = require('../controllers');
const mdw = require('../middlewares');

const router = Router();

router.post('/', mdw.jwtVerify, ctr.createSong);

router.get('/', mdw.jwtVerify, ctr.getUserSongs);

router.get('/deleted', mdw.jwtVerify, ctr.getDeletedUserSongs);

router.get('/:id', mdw.jwtVerify, ctr.getSongDetails);

router.put('/restore/:id', mdw.jwtVerify, ctr.restoreUserSong);

router.put('/:id', mdw.jwtVerify, ctr.updateSong);

router.delete('/:id', mdw.jwtVerify, ctr.deleteUserSong);

module.exports = router;
