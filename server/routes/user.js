
const router = require("express").Router()
const {getAllUsers  } = require('../controllers/userController');
const auth=require('../middleware/auth')


router.get('/users',auth,getAllUsers);

module.exports=router;