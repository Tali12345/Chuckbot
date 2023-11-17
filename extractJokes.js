const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://parade.com/968666/parade/chuck-norris-jokes/';

async function extractChuckNorrisJokes() {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/', // The website that referred the user to this page
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
      },
    });
    const html = response.data;

    const $ = cheerio.load(html);

    // Array to store the Chuck Norris jokes
    const chuckNorrisJokes = [];

    // Extracting jokes from the webpage
    $('ol').find('li').each((index, element) => {
      const joke = $(element).text().trim();
      chuckNorrisJokes.push(joke);
    });

    // Returning the jokes array
    return chuckNorrisJokes;
  } catch (error) {
    console.error('Error:', error);
    return []; // Return an empty array in case of an error
  }
}


module.exports = { extractChuckNorrisJokes };