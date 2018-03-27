release: knex --knexfile ./dist/src/database/Knexfile.js migrate:rollback && knex --knexfile ./dist/src/database/Knexfile.js migrate:latest && knex --knexfile ./dist/src/database/Knexfile.js seed:run
web: npm start
