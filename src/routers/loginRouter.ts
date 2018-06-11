import * as passport from "passport";
import * as express from 'express';
import {auth} from '../controllers/authController';

const router = express.Router();

router.post('/auth', auth);

router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
    // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
    (req, res) => {
        console.log(req.user)
    });
// Set up Google auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', "email"] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => {
        console.log(JSON.stringify(req.user));
        res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user))
    });

export default router;