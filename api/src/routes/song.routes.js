const { Router } = require('express');
const ctr = require('../controllers');
const mdw = require('../middlewares');

const router = Router();

// CREATE
router.post('/', mdw.jwtVerify, ctr.createSong);

// READ
router.get('/', mdw.jwtVerify, ctr.getUserSongs);

router.get('/deleted', mdw.jwtVerify, ctr.getDeletedUserSongs);

router.get('/:id', mdw.jwtVerify, ctr.getSongDetails);

// UPDATE
router.put('/restore/:id', mdw.jwtVerify, ctr.restoreUserSong);

router.put('/:id', mdw.jwtVerify, ctr.updateSong);

// DELETE
router.delete('/:id', mdw.jwtVerify, ctr.deleteUserSong);

module.exports = router;
