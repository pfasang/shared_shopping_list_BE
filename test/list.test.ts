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

    describe("POST Create a list", () => {
        const inputBody = {
            title: "createList",
            owner_id: 1
        };
        const createInput: any = {...inputBody};

        describe("Correct create", () => {
            it("returns 201", () => {
                return chai.request(app)
                    .post(baseUrl)
                    .send(createInput)
                    .then(res => {
                        expect(res.status).to.eq(201);
                        expect(res.type).to.eq(jsonType);
                        expect(res.body).to.be.an("object");
                        const validatedBody = Joi.validate(res.body, listTestOutput);
                        expect(validatedBody.error).to.eq(null);
                    });
            });
        });

        describe("Wrong input", () => {
            const inputBody = {
                title: 654981,
                owner_id: 1
            };
            it("returns 400", () => {
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .then(res => {
                        expect(res.status).to.not.eq(201);
                    })
                    .catch(err => {
                        expect(err.status).to.eq(400);
                        expect(err.response.type).to.eq(jsonType);
                    });
            });
        });

        describe("List already exists", () => {
            const inputBody = {
                title: "listExists",
                owner_id: 2
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

    describe("PATCH Update List", () => {
        const inputBody = {
            title: "toUpdateList",
            owner_id: 3,
        };
        let listID: number;

        describe("Correct UPDATE", () => {
            it("returns 200", async () => {
                const createRes = await
                    chai.request(app)
                        .post(baseUrl)
                        .send(inputBody);
                listID = createRes.body.id;
                inputBody.title = "updatedList1";
                const res = await
                    chai.request(app)
                        .patch(`${baseUrl}/${listID}`)
                        .send(inputBody);
                expect(res.status).to.eq(200);
                expect(res.type).to.eq(jsonType);
                const validateBody = Joi.validate(res.body, listTestOutput);
                expect(validateBody.error).to.eq(null);
                return res;
            });
        });
        describe("Wrong ID in URL", () => {
            it("returns 404", () => {
                const inputBody = {
                    title: "wrongIDinURL",
                    owner_id: 3,
                };
                return chai.request(app)
                    .patch(`${baseUrl}/999999`)
                    .send(inputBody)
                    .then(res => {
                        expect(res.status).to.not.eq(200);
                    })
                    .catch(err => {
                        expect(err.status).to.eq(404);
                        expect(err.response.type).to.eq(jsonType);
                    });
            });
        });
        describe("Wrong fields", () => {
            const inputBody = {
                title: "wrongFields",
                owner_id: 3,
            };
            it("returns 400", async () => {
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .then(res => {
                        listID = res.body.id;
                        inputBody.title = "ss";
                        return chai.request(app)
                            .patch(`${baseUrl}/${listID}`)
                            .send(inputBody)
                            .then(res => {
                                expect(res.status).to.not.eq(200);
                            })
                            .catch(err => {
                                expect(err.status).to.eq(400);
                                expect(err.response.type).to.eq(jsonType);
                            });
                    });
            });
        });
    });

    describe("DELETE List", () => {
        const inputBody = {
            title: "toDeleteList",
            owner_id: 2,
        };
        let listID: number;

        describe("Correct DELETE with no items in it", () => {
            it("returns 204",() =>{
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .then(res => {
                        listID = res.body.id;
                        return chai.request(app)
                            .del(`${baseUrl}/${listID}`)
                            .then(res => {
                                expect(res.status).to.eq(204);
                            });
                    });
            });
        });
        describe("Correct DELETE with all related items", () => {
            const inputBody = {
                title: "toDeleteListWithItems",
                owner_id: 2,
            };
            const itemBody = {
                name: "itemInDeleteList",
                list_id: 0,
                count: "3"
            };
            it("returns 204",() =>{
                return chai.request(app)
                    .post(baseUrl)
                    .send(inputBody)
                    .then(res => {
                        listID = res.body.id;
                        itemBody.list_id = listID;
                        return chai.request(app)
                            .post("/items")
                            .send(itemBody)
                            .then(res => {
                                return chai.request(app)
                                    .del(`${baseUrl}/${listID}`)
                                    .then(res => {
                                        expect(res.status).to.eq(204);
                                    });
                            });
                    });
            });
        });
        describe("Wrong ID in URL", () => {
            it("returns 404", () => {
                return chai.request(app)
                    .del(`${baseUrl}/999999`)
                    .send(inputBody)
                    .then(res => {
                        expect(res.status).to.not.eq(204);
                    })
                    .catch(err => {
                        expect(err.status).to.eq(404);
                        expect(err.response.type).to.eq(jsonType);
                    });
            });
        });
    });

});