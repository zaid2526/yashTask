const express = require('express');

const authController = require('../controllers/auth.controller');
const Auth=require('../middleware/auth')

const router = express.Router();

router.post('/login',authController.postLogIn);
router.get('/logout',Auth.auth,authController.getLogOut);

module.exports=router;