const bot = require('./bot');
const extractJokes = require('./extractJokes');

async function main() {
    try {
        const jokes = await extractJokes.getQuotes();
        console.log("The jokes were extracted successfully");
        await bot.botResponse(jokes);
    } catch (error) {
        console.error(error);
    }
}

main();