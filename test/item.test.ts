import * as chai from "chai";
import * as Joi from "joi";
import {port} from "../src/server";
import knex from "../src/database/knex";
//import {login, randomFields} from "./utilities/testHelper";
import {itemTestOutput, itemListTestOutput} from "../src/utilities/validation/itemValidation";
const app = "http://localhost:" + port;
const chaiHttp = require("chai-http");
const expect = chai.expect, validEmail = "marek.drnzik@materna.com", validPassword = "12345678", validWriterEmail = "john.doe@materna.com", validReaderEmail = "samuel.svelta@materna.com";
chai.use(chaiHttp);

let adminToken: string;
let readerToken: string;
let writerToken: string;

describe("Item tests", ()=> {
/*    before(async () => {
        let res = await login(validEmail, validPassword)
        adminToken = res.body.token;
        res = await login(validReaderEmail, validPassword)
        readerToken = res.body.token;
        res = await login(validWriterEmail, validPassword)
        writerToken = res.body.token;
    });*/

    const baseUrl = "/items";
    const jsonType = "application/json";

    describe("GET all items", () => {
        const baseUrl = "/lists";
        const list_ID = 1;
        describe("Correct GET all items from list", () => {
            it("returns 200", () => {
                return chai.request(app)
                    .get(`${baseUrl}/${list_ID}/items`)
                    .then(res => {
                        expect(res.status).to.eq(200);
                        expect(res.type).to.eq(jsonType);
                        expect(res.body).to.be.an("array");
                        const validatedBody = Joi.validate(res.body, itemListTestOutput);
                        expect(validatedBody.error).to.eq(null);
                    });
            });
        });
    });
});
