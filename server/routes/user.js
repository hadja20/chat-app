
const router = require("express").Router()
const { getAllUsers, changeUsername, joinChannel, quitChannel } = require('../controllers/userController');
const auth = require('../middleware/auth')


router.get('/users', getAllUsers);
router.post('/user/:username', changeUsername);
router.post('/join/:id/:name', joinChannel);
router.post('/quit/:id/:name', quitChannel);

module.exports = router;