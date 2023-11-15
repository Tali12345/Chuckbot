const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();

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

function start() {

    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, start_message(msg.from.first_name));
        
    });
}

module.exports = { start };
