const express = require('express');
const bodyParser = require("body-parser");
import * as router from "./routers";
import * as passport from "passport"
import * as FacebookStrategy from 'passport-facebook';
import {facebook} from './login/config';

const app = express();

const port = process.env.PORT || 3000;

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => ({
    name: profile.name,
    avatar: profile.picture.data.url,
});


// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook, async (accessToken, refreshToken, profile, done) => done(null, transformFacebookProfile(profile._json))));


// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));


app.get('/', (req, res) => res.send('Hello World!.'));
app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use(passport.session())
    .use(router.loginRouter)
    .use(router.listRouter)
    .use(router.itemRouter);

app.listen(port);
console.log(`App is running on port: ${port}`);

export {app, port};