import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from "../../dbConfig";

exports.seed =  function (knex: Knex): Promise<any> {
    return knex(`${dbConfig.tables.list.name}`).del()
        .then(function () {
            return knex(`${dbConfig.tables.list.name}`).insert([
                {
                    title: "List1",
                    owner_id: "1",
                },
                {
                    title: "List2",
                    owner_id: "10",
                },
                {
                    title: "List3",
                    owner_id: "4",
                },
                {
                    title: "List4",
                    owner_id: "1",
                },
                {
                    title: "List5",
                    owner_id: "7",
                },
                {
                    title: "List6",
                    owner_id: "4",
                },
                {
                    title: "List7",
                    owner_id: "10",
                },
                {
                    title: "List8",
                    owner_id: "10",
                },
                {
                    title: "List9",
                    owner_id: "7",
                },
                {
                    title: "List10",
                    owner_id: "10",
                },
            ])
        })
}