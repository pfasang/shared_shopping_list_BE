import * as chai from 'chai';
import chaiHttp = require('chai-http');

import {port} from '../../src/server';
let app = 'http://localhost:' + port;

chai.use(chaiHttp)

//test login function
export const login = (email: string, password: string) => {
    return chai.request(app)
        .post('/auth')
        .send({
            email: email,
            password: password
        });
}