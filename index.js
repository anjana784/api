const router = require('./routes');
const corsMiddleware = require('./cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(corsMiddleware);

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(router);

app.listen(port, () => {
    console.log(`api is listining on ${port}`);
});