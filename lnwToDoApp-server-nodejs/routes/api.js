var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user'),
    List = require('../models/list')
    
router.post('/user/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

router.post('/user/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({err: info})
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!'})
    });
  })(req, res, next);
});

router.get('/user/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

router.get('/user', function(req, res) {
    User.find(function(err, User ) {
        if (err)
            res.send(err)
        res.json(User);
        console.log(User);
    });
});

router.get('/user/:username', function(req, res) {
    User.findOne({ username: req.params.username }, function(err, User) {
      if (err) return console.error(err);
        res.json(User);
    });
});

router.get('/list', function(req, res) {
    List.find(function(err, List ) {
        if (err)
            res.send(err)
        res.json(List);
    });
});


module.exports = router;