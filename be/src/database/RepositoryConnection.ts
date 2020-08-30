import knex from 'knex';
import Path from 'path';

const repository = knex({
    client: 'sqlite3',
    connection: {
        filename: Path.resolve(__dirname, 'ecoletaDev.sqlite'),
    },
    useNullAsDefault: true
});
export default repository;