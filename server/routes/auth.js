const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Local routes
 */
router.get('/register', authController.authGetRegister);
router.post('/register', authController.authLocalRegister);
router.get('/login', authController.authGetLogin);
router.post('/login', authController.authPostLogin);
router.get('/auth/complete-profile', authController.authGetCompleteProfile);
router.post('/auth/complete-profile', authController.authPostCompleteProfile);


/**
 * Google routes
 */
router.get('/auth/google/register', authController.authGoogleRegister);
router.get('/google/callback/register', authController.authRegisterCallback);
router.get('/auth/google/login', authController.authGoogleLogin);
router.get('/google/callback/login', authController.authLoginCallback);


/**
 * login failure
 */
router.get('/login-failure', authController.authLoginFailure);


/**
 * logout route
 */
// Logout route
router.get('/logout', authController.authLogout);

module.exports = router;