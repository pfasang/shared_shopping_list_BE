import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from '../dbConfig';

const JSONlist = dbConfig.tables.list;

exports.up = function (knex: Knex): Promise<any> {
    return knex.schema.createTable(JSONlist.name, function (table) {
            table.increments().unique().primary().unsigned();
            table.string(JSONlist.params.title).notNullable();
            table.integer(JSONlist.params.owner_id).unsigned().notNullable();
            table.timestamp(dbConfig.timestamps.created).defaultTo(knex.fn.now());
            table.timestamp(dbConfig.timestamps.modified).defaultTo(knex.fn.now());
        });
};

exports.down = function (knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists(JSONlist.name);
};