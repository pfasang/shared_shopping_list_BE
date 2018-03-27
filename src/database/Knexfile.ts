let knexx = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'sslist_dev',
            user: 'postgres',
            password: 'admin',
            charset: 'utf8'
        },
        migrations:{
            directory: __dirname + '/migrations'
        },
        debug: false,
        seeds: {
            directory: __dirname + '/seeds/dev'
        }
    },
    production: {
        client: 'pg',
        connection: "postgres://ecrgafqgzfehjf:94b25422432a68d44bbd1f539feabdc67efe7d883e16812ccfeb9430096733e7@ec2-107-20-151-189.compute-1.amazonaws.com:5432/d84noukdb69965",
        migrations: {
            directory: __dirname + '/migrations'
        },
        debug: false,
        seeds: {
            directory: __dirname + '/seeds/dev'
        }
    }
};

export = knexx;