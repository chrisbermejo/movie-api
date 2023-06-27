const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

router.get('/:genre', (req, res) => {
    const url = 'https://www.imdb.com/search/title/?title_type=feature&num_votes=1,&genres=';
    const input = req.params.genre;
    const output = url + input;

    axios.get(output)
        .then(response => {
            // Load the HTML content of the web page into Cheerio
            const $ = cheerio.load(response.data);

            const jsonContentss = []
            let counter = 0;
            $('.lister-item.mode-advanced ').each((index, element) => {

                if (counter >= 30) {
                    return false;
                }

                const imdbText = $(element).children('.lister-item-content').children('.lister-item-header').children('a');
                const imdbRating = $(element).children('.lister-item-content').children('.ratings-bar').children('.ratings-imdb-rating').attr('data-value');
                const title = imdbText.text();

                const temp_link = imdbText.attr('href');
                const link = 'https://www.imdb.com/' + temp_link.split('?')[0] + 'reference';

                const old_imageUrl = $(element).children('div.lister-item-image.float-left').children('a').children('img').attr('loadlate');

                let new_imageUrl = ' ';

                if (old_imageUrl.includes('UX')) {
                    new_imageUrl = old_imageUrl.split("_V1")[0] + "_V1_QL75_UX280_CR0,0,280,414_.jpg";
                };
                if (old_imageUrl.includes('UY')) {
                    new_imageUrl = old_imageUrl.split("_V1")[0] + "_V1_QL75_UY414_CR26,0,280,414_.jpg";
                };
                if (old_imageUrl.includes('CR0') && old_imageUrl.includes('UY') || old_imageUrl.includes('CR1') && old_imageUrl.includes('UY')) {
                    new_imageUrl = old_imageUrl.split("_V1")[0] + "_V1_QL75_UY414_CR1,0,280,414_.jpg";
                }

                const jsonItem = {
                    key: counter,
                    title: title,
                    rating: imdbRating,
                    link: link,
                    old_image: old_imageUrl,
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