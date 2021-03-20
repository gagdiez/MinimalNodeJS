const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

// Logic -> Move to another file

async function register_user(username, password){
  var newAccount = new Account({username: username});

  return new Promise((resolve, reject) => {

    Account.register(newAccount, password, (error, account) => {
      if (error){ return resolve({success:false, error:error.message}); }
      else{ return resolve({success:true, error:null}); }
    });

  });
}
 
// Routers

function authenticate(req, res, next, onfail='/', onsuccess='/'){
  redirect = passport.authenticate('local', {failureRedirect: `${onfail}`,
                                             successRedirect: `${onsuccess}`,
                                             failureFlash: true})
  redirect(req, res);
}

router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});
 
router.get('/register', (req, res, next) => {
  res.render('register');
});
 
router.post('/register', async (req, res, next) => {
  registered = await register_user(req.body.username, req.body.password);

  if(registered.success){
    authenticate(req, res, next, onfail='/register', onsuccess='/');
  }else{
    res.render('register', {error: registered.error});
  }
});
 
router.get('/login', (req, res, next) => {
  res.render('login', {user: req.user, error: req.flash('error')});
});
 
router.post('/login', (req, res, next) => {
  authenticate(req, res, next, '/login', '/')
});
 
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});
 
module.exports = router;
