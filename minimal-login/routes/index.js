const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {user: req.user});
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {

  var newAccount = new Account({username: req.body.username})

  Account.register(newAccount, req.body.password, (err, account) => {
    if (err) {
      return res.render('register', {error: err.message});
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user, error: req.flash('error')});
});

router.post('/login',
            passport.authenticate('local',
                                  {failureRedirect: '/login',
                                   successRedirect: '/',
                                   failureFlash: true})
);

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
