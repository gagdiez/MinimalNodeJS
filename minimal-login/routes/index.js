const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

function register_user(req, res, next){
  var newAccount = new Account({username: req.body.username})
  
  Account.register(newAccount, req.body.password, (err, account) => {
    if (err) {
      return res.render('register', {error: err.message});
    }
    auth(req, res, next, onfail='/register', onsuccess='/')
  });
}

function auth(req, res, next, onfail='/login', onsuccess='/'){
  redirect = passport.authenticate('local', {failureRedirect: `${onfail}`,
                                             successRedirect: `${onsuccess}`,
                                             failureFlash: true})
  redirect(req, res);
}

router.get('/', (req, res) => {
  res.render('index', {user: req.user});
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', register_user);

router.get('/login', (req, res) => {
  res.render('login', {user: req.user, error: req.flash('error')});
});

router.post('/login', auth);

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
