let Twit = require("twit");
let request = require("requiest");
let secrets = require("./secrets");

let T = new Twit ({
    consumer_key:  secrets.CONSUMER_KEY,
    consumer_secret: secrets.CONSUMER_SECRET,
    access_token: secrets.ACCESS_TOKEN,
    access_token_secret: secrets.ACCESS_SECRET
});

const quoteApiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&key=123456&format=json&lang=en";

function getQuote(callback) {

}