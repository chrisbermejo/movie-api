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

router.get('/', (req, res) => {
    let range = null;
    let url = 'https://www.imdb.com/search/title/?';

    const entries = Object.entries(req.query);

    for (let i = 0; i < entries.length; i++) {
        if (entries[i][0] === 'title' && entries[i][1] !== '') {
            entries[i][1] = entries[i][1].split(' ').join('+');
        }
        if (entries[i][0] !== 'range' && entries[i][1] !== '') {
            const [key, value] = entries[i];
            url += key + '=' + value;
            if (i < entries.length - 1) {
                url += '&';
            }
        } else {
            range = entries[i][1]
        }
    }
    url += '&view=advanced'
    instance.get(url)
        .then(response => {
            // Load the HTML content of the web page into Cheerio


            const $ = cheerio.load(response.data);

            const jsonContentss = []
            let counter = 0;
            $('.lister-item.mode-advanced ').each((index, element) => {
                const jsonItem = {};
                if (range ? counter >= range : counter >= 30) {
                    return false;
                }

                const imdbText = $(element).children('.lister-item-content').children('.lister-item-header').children('a');
                const imdbRating = $(element).children('.lister-item-content').children('.ratings-bar').children('.ratings-imdb-rating').attr('data-value');
                const genres = $(element).children('.lister-item-content').children('.text-muted').children('.genre').text().trim();
                const runtime = $(element).children('.lister-item-content').children('.text-muted').children('.runtime').text().trim();
                const certificate = $(element).children('.lister-item-content').children('.text-muted').children('.certificate').text().trim();
                const paragraph = $(element).children('.lister-item-content').children('p').length;
                const plot = $(element).children('.lister-item-content').children('p').eq(paragraph - 3).text().trim();
                let stars = $(element).children('.lister-item-content').children('p').eq(paragraph - 2).text().trim();

                const title = imdbText.text();
                const temp_link = imdbText.attr('href');
                const link = 'https://www.imdb.com' + temp_link.split('?')[0];

                const old_imageUrl = $(element).children('div.lister-item-image.float-left').children('a').children('img').attr('loadlate');

                let hd_imageUrl = '';
                if (old_imageUrl) {
                    hd_imageUrl = old_imageUrl.split('_V1')[0];
                }

                let new_imageUrl = '';

                if (old_imageUrl.includes('UX')) {
                    new_imageUrl = old_imageUrl.split("_V1")[0] + "_V1_QL75_UX280_CR0,0,280,414_.jpg";
                };
                if (old_imageUrl.includes('UY')) {
                    new_imageUrl = old_imageUrl.split("_V1")[0] + "_V1_QL75_UY414_CR26,0,280,414_.jpg";
                };
                if (old_imageUrl.includes('CR0') && old_imageUrl.includes('UY') || old_imageUrl.includes('CR1') && old_imageUrl.includes('UY')) {
                    new_imageUrl = old_imageUrl.split("_V1")[0] + "_V1_QL75_UY414_CR1,0,280,414_.jpg";
                }

                title.length ? jsonItem['title'] = title : null;
                imdbRating && imdbRating.length ? jsonItem['rating'] = imdbRating : null;
                plot !== 'Add a Plot' ? jsonItem['plot'] = plot : null;
                genres.length ? jsonItem['genres'] = genres : null;

                if (stars.startsWith('Stars:')) {
                    jsonItem['stars'] = stars.replace(/^Stars:\s*/, '');
                } else if (stars.startsWith('Director:')) {
                    let DirectorAndStars = stars.split('|');
                    let director = '';
                    DirectorAndStars[0] ? DirectorAndStars[0] = DirectorAndStars[0].replace('\n', '') : DirectorAndStars[0] = null;
                    DirectorAndStars[1] ? DirectorAndStars[1] = DirectorAndStars[1].replace('\n', '') : DirectorAndStars[1] = null;
                    DirectorAndStars[1] ? stars = DirectorAndStars[1].replace(/^     Stars:\s*/, '') : stars = null;
                    DirectorAndStars[0] ? director = DirectorAndStars[0].replace(/^Director:\s*/, '') : director = null;
                    director ? director = director.replace('\n', '').trim() : null;
                    stars ? jsonItem['stars'] = stars : null;
                    director ? jsonItem['director'] = director : null;
                } else {
                    stars = '';
                }

                runtime.length ? jsonItem['runtime'] = runtime : null;
                certificate.length ? jsonItem['certificate'] = certificate : null;
                link.length ? jsonItem['link'] = link : null;
                new_imageUrl.length ? jsonItem['poster'] = new_imageUrl : null;
                hd_imageUrl.length ? jsonItem['hd_poster'] = hd_imageUrl : null;



                jsonContentss.push(jsonItem);
                counter++;
            });
            res.send(jsonContentss != false ? jsonContentss : { Error: 'Unable to find anything' });
        })
        .catch(error => {
            console.error('Error retrieving the web page:', error);
        });

});

module.exports = router;