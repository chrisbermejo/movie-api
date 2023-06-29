const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/search')
const genreRouter = require('./routes/genre')
const searchRouter = require('./routes/search')
const cors = require('cors');

app.use(
    cors({
      origin: 'http://192.168.1.38/',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );
  

  app.set('trust proxy', true);


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

const port = 4000;
const server = app.listen(port, () => {
    console.log(`Server is ruinning on port ${port}`)
})

