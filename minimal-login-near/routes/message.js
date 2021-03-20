const express = require('express');
const Message = require('../models/message');
const router = express.Router();
const sanitizer = require('express-autosanitizer');

function is_loggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

async function is_owner(req, res, next){
  // This slow, fix it
  let promise = await Message.get_message_with_id(req.params.id)
  let message = promise.response[0]
  if(message.creator == req.user){
      return next();
  }
  res.redirect('/')
}

async function deleteById(req, res, next){
  let promise = await Message.delete_by_id(req.params.id)
  res.redirect('/')
}

router.get('/:id/delete', is_loggedIn, is_owner, deleteById)

router.delete('/:id', is_loggedIn, is_owner, deleteById)

router.post('/', sanitizer.route, is_loggedIn, async (req, res, next)=>{
  req.body.message.creator = req.user

  let added = await Message.add_message(req.body.message)
  res.redirect('/')
})

module.exports = router;
