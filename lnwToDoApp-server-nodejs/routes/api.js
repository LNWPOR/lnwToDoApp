var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user'),
    List = require('../models/list')
    
router.post('/users/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

router.post('/users/login', function(req, res, next) {
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

router.get('/users/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

router.get('/users', function(req, res) {
    User.find(function(err, users ) {
        if (err)
            res.send(err)
        res.json(users);
    });
});

router.get('/users/:id', function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) return console.error(err);
        res.json(user);
    });
});

router.get('/lists', function(req, res) {
    List.find(function(err, lists ) {
        if (err)
            res.send(err)
        res.json(List);
    });
});

router.post('/lists' , function(req, res) {
  var list = new List(req.body);
  list.save(function(err) {
    if (err) {
      return res.send(err);
    }
  });
});

router.get('/lists/:id', function(req, res) {
    List.findOne({ _id: req.params.id }, function(err, list) {
      if (err) return console.error(err);
        res.json(list);
    });
});



module.exports = router;