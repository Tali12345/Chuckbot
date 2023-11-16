const puppeteer = require('puppeteer');

const url = "https://parade.com/968666/parade/chuck-norris-jokes/";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the website at the url
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const jokes = await page.evaluate(() => {

    const jokesList = document.querySelectorAll("ol li");

    // Convert the jokesList to an iterable array
    // For each joke li element fetch the text
    return Array.from(jokesList).map((joke) => {
      // Fetch the sub-elements from the previously fetched joke element
      // Get the displayed text and return it (`.innerText`)
      const text = joke.innerText;

      return text;
    });

  });

  // Display the jokes
  //console.log(this.jokes);
  //console.log(this.jokes.length);

  // Close the browser
  await browser.close();
  console.log(jokes);
  console.log(jokes.length);
  return jokes;
};

// Start the scraping
//getQuotes();
module.exports = { getQuotes };