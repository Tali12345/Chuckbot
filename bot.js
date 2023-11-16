const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const translator = require('./translator');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

let currentLanguage = "en";

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
            currentLanguage = languageCode;
            const translation = await translator.translate("No problem", currentLanguage);
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
                currentLanguage = languageCode;
                const translation = (await translator.translate("No problem", currentLanguage));
                bot.sendMessage(msg.chat.id, translation);
            }
        }

        bot.sendMessage(msg.chat.id, start_message(msg.from.first_name));
        
    });

    bot.onText(/^[0-9]\d*/, async (msg) => {
        const jokeNumber = parseInt(msg.text)
        let sendToUser = await translator.translate("The number should be from 1 to 101", currentLanguage);
        if (jokeNumber>=1 && jokeNumber<=101) {
            sendToUser = await translator.translate(msg.text+". "+jokes[jokeNumber-1], currentLanguage);
        }
        bot.sendMessage(msg.chat.id, sendToUser);

        
    });
}

module.exports = { start };
