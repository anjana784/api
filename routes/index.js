const fs = require('fs');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get request to /');
    res.send(`<h1>Response from api</h1>`)
});

router.post('/post', (req, res) => {

    console.log("post request to /post");
    if (typeof req.body.model == 'string') {

        const isModelExists = fs.existsSync(`${__dirname}/model.obj`);;


        if (isModelExists) {
            fs.unlinkSync(`${__dirname}/model.obj`);
        }

        console.log('model was loded to the api');
        const modelString = req.body.model;
        fs.appendFileSync(`${__dirname}/model.obj`, modelString);
        res.sendFile(`${__dirname}/model.obj`);

    }

});

module.exports = router;