const express = require('express');

const bodyParser = require('body-parser');

const cros = require('cors');

const app = express();
const port = 4000;

app.use(cros());

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.get('/', (req, res) => {
    res.end('Hello from api');
});

app.post('/post', (req, res) => {
    console.log('reqested');
    console.log(req.body);
    res.end('data recived');
});

app.listen(port, () => {
    console.log(`api is listining on ${port}`);
});