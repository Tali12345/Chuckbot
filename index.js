const bot = require('./bot');
const extractJokes = require('./extractJokes');
const translator = require('./translator');

async function main() {
    try {
        const translation = await translator.translate("hello", "he");
        console.log(translation);
    } catch (error) {
        console.error(error);
    }
    //const jokes = await extractJokes.getQuotes();
    //console.log(jokes);
    //console.log("123");
    //bot.start(jokes);
}

main();