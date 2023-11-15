const bot = require('./bot');
const extractJokes = require('./extractJokes');

async function main() {
    const jokes = await extractJokes.getQuotes();
    console.log(jokes);
    console.log("123");
    bot.start(jokes);
}

main();