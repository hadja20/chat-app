const router = require("express").Router();
const { getOneChannel, getAllChannels, createChannel, deleteChannel, getAllUsersOfChannel } = require('../controllers/ channelController');
const auth = require('../middleware/auth');

router.get('/list', getAllChannels);
router.get('/list/:name', getOneChannel);
router.get('/users/:name', getAllUsersOfChannel);
router.post('/create/:id', createChannel);
router.delete('/delete/:id/:name', deleteChannel);

module.exports = router;