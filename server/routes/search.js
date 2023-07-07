const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

const instance = axios.create({
    headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
    },

});

router.get('/:title', (req, res) => {
    const url = 'https://www.imdb.com/find/?q=';
    const input = req.params.title.split(' ').join('%20');
    const output = url + input + '&s=tt&ref_=fn_tt_pop';

    instance.get(output)
        .then(response => {
            const $ = cheerio.load(response.data);

            const jsonContentss = [];
            let counter = 0;

            $('.ipc-metadata-list-summary-item').each((index, element) => {
                if (counter >= 8) {
                    return false;
                }

                const imageURL = $(element).children('.eBTIIV').children('.ipc-media__img').children('img').attr('src');

                const title = $(element).children('.ipc-metadata-list-summary-item__c').children('.ipc-metadata-list-summary-item__tc').children('a').text();

                const year = $(element).children('.ipc-metadata-list-summary-item__c').children('.ipc-metadata-list-summary-item__tc').children('ul').children('li:first-child').children('span').text();

                const stars = $(element).children('.ipc-metadata-list-summary-item__c').children('.ipc-metadata-list-summary-item__tc').children('ul:last-child').children('li:last-child').children('span').text();
                let starNames = stars.split(", ").map(star => star);

                const link = 'https://www.imdb.com/' + $(element).children('.ipc-metadata-list-summary-item__c').children('.ipc-metadata-list-summary-item__tc').children('a').attr('href');

                const jsonItem = {
                    key: counter,
                    image: imageURL,
                    title: title,
                    year: year.slice(0, 4),
                    starNames: starNames.slice(0, 2),
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


