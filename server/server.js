const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const basicSearch = require('./routes/basicSearch')
const trailerRouter = require('./routes/trailer')
const advancedSearch = require('./routes/advancedSearch');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    Credential: true,
    optionSuccesStatus: 200
};

app.use(cors(corsOptions));
app.use('/api/advancedsearch', advancedSearch);
app.use('/api/search', basicSearch)
app.use('/api/trailer', trailerRouter)

const port = 4000;

app.listen(port, () => {
    console.log(`Server is ruinning on port ${port}`)
})
