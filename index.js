const fs = require('fs');

const router = require('./routes');
const corsMiddleware = require('./cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(corsMiddleware);
app.options('*', corsMiddleware);

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({
    limit: '50mb',
    strict: false
}));

app.use(router);

app.listen(port, () => {
    console.log(`api is listining on ${port}`);
});