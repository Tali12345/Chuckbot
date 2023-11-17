# Chuckbot

## The Project's Components
- **Web Scraper** (extractJokes.js): scrap the page at [101 Chuck Norris Jokes To Make You Laugh](https://parade.com/968666/parade/chuck-norris-jokes/) in run-time and extract the 101 jokes from the page
- **Telegram Bot** (bot.js): the project uses `node-telegram-bot-api` to manage the interactions with the user in Telegram
    - If the user enters `/start` the bot will response with the start message explaining the user his options
    - If the user enters `set language [chosen language]` the bot set the current language to the language the user chose.
    - If the user enters `a number from 1 to 101`, the bot tells the corresponding joke in the language the user chose.
- **Translator** (translator.js): use **Azure Translator API** - translates the text from English to the target language, returns all the supported languages and converts the language into the corresponding language code.

The service is hosted in the cloud.

## How to Run Locally?
1. Run `git clone https://github.com/Tali12345/Chuckbot.git`.
2. Run `cd Chuckbot`.
3. Run `npm install`.
4. Add .env file with the keys.
5. Run `node index.js` then the server will run.
6. Open [t.me/the_chuck_norris_bot](t.me/the_chuck_norris_bot).
7. Write `/start` in the chat in order to start the chat with the bot.