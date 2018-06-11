import * as jwt from 'jsonwebtoken';
import {User} from '../models';
import * as bcrypt from 'bcrypt';

const secret = 'MySecret';
/**
 * Authorization function
 * @param req - request
 * @param res - result
 * @returns {Promise<void>} Returns admin object and token, in case of error returns 401 status and empty json.
 */
export const auth = async (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    //check if email and password are set
    if (!inputEmail || !inputPassword) {
        return res.status(401).json();
    }
    
    //check if user exists
    const user = await new User().where({email: inputEmail}).fetch();
    if (!user) {
        return res.status(401).json();
    }

    //check if password is correct
    const isCorrectPassword = await bcrypt.compare(inputPassword, user.attributes.password);
    if (!isCorrectPassword) {
        return res.status(401).json();
    }

    // returning token and admin object
    res.status(200).send({
        token: jwt.sign({id: user.attributes.id}, secret),
        user: user.toJSON()
    });
};