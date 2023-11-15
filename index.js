const bot = require('./bot');
const extractJokes = require('./extractJokes');

async function main() {
    await extractJokes.getQuotes();
    //bot.start();
}

main();