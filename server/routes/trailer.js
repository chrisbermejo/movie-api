const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const e = require('express');
const router = express.Router();

const instance = axios.create({
    headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
    },

});

router.get('/', (req, res) => {
    const url = 'https://www.imdb.com/';

    instance.get(url)
        .then(response => {
            const $ = cheerio.load(response.data);

            const jsonContentss = [];
            let counter = 0;

            $('.swiper-slide').each((index, element) => {

                const imageURL = $(element).children('figure').children('div').children('div:last-child').children('div:first-child').children('img').attr('srcset');

                const posterURL = $(element).children('figure').children('div').children('div:first-child').children('div:nth-child(2)').children('img').attr('srcset');

                const title = $(element).children('figure').children('div').children('div:last-child').children('div:last-child').children('div:last-child').children('figcaption').children('div:last-child').children('div:first-child').children('span:first-child').text();

                const time = $(element).children('figure').children('div').children('div:last-child').children('div:last-child').children('div:last-child').children('figcaption').children('div:last-child').children('div:first-child').children('span:last-child').text();

                const subText = $(element).children('figure').children('div').children('div:last-child').children('div:last-child').children('div:last-child').children('figcaption').children('div:last-child').children('div:last-child').text();


                const jsonItem = {
                    key: counter,
                    imageURL: imageURL,
                    posterURL: posterURL,
                    title: title,
                    time: time,
                    subText: subText,
                };
                jsonContentss.push(jsonItem);
                counter++;
            });

            if (jsonContentss.length > 0) {
                const lastItem = jsonContentss[jsonContentss.length - 1];
                const temp = { ...lastItem };
                temp.key = 'dup';
                jsonContentss.unshift(temp);
            }


            res.send(jsonContentss);
        })
        .catch(error => {
            console.error('Error retrieving the web page:', error);
        });

});



module.exports = router;


