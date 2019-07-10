const Twit = require("twit");
const request = require("request");
const secrets = require("./secrets");

const T = new Twit ({
    consumer_key:  secrets.CONSUMER_KEY,
    consumer_secret: secrets.CONSUMER_SECRET,
    access_token: secrets.ACCESS_TOKEN,
    access_token_secret: secrets.ACCESS_SECRET
});

const quoteApiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&key=123456&format=json&lang=en";

function getQuote(callback) {
    request(quoteApiUrl, function(error, response, body) {
        console.log("error:", error); //Print error if there is one
        console.log("statusCode:", response && response.statusCode); //Print status code if response was received
        console.log("body:", body);
        callback(body);
    });
}

function logQuote(response){
    const quote = JSON.parse(response);
    console.log(quote.quoteText, " - ", quote.quoteAuthor);
};

function postTweet(tweet) {
    tweet = JSON.parse(tweet);
    T.post('statuses/update', { status: tweet.quoteText + ' - ' + tweet.quoteAuthor }, 
    function(err, data, response){
        console.log(data);
    });
};

getQuote(postTweet);