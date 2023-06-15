const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

router.get('/users', (req, res) => {
    const url = 'https://www.imdb.com/search/title/?title=';
    const input = 'Star Wars Clone Wars'
    const output = url + input.split(' ').join('+')

    axios.get(output)
        .then(response => {
            // Load the HTML content of the web page into Cheerio
            const $ = cheerio.load(response.data);

            const jsonContentss = [];
            let counter = 0;

            $('.lister-item-header a').each((index, element) => {
                if (counter >= 10) {
                    return false;
                }
                const title = $(element).text();
                const link = 'https://www.imdb.com/' + $(element).attr('href');
                const jsonItem = {
                    key: counter,
                    title: title,
                    link: link
                };
                jsonContentss.push(jsonItem);
                counter++;
            });

            res.send(jsonContentss);
        })
        .catch(error => {
            console.error('Error retrieving the web page:', error);
        });

});



module.exports = router;