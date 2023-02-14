const router = require("express").Router();
const { createMessageUser,createMessageChannel, loadChannelMessages, loadUserMessages } = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/send/message/user/:sender/:receiver', createMessageUser);
router.post('/send/message/channel/:sender/:receiver', createMessageChannel);
router.get('/message/:name', loadChannelMessages);
router.get('/message/user/:sender/:receiver', loadUserMessages);

module.exports = router;