import * as express from 'express';
import * as passport from "passport";

const router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
    // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
    (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));
// Set up Google auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

export default router;