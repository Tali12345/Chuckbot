const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const translator = require('./translator');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

class Bot {
    
    constructor(jokes) {
        this.jokes = jokes;
        this.currentLanguage = "en";
    }

    startMessage(msg) { 
        return(
            "Hello " + msg.from.first_name + " 😀,\n" +
            "I'm Chuck Norris Bot. I support those options:\n" + 
            "1. You can choose language by using the command 'set language [chosen language]'\n" +
            "2. You can enter a number from 1 to 101, and I'll tell you this joke\n" + 
            "Have fun! 🤣"
        )
    }

    async SetLanguage(msg) {
        const userTextArray = msg.text.split(" ");
        const language = userTextArray[userTextArray.length - 1];
        const languageCode = translator.languageNameToCode(language);
        if (languageCode==="null") {
            return "Invalid language, use valid language for example 'set language hebrew'";
        }
        const supportedLanguageSet = await translator.fetchSupportedLanguages();
        if (!supportedLanguageSet.has(languageCode)) {
            return "Unsupported language, use supported language for example 'set language hebrew'";
        }
        this.currentLanguage = languageCode;
        return "No problem";
    }

    async GetJoke(msg) {
        const jokeNumber = parseInt(msg.text);
        if (jokeNumber>=1 && jokeNumber<=101) {
            return msg.text+". "+this.jokes[jokeNumber-1];
        }
        return "The number should be from 1 to 101";
    }

    async botResponse() {
        bot.on('message', async (msg) => {
            let response = "";
            if (/\/start/.test(msg.text)) {
                response = this.startMessage(msg);
            } 
            else if (/^set language (.+)$/.test(msg.text)) {
                response = await this.SetLanguage(msg);
            } 
            else if (/^[0-9]\d*/.test(msg.text)) {
                response = await this.GetJoke(msg);
            } 
            else {
                response = "Enter 'set language [chosen language]' or a number from 1 to 101";
            }
            const translatedResponse = await translator.translate(response, this.currentLanguage);
            bot.sendMessage(msg.chat.id, translatedResponse);
        });
    }
}

module.exports = Bot;
