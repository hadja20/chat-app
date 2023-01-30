
const router = require("express").Router()
const { getAllUsers, changeUsername, joinChannel, quitChannel } = require('../controllers/userController');
const auth = require('../middleware/auth');
const { isUserInChannel } = require('../controllers/utils/util');


router.get('/users', getAllUsers);

router.post('/user/:username', changeUsername);
router.post('/join/:id/:name', joinChannel);
router.post('/quit/:id/:name', quitChannel);
router.get('/test/:id/:name', isUserInChannel);

module.exports = router;