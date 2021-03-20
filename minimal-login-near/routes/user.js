const express = require('express');
const passport = require('passport');
const router = express.Router();

function authenticate(req, res, next){
  // Authenticate and send a response to the user
  passport.authenticate('local', function(err, user, info){
    if (err || !user){
      res.send({'success': false})
      return
    }
  
    req.logIn(user, (err) => {
      if(err){res.send({'success': false})}
      else{res.send({'success': true})}
    });

  })(req, res, next)
}


router.post('/login', authenticate)

router.get('/logout', (req, res, next) => {
  req.logout();
  res.send({'success':true})
});
 
module.exports = router;
