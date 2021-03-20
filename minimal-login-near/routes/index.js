const express = require('express');
const Messages = require('../models/message');
const router = express.Router();

router.get('/', async (req, res, next) => {
      let promise = await Messages.get_all_messages()
      let all_messages = promise.response
      res.render('index', {user: req.user, messages:all_messages});
});
 
module.exports = router;
