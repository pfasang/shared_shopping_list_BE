import bookshelf from '../database/bookshelf';
import dbCfg from '../database/dbConfig';
import Item from "./itemModel";

export default class List extends bookshelf.Model<List> {

    hasTimestamps: string[] = [dbCfg.timestamps.created, dbCfg.timestamps.modified];

    get tableName() {
        return `${dbCfg.tables.list.name}`;
    }

    item() {
        return this.hasMany(
            Item,
            dbCfg.tables.item.params.list_id,
            dbCfg.tables.item.params.id
        );
    }
}