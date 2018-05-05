import bookshelf from '../database/bookshelf';
import dbCfg from '../database/dbConfig';
import List from "./listModel";

export default class Item extends bookshelf.Model<Item> {

    hasTimestamps: string[] = [dbCfg.timestamps.created, dbCfg.timestamps.modified]

    get tableName() {
        return `${dbCfg.tables.item.name}`;
    }
    list() {
        return this.belongsTo(
            List,
            dbCfg.tables.item.params.list_id,
            dbCfg.tables.list.params.id
        );
    }
}