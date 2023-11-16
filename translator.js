const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const ISO6391 = require('iso-639-1');

let key = process.env.TRANSLATOR_KEY;
let endpoint = "https://api.cognitive.microsofttranslator.com/";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = process.env.TRANSLATOR_LOCATION;
async function translate(text, toLanguage) {
    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                // location required if you're using a multi-service or regional (not global) resource.
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': toLanguage
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        })
        return JSON.stringify(response.data, null, 4);
    }
    catch (error) {
        return "Translation failed";
    }
}

function languageNameToCode(languageName) {
    const languageCode = ISO6391.getCode(languageName);
    return languageCode || null;
}

module.exports = { translate, languageNameToCode };