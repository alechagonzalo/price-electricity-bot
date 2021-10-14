const { TwitterClient } = require("twitter-api-client");
const cron = require("node-cron");
const { getPrices } = require("./functions/functions");
require("dotenv").config();

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Schedule tasks to tweet every 1am the lowest price of electricity in Spain
cron.schedule("0 0 * * *", function () {
    getPrices(twitterClient);
});
