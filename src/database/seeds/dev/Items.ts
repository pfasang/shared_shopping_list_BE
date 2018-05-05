import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from "../../dbConfig";
exports.seed =  function (knex: Knex): Promise<any> {
    return knex(`${dbConfig.tables.item.name}`).del()
        .then(function () {
            return knex(`${dbConfig.tables.item.name}`).insert([
                {
                    name: "milk",
                    count: "1",
                    list_id: 1,
                    isBought: true
                },
                {
                    name: "bread",
                    count: "1",
                    list_id: 1,
                },
                {
                    name: "white yoghurt",
                    count: "3",
                    list_id: 1,
                    isBought: true
                },
                {
                    name: "chocolate yoghurt",
                    count: "4",
                    list_id: 1,
                },
                {
                    name: "ham",
                    count: "0.25",
                    list_id: 1,
                    unit: "kg"
                },
                {
                    name: "cheese",
                    count: "2",
                    list_id: 1,
                },
                {
                    name: "wine",
                    isBought: true,
                    count: "0.75",
                    list_id: 1,
                    unit: "l"
                },
                {
                    name: "beer",
                    count: "6",
                    list_id: 1,
                },
                {
                    name: "mozarella",
                    count: "2",
                    list_id: 1,
                },
                {
                    name: "soap",
                    isBought: true,
                    count: "1",
                    list_id: 2,
                    unit: "x"
                },
                {
                    name: "paralen",
                    count: "1",
                    list_id: 3,
                },
                {
                    name: "fish fillet",
                    count: "3",
                    list_id: 1,
                    unit: "kg"
                },
                {
                    name: "magnesium",
                    count: "2",
                    list_id: 1,
                },
                {
                    name: "paralen",
                    isBought: true,
                    count: "1",
                    list_id: 1,
                },
                {
                    name: "tooth brush",
                    count: "1",
                    list_id: 2,
                },
                {
                    name: "toothpaste",
                    count: "1",
                    list_id: 2,
                },
                {
                    name: "trash bags",
                    count: "4",
                    list_id: 2,
                },
            ])
        })
}