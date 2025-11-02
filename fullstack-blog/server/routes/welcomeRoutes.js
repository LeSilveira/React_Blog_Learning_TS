const express = require('express');
const router = express.Router();

const {welcomeMessage} = require('../controllers/welcomeController');

router.get('/', welcomeMessage);  

module.exports = router;