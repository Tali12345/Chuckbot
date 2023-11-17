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
        return response.data[0].translations[0].text;
    }
    catch (error) {
        return "Translation failed";
    }
}

async function fetchSupportedLanguages() {
    try {
      const response = await fetch(endpoint+"/languages?api-version=3.0", {
        headers: {
          'Ocp-Apim-Subscription-Key': key
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        const supportedLanguageSet = new Set(Object.keys(data.translation)); // Extract language codes and create a Set
        return supportedLanguageSet;
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
        console.error('Error fetching supported languages:', error);
        return new Set(); // Return an empty Set in case of error
    }
  }

function languageNameToCode(languageName) {
    const languageCode = ISO6391.getCode(languageName);
    return languageCode || null;
}

module.exports = { translate, fetchSupportedLanguages, languageNameToCode };