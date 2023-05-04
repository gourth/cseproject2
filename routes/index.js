const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/pokemon', require('./pokemon'));

module.exports = router;