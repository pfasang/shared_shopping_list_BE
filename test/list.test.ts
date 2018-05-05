import * as chai from "chai";
import * as Joi from "joi";
import {port} from "../src/server";
import knex from "../src/database/knex";
//import {login, randomFields} from "./utilities/testHelper";
import {listTestOutput, listListTestOutput} from "../src/utilities/validation/listValidation";
const app = "http://localhost:" + port;
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

let adminToken: string;
let readerToken: string;
let writerToken: string;

describe("List tests", ()=> {
    before(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
        /*let res = await login(validEmail, validPassword)
        adminToken = res.body.token;
        res = await login(validReaderEmail, validPassword)
        readerToken = res.body.token;
        res = await login(validWriterEmail, validPassword)
        writerToken = res.body.token;*/
    });

    const baseUrl = "/lists";
    const jsonType = "application/json";

    describe("GET all lists", () => {
        const baseUrl = "/lists";
        describe("Correct GET", () => {
            it("returns 200", () => {
                return chai.request(app)
                    .get(`${baseUrl}`)
                    .then(res => {
                        expect(res.status).to.eq(200);
                        expect(res.type).to.eq(jsonType);
                        expect(res.body).to.be.an("array");
                        const validatedBody = Joi.validate(res.body, listListTestOutput);
                        expect(validatedBody.error).to.eq(null);
                    });
            });
        });
    });
});