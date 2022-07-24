const fs = require('fs');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get request to /');
    res.send(`<h1>Response from api</h1>`)
});

router.post('/post', (req, res) => {
    console.log("post request to /post");
    if(typeof req.body.model == 'string') {
        console.log('model was loded to the api');
        const modelString = req.body.model;
        fs.writeFile('./model.obj', modelString, 'utf-8', () => {
            console.log("object have been written");
        });
    }
    res.download('./model.obj');
    res.status(200);
    res.send(`<h1>Data was received</h1>`);    
});

module.exports = router;