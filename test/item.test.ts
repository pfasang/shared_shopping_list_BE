import * as chai from "chai";
import * as Joi from "joi";
import {port} from "../src/server";
import knex from "../src/database/knex";
//import {login, randomFields} from "./utilities/testHelper";
import {itemTestOutput, itemListTestOutput} from "../src/utilities/validation/itemValidation";
const app = "http://localhost:" + port;
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

let adminToken: string;
let readerToken: string;
let writerToken: string;

describe("Item tests", ()=> {
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
        describe("Wrong listID", () => {
            const list_ID = 0;
            it("returns 404", () => {
                return chai.request(app)
                    .get(`${baseUrl}/${list_ID}/items`)
                    .catch(err => {
                        expect(err.status).to.eq(404);
                        expect(err.type).to.eq(jsonType);
                    });
            });
        });
    });

    describe("POST Create a item", () => {
        const inputBody = {
            name: "testItem",
            list_id: 3,
            count: 4,
            unit: "l"
        };
        const createInput: any = {...inputBody};

        describe("Correct create with admin", () => {
            it("returns 201", () => {
                return chai.request(app)
                    .post(baseUrl)
                    .send(createInput)
                    .then(res => {
                        expect(res.status).to.eq(201);
                        expect(res.type).to.eq(jsonType);
                        expect(res.body).to.be.an("object");
                        const validatedBody = Joi.validate(res.body, itemTestOutput);
                        expect(validatedBody.error).to.eq(null);
                    });
            });
        });
        describe("Wrong input", () => {
            const inputBody = {
                name: "testItem",
                list_id: "1",
                count: 4
            };
            it("returns 400", () => {
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .catch(err => {
                        expect(err.status).to.eq(400);
                        expect(err.type).to.eq(jsonType);
                    });
            });
        });
        describe("Item already exists", () => {
            const inputBody = {
                name: "itemExists",
                list_id: 3,
                count: 3
            };
            it("returns 400", () => {
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .then(res => {
                        return chai.request(app)
                            .post(baseUrl)
                            .send(inputBody)
                            .then(res=> {
                                expect(res.status).to.not.eq(201);
                            })
                            .catch(err => {
                                expect(err.status).to.eq(400);
                                expect(err.response.type).to.eq(jsonType);
                            });
                    });
            });
        });
    });

    describe("PUT Update Item", () => {
        const inputBody = {
            name: "toUpdateItem",
            list_id: 1,
            count: 3
        };
        let itemID: number;

        describe("Correct UPDATE", () => {
            it("returns 200", async () => {
                const createRes = await
                    chai.request(app)
                        .post(baseUrl)
                        .send(inputBody);
                itemID = createRes.body.id;
                inputBody.name = "updatedItem1";
                const res = await
                    chai.request(app)
                        .patch(`${baseUrl}/${itemID}`)
                        .send(inputBody);
                expect(res.status).to.eq(200);
                expect(res.type).to.eq(jsonType);
                const validateBody = Joi.validate(res.body, itemTestOutput);
                expect(validateBody.error).to.eq(null);
                return res;
            });
        });
    });
    describe("DELETE Item", () => {
        const inputBody = {
            name: "toDeleteItem",
            list_id: 2,
            count: 7
        };
        let itemID: number;

        describe("Correct DELETE", () => {
            it("returns 204",() =>{
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .then(res => {
                        itemID = res.body.id;
                        return chai.request(app)
                            .del(`${baseUrl}/${itemID}`)
                            .then(res => {
                                expect(res.status).to.eq(204);
                            });
                    });
            });
        });
    });
});
