import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from "../../dbConfig";
exports.seed =  function (knex: Knex): Promise<any> {
    return knex(`${dbConfig.tables.item.name}`).del()
        .then(function () {
            return knex(`${dbConfig.tables.item.name}`).insert([
                {
                    name: "milk",
                    count: 1,
                    list_id: 1,
                    isBought: true
                },
                {
                    name: "bread",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "white yoghurt",
                    count: 2,
                    list_id: 1,
                    isBought: true
                },
                {
                    name: "chocolate yoghurt",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "ham",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "cheese",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "wine",
                    isBought: true,
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "beer",
                    count: 6,
                    list_id: 1,
                },
                {
                    name: "mozarella",
                    count: 2,
                    list_id: 1,
                },
                {
                    name: "soap",
                    isBought: true,
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "paralen",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "fish fillet",
                    count: 3,
                    list_id: 1,
                },
                {
                    name: "magnesium",
                    count: 2,
                    list_id: 1,
                },
                {
                    name: "paralen",
                    isBought: true,
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "tooth brush",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "toothpaste",
                    count: 1,
                    list_id: 1,
                },
                {
                    name: "trash bags",
                    count: 1,
                    list_id: 1,
                },
            ])
        })
}