
const router = require("express").Router()
const { getAllUsers, changeUsername, joinChannel } = require('../controllers/userController');
const auth = require('../middleware/auth')


router.get('/users', getAllUsers);
router.post('/user/:username', changeUsername);
router.post('/join/:id/:name', joinChannel);

module.exports = router;