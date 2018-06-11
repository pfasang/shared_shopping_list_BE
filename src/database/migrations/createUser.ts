import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from '../dbConfig';

const UserJSON = dbConfig.tables.user;

exports.up = function (knex: Knex): Promise<any> {
    return knex.schema.createTable(UserJSON.name, function (table) {
        table.increments().unique().primary().unsigned();
        table.string(UserJSON.params.name).notNullable();
        table.string(UserJSON.params.email).notNullable().unique();
        table.string(UserJSON.params.password).notNullable();
        table.timestamp(dbConfig.timestamps.created).defaultTo(knex.fn.now());
        table.timestamp(dbConfig.timestamps.modified).defaultTo(knex.fn.now());
    });
};

exports.down = function (knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists(UserJSON.name);
};