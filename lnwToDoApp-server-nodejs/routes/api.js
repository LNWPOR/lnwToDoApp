var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Users = require('../models/users'),
    Lists = require('../models/lists')
    
router.post('/user/register', function(req, res) {
  Users.register(new Users({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

router.post('/users/login', function(req, res, next) {
  passport.authenticate('local', function(err, users, info) {
    if (err) { return next(err) }
    if (!users) {
      return res.status(401).json({err: info})
    }
    req.logIn(users, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!'})
    });
  })(req, res, next);
});

router.get('/users/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

router.get('/users', function(req, res) {
    Users.find(function(err, Users ) {
        if (err)
            res.send(err)
        res.json(Users);
    });
});

router.get('/users/:username', function(req, res) {
    Users.findOne({ username: req.params.username }, function(err, Users) {
      if (err) return console.error(err);
        res.json(Users);
    });
});

router.get('/lists', function(req, res) {
    Lists.find(function(err, List ) {
        if (err)
            res.send(err)
        res.json(List);
    });
});


module.exports = router;