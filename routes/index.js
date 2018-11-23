var express = require('express');
var router = express.Router();
var passport = require('passport');

function authenticationMiddleware()
{
  return function(req, res, next)
  {
    if(req.isAuthenticated());
    {
      return next();
    }  
    res.redirect('/login?fail=true');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login - Clínica Saúde', message: null });
});

router.get('/login', function(req, res)
{
  if(req.query.fail)
  {
    res.render('login', { message: 'Usuário e/ou senha incorretos!', title: 'Login - Clínica Saúde'} );
  } else
  {
    res.render('login', { message: null, title: 'Login - Clínica Saúde' });
  }
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/doctor-dashboard', failureRedirect: '/login?fail=true'})
);

router.get('/doctor-dashboard', authenticationMiddleware (), function(req, res)
{
  res.render('dashboard-doctor', { title: 'Clínica Saúde' });
});

/* GET Userlist page. */
router.get('/receptionlist', authenticationMiddleware(), function(req, res)
{
  var db = require('../db');
  var Users = db.Mongoose.model('receptions', db.receptionSchema, 'receptions');
  Users.find({}).lean().exec(
    function(e, docs)
    {
        res.render('receptionlist', { "receptionlist": docs });
    });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
 
  var db = require("../db");
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var Users = db.Mongoose.model('receptions', db.UserSchema, 'receptions');
  var user = new Users({ name: userName, email: userEmail });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          res.redirect("userlist");
      }
  });
});

router.get('/newuser', function(req, res)
{
  res.render('newuser', { title: 'Add new user' });
});

module.exports = router;
