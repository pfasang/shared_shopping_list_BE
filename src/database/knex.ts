import * as knex from 'knex';
import * as knexFile from './Knexfile';

let Knex: knex;
switch (process.env.NODE_ENV) {
    default:
        Knex = knex(knexFile.development);
        break;
}

export default Knex;
