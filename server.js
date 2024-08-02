const express = require('express');
const path = require('path');
const server = express();
const PORT = 4321;

const db = require('./database.js')


server.use(express.json());
server.use(express.static(path.join(__dirname, 'html')));
server.use(express.urlencoded({extended : true}));

server.get('/get', async (request, response) => {
    // const results = db.createTable();
    const select = await db.getAll();
    
    console.log(select);

    response.status(200).json({'results' : 'successful', 'hmongWord' : select});
})

server.get('/admin/', (request, response) => {

    response.status(200).sendFile(path.join(__dirname, 'html', 'index.html'));

})

server.post('/add', async (request, response) => {

    const form = request.body.hmongInput;
    console.log(form);

    const sending = { word : form};

    const results = await db.add(sending);

    if(results === 0) {
        response.status(200).json({'result' : 'successful'});
    } else {
        response.status(400).json({'result' : 'error'})
    }

})

server.post('/delete', async (request, response) => {

    const form = request.body.hmongDeleteInput;

    const sending = { word : form};

    const results = await db.deleting(sending);


    if(results === 0) {
        console.log('successful remove');
        console.log(results);
        response.status(200).json({'result' : 'successful'});
    } else {
        console.log('unsuccessful remove');
        response.status(400).json({'result' : 'error'})
    }

})

server.get('/', (request, response) => {
    response.status(200).json({'results' : 'successful'});
})



server.listen(PORT, ()=> {
    console.log(`Listening to PORT: ${PORT}`);
})

