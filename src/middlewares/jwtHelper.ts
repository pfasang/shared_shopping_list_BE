import * as jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface IToken {
    id: number,
}

/**
 * Verification of user - Function to verify user
 * @param req - request
 * @param res - result
 * @param next - next() function
 * @returns {Promise<Response | ChaiHttp.Request | void | boolean>}
 */
export const verifyUser = async (req, res, next) => {
    let uToken: IToken;
    //get token from request
    let token = req.body.token || req.query.token || req.headers['token'];
    if (!token) {
        return res.status(401).json();
    }
    try {
        //jsonwebtoken function to verify token
        uToken = <IToken> jwt.verify(token, 'MySecret');
    }
    catch(err) {
        return res.status(401).send(err);
    }

    //get user from database
    const user = await new User({id: uToken.id}).fetch();
    if (!user) {
        return res.status(401).json();
    }

    //save user object to request
    req.user = user;
    next();
};
