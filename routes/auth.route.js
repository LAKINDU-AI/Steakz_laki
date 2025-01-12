const router = require('express').Router();
exports.router = router;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.prisma = prisma;
const passport = require('passport');
const connectEnsure = require('connect-ensure-login');


router.get(
    '/login',
    connectEnsure.ensureLoggedOut({redirectTo: '/'}), 
    async (req, res, next) => {
      res.render('login');
});

router.post(
    '/login',
    connectEnsure.ensureLoggedOut({redirectTo: '/'}), 
    passport.authenticate('local', {
      successRedirect: '/user/profile',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })
  );



router.get(
    '/register',
    connectEnsure.ensureLoggedOut({redirectTo: '/'}), 
    async (req, res, next) => {
    res.render('register');
});

router.get(
    '/logout', 
    connectEnsure.ensureLoggedIn({redirectTo: '/'}),
    (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
  

module.exports = router;

