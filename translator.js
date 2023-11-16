const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

let key = process.env.TRANSLATOR_KEY;
let endpoint = "https://api.cognitive.microsofttranslator.com/";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = process.env.TRANSLATOR_LOCATION;
async function translate() {
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
                'to': "he"
            },
            data: [{
                'text': "'I would really like to drive your car around the block a few times!'"
            }],
            responseType: 'json'
        })
        return JSON.stringify(response.data, null, 4);
    }
    catch (error) {
        return "Translation failed";
    }
}

module.exports = { translate };