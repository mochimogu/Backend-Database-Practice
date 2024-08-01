const express = require('express');
const server = express();
const PORT = 4321;

const db = require('./database.js')


server.use(express.json());

server.get('/create', (request, response) => {
    const results = db.createTable();

    response.status(200).json({'results' : results});
})


server.get('/', (request, response) => {
    response.status(200).json({'results' : 'successful'});
})




server.listen(PORT, ()=> {
    console.log(`Listening to PORT: ${PORT}`);
})

