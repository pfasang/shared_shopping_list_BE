import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from "../../dbConfig";

exports.seed =  function (knex: Knex): Promise<any> {
    return knex(`${dbConfig.schemaName}.${dbConfig.tables.item.name}`).del()
        .then(function () {
            return knex(`${dbConfig.schemaName}.${dbConfig.tables.item.name}`).insert([
                {
                    name: "Item1",
                    count: 3,
                    list_id: 1,
                    isBought: true
                },
                {
                    name: "Item2",
                    count: 5,
                    list_id: 1,
                },
                {
                    name: "Item3",
                    list_id: 2,
                },
                {
                    name: "Item4",
                    count: 4,
                    list_id: 1,
                },
                {
                    name: "Item5",
                    count: 2,
                    list_id: 1,
                },
                {
                    name: "Item6",
                    count: 7,
                    list_id: 2,
                },
                {
                    name: "Item1",
                    isBought: true,
                    count: 3,
                    list_id: 2,
                },
            ])
        })
}