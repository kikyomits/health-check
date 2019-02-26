'use strict';

var express = require('express');
var router = express.Router();

// route to color.js
router.use('', require('./color.js'));
module.exports = router;