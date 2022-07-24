const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get request to /');
    res.send(`<h1>Response from api</h1>`)
});

router.post('/post', (req, res) => {
    console.log("post request to /post");
    console.log(req.body);
    res.send(`<h1>Data was received</h1>`);
});

module.exports = router;