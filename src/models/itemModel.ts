import bookshelf from '../database/bookshelf';
import dbCfg from '../database/dbConfig';

export default class Item extends bookshelf.Model<Item> {

    hasTimestamps: string[] = [dbCfg.timestamps.created, dbCfg.timestamps.modified]

    get tableName() {
        return `${dbCfg.schemaName}.${dbCfg.tables.item.name}`;
    }
}