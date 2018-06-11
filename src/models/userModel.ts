import bookshelf from '../database/bookshelf';
import dbCfg from '../database/dbConfig';
import * as bcrypt from 'bcrypt';

export default class User extends bookshelf.Model<User> {

    hiddenProperty: string[] = ['password'];
    hasTimestamps: string[] = [dbCfg.timestamps.created, dbCfg.timestamps.modified];

    get tableName() {
        return dbCfg.tables.user.name;
    }

    get hidden () {
        return this.hiddenProperty;
    }

    set hidden(newValue: string[]) {
        this.hiddenProperty = newValue;
    }

    static async hashPassword(password: string) {
        try {
            const genSalt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, genSalt);
            return hash;
        }
        catch(err) {
            throw err;
        }
    }
}