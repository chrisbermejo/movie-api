const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

router.get('/search/:title', (req, res) => {
    const url = 'https://www.imdb.com/search/title/?title=';
    const input = req.params.title
    const output = url + input.split(' ').join('+')

    axios.get(output)
        .then(response => {
            const $ = cheerio.load(response.data);

            const jsonContentss = [];
            let counter = 0;

            $('.lister-item-content').each((index, element) => {
                if (counter >= 10) {
                    return false;
                }

                const title = $(element).children('.lister-item-header').children('a').text();
                
                const year = $(element).children('.lister-item-header').children('.lister-item-year').text();
                
                const stars = $(element).children('.ratings-bar').next().next().text();
                const starSection = stars.substring(stars.indexOf("Stars:") + 6);
                const starNames = starSection.split(",").map(star => star.trim());

                const link = 'https://www.imdb.com/' + $(element).children('.lister-item-header').children('a').attr('href');
                const jsonItem = {
                    key: counter,
                    title: title,
                    year: year.slice(1,5),
                    starNames: starNames.slice(0,2),
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