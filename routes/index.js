var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localSrategy = require('passport-local');
passport.use(new localSrategy(userModel.authenticate()));
const upload = require('./multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* POST Login page. */

router.post('/login', passport.authenticate("local",{
  failureRedirect: '/',
  successRedirect:'/profile'
}),function(req, res, next) {
  res.render('login');
});
// Logout
router.get('/logout', function(req, res,next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
   });
});


// Profile
router.get('/profile', isLoggedIn,function(req, res, next) {
  res.render('Profile');
});
// Profile
router.post('/fileupload', upload.single("profile_pic"), async function(req, res, next) {
  if(!req.file){
    return res.status('400').send('No Files');
  }
  res.send("File Uploaded SuceesFully");
  // res.send('Profile Image Uploaded');
  // const user =await userModel.findOne({username:req.session.passport.user});
  // user.profile_pic = req.file.filename;
  // user.profile_pic = req.file.path;
  // await user.save();
  res.redirect('/profile');
});


/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
/* POST Register page Data. */

router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    contact_number: req.body.contact_number
  })
  userModel.register(data, req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
