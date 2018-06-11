import {verifyUser} from "./middlewares/jwtHelper";

const express = require('express');
const bodyParser = require("body-parser");
import * as router from "./routers";
import * as passport from "passport"
import * as FacebookStrategy from 'passport-facebook';
import * as GoogleStrategy from 'passport-google-oauth20';
import {facebook,google} from './login/config';

const app = express();

const port = process.env.PORT || 3000;

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => ({
    id: profile.id,
    name: `${profile.first_name} ${profile.last_name}`,
    email: profile.email
});

// Transform Google profile into user object
const transformGoogleProfile = (profile) => ({
    id: profile.id,
    name: profile.displayName,
    avatar: profile.image.url,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook, async (accessToken, refreshToken, profile, done) => done(null, transformFacebookProfile(profile._json))));

// Register Google Passport strategy
passport.use(new GoogleStrategy(google, async (accessToken, refreshToken, profile, done) => done(null, transformGoogleProfile(profile._json))
));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));


app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(passport.session())
    .use(router.loginRouter)
    .use(verifyUser)
    .use(router.listRouter)
    .use(router.itemRouter);

app.listen(port);
console.log(`App is running on port: ${port}`);

export {app, port};