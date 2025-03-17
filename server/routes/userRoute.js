const express = require('express');
const router = express.Router();

const {  create, login , refreshtoken, logout   } = require('../controllers/userController');

router.post('/login', login);   

router.post('/register', create);

router.post('/refresh-token', refreshtoken);
router.post('/logout', logout);


module.exports = {userRouter : router}