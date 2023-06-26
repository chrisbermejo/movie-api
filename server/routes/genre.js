const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

router.get('/:genre', (req, res) => {
    const url = 'https://www.imdb.com/search/title/?genres=';
    const input = req.params.genre;
    const output = url + input;

    axios.get(output)
        .then(response => {
            // Load the HTML content of the web page into Cheerio
            const $ = cheerio.load(response.data);

            const jsonContentss = []
            let counter = 0;
            $('.lister-item.mode-advanced ').each((index, element) => {

                if (counter >= 2) {
                    return false;
                }

                const imdbText = $(element).children('.lister-item-content').children('.lister-item-header').children('a');
                const title = imdbText.text();

                const temp_link = imdbText.attr('href');
                const link = 'https://www.imdb.com/' + temp_link.split('?')[0] + 'reference';
                console.log(link);


                const old_imageUrl = $(element).children('div.lister-item-image.float-left').children('a').children('img').attr('loadlate');
                const new_imageUrl = old_imageUrl.split("_V1")[0] + "._V1_QL125_UX240_.jpg";

                const jsonItem = {
                    key: counter,
                    title: title,
                    link: link,
                    image: new_imageUrl
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