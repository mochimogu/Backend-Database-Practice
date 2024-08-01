const pg = require('pg');
const { Client } = pg;

const client = new Client({
    user: 'maindatabase_ae1h_user',
    password : 'zXQ4qe9TS0hnIewkVjaYdk0R0BTB0uA4',
    host: "localhost",
    port: 5432,
    database: 'maindatabase_ae1h'
})

async function createTable() {

    await client.connect();

    const results = await client.query('CREATE TABLE hmong ( lastname VARCHAR(50))');

    console.log(results);

    await client.end();

    return 0;
}



module.exports = { pg, createTable }

