const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

const instance = axios.create({
    headers: { 'Accept-Language': 'en-US,en;q=0.9' },
});

router.get('/:title', (req, res) => {
    const url = 'https://www.imdb.com/search/title/?title=';
    const input = req.params.title.split(' ').join('+');
    const output = url + input;

    instance.get(output)
        .then(response => {
            const $ = cheerio.load(response.data);

            const jsonContentss = [];
            let counter = 0;

            $('.lister-item.mode-advanced').each((index, element) => {
                if (counter >= 8) {
                    return false;
                }

                const imageURL = $(element).children('.lister-item-image').children('a').children('img').attr('loadlate');

                const title = $(element).children('.lister-item-content').children('.lister-item-header').children('a').text();

                const year = $(element).children('.lister-item-content').children('.lister-item-header').children('.lister-item-year').text();

                const stars = $(element).children('.lister-item-content').children('.ratings-bar').next().next().text();
                const starSection = stars.substring(stars.indexOf("Stars:") + 6);
                const starNames = starSection.split(",").map(star => star.trim());

                const link = 'https://www.imdb.com/' + $(element).children('.lister-item-content').children('.lister-item-header').children('a').attr('href');
                const jsonItem = {
                    input: input,
                    key: counter,
                    image: imageURL,
                    title: title,
                    year: year.slice(1, 5),
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


