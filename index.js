const Twit = require("twit");
const https = require("https");
const secrets = require("./secrets");

const T = new Twit ({
    consumer_key:  secrets.CONSUMER_KEY,
    consumer_secret: secrets.CONSUMER_SECRET,
    access_token: secrets.ACCESS_TOKEN,
    access_token_secret: secrets.ACCESS_SECRET
});

const quoteApiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&key=123456&format=json&lang=en";

function getQuote(callback) {
    let data = [];
    https.get(quoteApiUrl, (res) => {
        res.setEncoding('utf8')
        res.on('data', d => data.push(d));
        res.on('end', () => callback(JSON.parse(data.join(''))))
        res.on('error', e => console.error(`${e.message}`));
    })
}

function postQuote(data) {
    T.post('statuses/update', { status: `${data.quoteText} - ${data.quoteAuthor}
    
    this tweet was automatically generated` }, 
    function(err, data, response){
        console.log(data);
    });
};

getQuote(postQuote);