const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const translator = require('./translator');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

function start_message(first_name) { 
    return(
        "Hello " + first_name + " 😀,\n" +
        "I'm Chuck Norris Bot. I support those options:\n" + 
        "1. You can choose langauge by using the command 'set language [chosen language]'\n" +
        "2. You can enter a number from 1 to 101, and I'll tell you this joke\n" + 
        "Have fun! 🤣"
    )
}

async function isValidLanguage(language) {
    console.log(language);
    const languageCode = translator.languageNameToCode(language);
    console.log(languageCode);
    if (languageCode==="null") {
        return "Invalid";
    } else {
        const supportedLanguageSet = await translator.fetchSupportedLanguages();
        if (!supportedLanguageSet.has(languageCode)) {
            return "Unsupported";
        } else {
            const translation = await translator.translate("No problem", languageCode);
            return translation;
        }
    }
}

async function start(jokes) {

    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, start_message(msg.from.first_name));
        
    });

    bot.onText(/^set language (.+)/, async (msg) => {
        const userTextArray = msg.text.split(" ");
        const language = userTextArray[userTextArray.length - 1];
        console.log(language);
        const languageCode = translator.languageNameToCode(language);
        console.log(languageCode);
        if (languageCode==="null") {
            bot.sendMessage(msg.chat.id, "Invalid language, use valid language for example 'set language hebrew'");
        } else {
            const supportedLanguageSet = await translator.fetchSupportedLanguages();
            if (!supportedLanguageSet.has(languageCode)) {
                bot.sendMessage(msg.chat.id, "Unsupported language, use supported language for example 'set language hebrew'");
            } else {
                const translation = (await translator.translate("No problem", languageCode));
                bot.sendMessage(msg.chat.id, translation);
            }
        }

        bot.sendMessage(msg.chat.id, start_message(msg.from.first_name));
        
    });

    bot.onText(/^[0-9]\d*/, (msg) => {
        const jokeNumber = parseInt(msg.text)
        if (jokeNumber>=1 && jokeNumber<=101) {
            bot.sendMessage(msg.chat.id, msg.text+". "+jokes[jokeNumber-1]);
        } else {
            bot.sendMessage(msg.chat.id, "The number should be from 1 to 101");
        }
        
    });
}

module.exports = { start };
