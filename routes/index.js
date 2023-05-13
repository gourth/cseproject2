const express = require('express');
// const router = express.Router();
const passport = require('passport');
const router = require("express").Router();

router.use('/', require('./swagger'));
router.use('/pokemon', require('./pokemon'));
router.use('/trainers', require('./trainers'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;