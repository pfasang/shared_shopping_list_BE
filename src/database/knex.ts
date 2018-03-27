import * as knex from 'knex';
import * as knexFile from './Knexfile';

let Knex: knex;
switch (process.env.NODE_ENV) {
    case 'production':
        Knex = knex(knexFile.production);
        break;
    default:
        Knex = knex(knexFile.development);
        break;
}

export default Knex;
