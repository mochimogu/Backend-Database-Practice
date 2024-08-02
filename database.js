const pg = require('pg').Pool;
const { Client } = pg;

const pool = new pg({
    connectionString : "postgresql://maindatabase_ae1h_user:zXQ4qe9TS0hnIewkVjaYdk0R0BTB0uA4@dpg-cqlubkd6l47c73c1mb70-a.oregon-postgres.render.com/maindatabase_ae1h",
    ssl : {
        rejectUnauthorized : false
    }
})

async function createTable() {

    try {
        const client = await pool.connect();

        const results = await client.query('CREATE TABLE hmong ( lastname VARCHAR(50))');
    
        // console.log(results);
    
        await client.release();
    
        return 0;
    } catch (error) {
        
        console.log(error);

    }
}

async function getAll() {

    try {
        const client = await pool.connect();

        const results = await client.query("SELECT * FROM hmong");
    
        console.log(results.rows);
    
        await client.release();
    
        return results.rows; 

    } catch (error) {

        console.log(error);

    }
}


async function add(sending) {

    try {
        // console.log(sending);

        const cilent = await pool.connect();

        const text = 'INSERT INTO hmong(lastname) VALUES ($1)';
        const values = [sending.word]

        await cilent.query(text, values);

        await cilent.release();

        return 0;
        
    } catch (error) {

        console.log(error);
        
        return 1;
    }

}

async function deleting(sending) {

    try {
        const cilent = await pool.connect();

        const text = "DELETE FROM hmong WHERE lastname = $1";
        const values = [sending.word];

        const results = await cilent.query(text, values);
        console.log(results.rows);
        
        await cilent.release();

        return 0;

    } catch (error) {
        
        console.log(error);
        
        return 1;

    }


}

module.exports = { pg, createTable, getAll, add, deleting }

