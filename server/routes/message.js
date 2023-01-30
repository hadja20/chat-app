const router = require("express").Router();
const { createMessage, loadChannelMessages, loadUserMessages } = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/create-message/:sender/:receiver', createMessage);
router.get('/message-channel/:name', loadChannelMessages);
router.get('/message-user/:idUser', loadUserMessages);

module.exports = router;