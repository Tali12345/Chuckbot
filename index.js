const Bot = require('./bot');
const extractJokes = require('./extractJokes');

async function main() {
    try {
        const jokes = await extractJokes.extractChuckNorrisJokes();
        console.log("The jokes were extracted successfully");
        const chuckBot = new Bot(jokes);
        console.log("The bot is ready")
        await chuckBot.botResponse();
    } catch (error) {
        console.error(error);
    }
}

main();