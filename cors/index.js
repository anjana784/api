const cors = require('cors');

const corsOptions = {
    origin: 'https://www.broersdesign.com',
    optionsSuccessStatus: 200
}

module.exports = cors(corsOptions);