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
        fs.writeFileSync('model.obj', modelString)
    }
    res.download('./model.obj');  
});

module.exports = router;