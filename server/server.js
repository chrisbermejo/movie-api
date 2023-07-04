const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/search')
const genreRouter = require('./routes/genre')
const searchRouter = require('./routes/search')
const trailerRouter = require('./routes/trailer')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    Credential: true,
    optionSuccesStatus: 200
};

app.use(cors(corsOptions));
app.use('/', router);
app.use('/api/genre/', genreRouter)
app.use('/search', searchRouter)
app.use('/api/trailer', trailerRouter)

const port = 4000;

app.listen(port, () => {
    console.log(`Server is ruinning on port ${port}`)
})
