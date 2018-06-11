import * as chai from 'chai';
import {port} from '../src/server';
import knex from '../src/database/knex';

const app = 'http://localhost:' + port;
const chaiHttp = require('chai-http');
const expect = chai.expect, validEmail = 'john.doe@latasna.com', validPassword = '12345678', wrongEmail="wrong email", wrongPassword = "wrong password", authUrl = "/auth";
chai.use(chaiHttp);


describe("Authorization tests", ()=> {
    before(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });

    describe("Login with correct parameters", ()=> {
        it("returns 200", async() => {
            const res = await chai.request(app)
                .post(authUrl)
                .send({email: validEmail, password : validPassword});
            expect(res.type).to.eq("application/json");
            expect(res.body).to.have.property('token');
            expect(res.body.user).to.be.an('object');
            expect(res.body.user).to.have.property('id');
            expect(res.body.user).to.have.property('name');
            expect(res.body.user).to.have.property('email');
            expect(res.body.user).to.have.property('createdAt');
            expect(res.body.user).to.have.property('modifiedAt');
            expect(res.body.user).to.not.have.property('password');
            expect(res.status).to.eq(200);
            return res;
        });
    });

    describe("Login with missing parameters", ()=> {
        describe("Missing email", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({password : validPassword})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
        describe("Missing password", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({email : validEmail})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
        describe("Missing email and password", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
    });
    describe("Login with wrong parameters", ()=> {

        describe("Wrong email", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({email: wrongEmail})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
        describe("Wrong password", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({password : wrongPassword})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
        describe("Wrong email and password", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({email : wrongEmail, password : wrongPassword})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
        describe("Wrong email and valid password", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({email : wrongEmail, password : validPassword})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
        describe("Valid email and wrong password", ()=> {
            it("returns 401", () => {
                return chai.request(app)
                    .post(authUrl)
                    .send({email : validEmail, password : wrongPassword})
                    .catch(err => {
                        expect(err.response.type).to.eq("application/json");
                        expect(err.status).to.eq(401);
                    });
            });
        });
    });
});
