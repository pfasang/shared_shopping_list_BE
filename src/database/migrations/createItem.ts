import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from '../dbConfig';

const JSONitem = dbConfig.tables.item;

exports.up = function (knex: Knex): Promise<any> {
    return knex.schema.createTable(JSONitem.name, function (table) {
        table.increments().unique().primary().unsigned();
        table.string(JSONitem.params.name).notNullable();
        table.integer(JSONitem.params.count).unsigned().defaultTo(1).notNullable();
        table.string(JSONitem.params.unit).notNullable().defaultTo("ks");
        table.integer(JSONitem.params.list_id).notNullable();
        table.boolean(JSONitem.params.isBought).notNullable().defaultTo(false);
        table.timestamp(dbConfig.timestamps.created).defaultTo(knex.fn.now());
        table.timestamp(dbConfig.timestamps.modified).defaultTo(knex.fn.now());
    });
};

exports.down = function (knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists(JSONitem.name);
};