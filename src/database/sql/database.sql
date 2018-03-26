DROP SCHEMA IF EXISTS sslist CASCADE;
DROP DATABASE IF EXISTS "sslist_dev";
CREATE DATABASE "sslist_dev"
    WITH
    OWNER = "postgres"
    TEMPLATE = template0
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\connect "sslist_dev";

CREATE SCHEMA "sslist"
    AUTHORIZATION "postgres";

--psql -U postgres -h localhost -a -f src/database/sql/database.sql