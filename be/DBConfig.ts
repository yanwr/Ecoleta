import Path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: Path.resolve(__dirname, 'src', 'database', 'ecoletaDev.sqlite'),
    },
    migrations: {
        directory: Path.resolve(__dirname, 'src', 'database', 'models'),
    },
    seeds: {
        directory: Path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
};